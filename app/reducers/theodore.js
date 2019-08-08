import uuid from 'uuid/v4'
import { fromJS } from 'immutable'

import cpac from '@internal/c-pac'
import { scheduler } from 'consts'

import {
  THEODORE_INIT,
  THEODORE_SCHEDULER_ONLINE,
  THEODORE_SCHEDULER_OFFLINE,
  THEODORE_SCHEDULER_WATCH_MESSAGE,
} from '../actions/theodore'

const initialState = fromJS({
  schedulers: {
    [scheduler.local]: { name: 'Local', online: false },
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

    case THEODORE_SCHEDULER_WATCH_MESSAGE:
      return state.setIn(['watch'], action.data.time)

    default:
      return state
  }
}
