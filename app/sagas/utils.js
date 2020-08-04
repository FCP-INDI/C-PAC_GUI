import { eventChannel } from 'redux-saga'
import { fetch as realFetch } from 'whatwg-fetch'
import { select, put, takeEvery } from 'redux-saga/effects'

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
        return { response: await response.json() }
      } else {
        return { response: await response.text() }
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

export function configLocalState(key, initialState = {}, {
  load, save, clear,
  loadSuccess, loadError,
  saveSuccess, saveError,
  clearSuccess, clearError,
}, postLoad = null) {

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

    if (postLoad) {
      localState = postLoad(localState)
    }

    yield put({ type: loadSuccess, config: localState })
  }

  function* saveLocalState() {
    try {
      const config = yield select((state) => state[key]);
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