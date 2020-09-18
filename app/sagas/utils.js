import { eventChannel } from 'redux-saga'
import { fetch as realFetch } from 'whatwg-fetch'
import { select, put, takeEvery } from 'redux-saga/effects'
import Immutable from 'immutable'

export const selectSaga = (key) => (callback) => select((state) => callback(state[key]))

export function scheduler(action, scheduler) {
  return (act) => {
    return act.type === action && act.scheduler === scheduler
  }
}

export function websocketChannel(scheduler, ws, message_type, cancel_type) {
  return eventChannel(emitter => {
    ws.onmessage = m => {
      const message = JSON.parse(m.data)
      return emitter(
        message_type instanceof Function ?
          message_type(scheduler) :
          { type: message_type, scheduler, message }
        )
    }
    ws.onerror = () => {
      return emitter(
        cancel_type instanceof Function ?
          cancel_type(scheduler) :
          { type: cancel_type, scheduler }
        )
    }
    ws.onclose = () => {
      return emitter(
        cancel_type instanceof Function ?
          cancel_type(scheduler) :
          { type: cancel_type, scheduler }
      )
    }
    return () => {
      ws.close()
    }
  })
}

export async function fetch(url, init) {
  try {
    let response = await realFetch(url, init)
    if (response.ok) {
      if (response.headers.get('content-type').startsWith('application/json')) {
        return { response: await response.json(), headers: response.headers }
      } else {
        return { response: await response.text(), headers: response.headers }
      }
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    throw error
  }
}

function* traverseState(object, comparison, key=[]) {
  if (object instanceof Immutable.Map) {
    if (comparison(object)) {
      yield key, object
    }
    for (const [k, v] of object) {
      yield* traverseState(v, comparison, [...key, k])
    }
  } else if (object instanceof Immutable.List) {
    if (comparison(object)) {
      yield key, object
    }
    let k = 0
    for (const v of object) {
      yield* traverseState(v, comparison, [...key, k])
      k++;
    }
  } else {
    if (comparison(object)) {
      yield key, object
    }
  }
}

export function configLocalState(key, initialState = {}, {
  load, save, clear,
  loadSuccess, loadError,
  saveSuccess, saveError,
  clearSuccess, clearError,
}, postLoad = null) {

  const requestKey = (stateKey) => `${key}/${stateKey.join('/')}`

  function* loadLocalState () {
    const versionedInitialState = {
      version: VERSION,
      ...initialState,
    }

    let localState = null
    try {
      localState = JSON.parse(localStorage.getItem(key))
    } catch (e) {
    }

    if (!localState) {
      localState = versionedInitialState
      localStorage.setItem(key, JSON.stringify(localState))
    }
    
    localState = Immutable.fromJS(localState)

    const cache = yield caches.open('cpac')

    for (let k of traverseState(localState, (o) => o instanceof Immutable.Map && o.get('_cache'))) {
      const cacheKey = localState.getIn(k).get('_cache')
      const reqKey = new Request(requestKey(cacheKey))
      const value = yield cache.match(reqKey, {
        ignoreVary: true,
        ignoreMethod: true,
        ignoreSearch: true
      });

      const data = yield value.json()
      localState = localState.setIn(k, Immutable.fromJS(data))
    }

    if (postLoad) {
      localState = postLoad(localState)
    }

    yield put({ type: loadSuccess, config: localState })
  }

  function* saveLocalState() {
    try {
      const cache = yield caches.open('cpac')

      let config = yield select((state) => state[key]);

      let cacheCount = 0
      for (let k of traverseState(config, (o) => o instanceof Immutable.Map && o.get('_cache'))) {
        const reqKey = new Request(requestKey(k))
        const value = new Response(
          JSON.stringify(config.getIn(k)),
          { headers: { 'Content-Type': 'application/json' } }
        );
        yield cache.put(reqKey, value);
        config = config.setIn(k, Immutable.fromJS({ _cache: k }))
        cacheCount++
      }
      
      localStorage.setItem(key, JSON.stringify(config.toJS()))
      yield put({ type: saveSuccess, config })
    } catch (error) {
      yield put({ type: saveError, error })
    }
  }

  function* clearLocalState(config) {
    try {
      localStorage.removeItem(key)
      yield put({ type: clearSuccess })
    } catch (error) {
      yield put({ type: clearError, error })
    }
  }

  return [
    takeEvery(load, loadLocalState),
    takeEvery(save, saveLocalState),
    takeEvery(clear, clearLocalState),
  ]
}