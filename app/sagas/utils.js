import { eventChannel } from 'redux-saga'
import { fetch as realFetch } from 'whatwg-fetch'

export function websocketChannel(wsURI, message_type, cancel_type) {
  return eventChannel(emitter => {
    const ws = new WebSocket(wsURI) 
    ws.onmessage = m => {
      const data = JSON.parse(m.data)
      return emitter({
        type: message_type,
        data,
      })
    }
    ws.onerror = () => {
      return emitter({
        type: cancel_type,
      })
    }
    ws.onclose = () => {
      return emitter({
        type: cancel_type,
      })
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
      return { response: await response.json() }
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    throw error
  }
}