import { eventChannel } from 'redux-saga'
import { fetch as realFetch } from 'whatwg-fetch'
import { select, put, takeEvery, call } from 'redux-saga/effects'
import Immutable from 'immutable'
import { default as LZString } from '../../tools/lz-string'
import { updateItem as dbSave, getItem as dbGet, clearItem as dbClear } from './db'

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
    const versionedInitialState = key === 'cpacpy' ?
      initialState : { version: VERSION, ...initialState, }

    let localState = null
    try {
      const response = yield call(dbGet, key)
      localState = response ? JSON.parse(LZString.decompress(response)) : null
      console.log("m4", localState)
      if (!localState) {
        localState = versionedInitialState
        yield dbSave(key, LZString.compress(JSON.stringify(localState))).catch(e => throw e)
      }
      localState = Immutable.fromJS(localState)
      if (postLoad) {
        localState = postLoad(localState)
      }
      yield put({ type: loadSuccess, config: localState })
    } catch (error) {
      yield put({type: loadError, error})
    }

    // const cache = yield caches.open('cpac')
    // for (let k of traverseState(localState, (o) => o instanceof Immutable.Map && o.get('_cache'))) {
    //   const cacheKey = localState.getIn(k).get('_cache')
    //   const reqKey = new Request(requestKey(cacheKey))
    //   const value = yield cache.match(reqKey, {
    //     ignoreVary: true,
    //     ignoreMethod: true,
    //     ignoreSearch: true
    //   });

    //   const data = yield value.json()
    //   localState = localState.setIn(k, Immutable.fromJS(data))
    // }

  }

  function* saveLocalState() {
    try {
      let config = yield select((state) => state[key]);

<<<<<<< HEAD
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

=======
      // const cache = yield caches.open('cpac')
      // let cacheCount = 0
      // for (let k of traverseState(config, (o) => o instanceof Immutable.Map && o.get('_cache'))) {
      //   const reqKey = new Request(requestKey(k))
      //   const value = new Response(
      //     JSON.stringify(config.getIn(k)),
      //     { headers: { 'Content-Type': 'application/json' } }
      //   );
      //   yield cache.put(reqKey, value);
      //   config = config.setIn(k, Immutable.fromJS({ _cache: k }))
      //   cacheCount++
      // }
<<<<<<< HEAD
      
<<<<<<< HEAD
>>>>>>> 0934beb (fix: use headers instead of post)
      localStorage.setItem(key, JSON.stringify(config.toJS()))
=======
      localStorage.setItem(key, LZString.compress(JSON.stringify(config.toJS())))
>>>>>>> 10b7018 (Fix: lzstring for localstorage)
=======
      console.log("m2", key, config)
      yield dbSave(key, LZString.compress(JSON.stringify(config.toJS())))
>>>>>>> 7da7d3c (tmp: indexedDB solution with dexie.js)
      yield put({ type: saveSuccess, config })
    } catch (error) {
      yield put({ type: saveError, error })
    }
  }

  function* clearLocalState(config) {
    try {
      yield dbClear()
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
