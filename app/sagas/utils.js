import { eventChannel } from 'redux-saga'
import { fetch as realFetch } from 'whatwg-fetch'

export function scheduler(action, scheduler) {
  return (act) => act.type === action && act.scheduler === scheduler
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