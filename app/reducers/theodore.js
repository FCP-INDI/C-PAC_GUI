import uuid from 'uuid/v4'
import { fromJS, List } from 'immutable'

import cpac from '@internal/c-pac'
import { scheduler } from 'consts'

import {
  THEODORE_INIT,
  THEODORE_SCHEDULER_ONLINE,
  THEODORE_SCHEDULER_OFFLINE,
  THEODORE_SCHEDULER_CONNECT_SEND_CALLBACK,
} from '../actions/theodore'

const initialState = fromJS({
  schedulers: {
    [scheduler.local]: { name: 'Local', online: false, connect: { callbacks: {} } },
  },
  scheduler: scheduler.local,
})

export default function (state = initialState, action) {
  if (!state) {
    return initialState
  }

  if (!action) {
    return state
  }

  switch (action.type) {
    case THEODORE_INIT:
      return state

    case THEODORE_SCHEDULER_ONLINE:
      return state.setIn([
        'schedulers', action.scheduler, 'online'
      ], true)

    case THEODORE_SCHEDULER_OFFLINE:
      return state.setIn([
        'schedulers', action.scheduler, 'online'
      ], false)
      
    case THEODORE_SCHEDULER_CONNECT_SEND_CALLBACK:
      let callbacks = state.getIn(['schedulers', action.scheduler, 'connect', 'callbacks', action.id])
      if (!callbacks) {
        callbacks = List()
      }
      callbacks = callbacks.push(action.action)
      return state.setIn(['schedulers', action.scheduler, 'connect', 'callbacks', action.id], callbacks)
        
    default:
      return state
  }
}
