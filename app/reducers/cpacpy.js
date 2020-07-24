import uuid from 'uuid/v4'
import { fromJS, List } from 'immutable'

import cpac from '@internal/c-pac'
import { scheduler } from 'consts'

import {
  CPACPY_INIT,
  CPACPY_SCHEDULER_ONLINE,
  CPACPY_SCHEDULER_OFFLINE,
  CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK,
} from '../actions/cpacpy'

const initialState = fromJS({
  schedulers: {
    [scheduler.local]: { name: 'Local', address: scheduler.local, online: false, connect: { callbacks: {} } },
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
    case CPACPY_INIT:
      return state

    case CPACPY_SCHEDULER_ONLINE:
      return state.setIn([
        'schedulers', action.scheduler, 'online'
      ], true)

    case CPACPY_SCHEDULER_OFFLINE:
      return state.setIn([
        'schedulers', action.scheduler, 'online'
      ], false)
      
    case CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK:
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
