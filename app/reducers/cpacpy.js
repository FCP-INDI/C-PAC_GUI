import uuid from 'uuid/v4'
import { fromJS, List } from 'immutable'

import cpac from '@internal/c-pac'
import { scheduler } from 'consts'

import {
  CPACPY_INIT,
  CPACPY_SCHEDULER_SCHEDULER,
  CPACPY_SCHEDULER_DETECT,
  CPACPY_SCHEDULER_POLLING,
  CPACPY_SCHEDULER_POLLING_CANCEL,
  CPACPY_SCHEDULER_INFO,
  CPACPY_SCHEDULER_ONLINE,
  CPACPY_SCHEDULER_OFFLINE,
  CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK,
  CPACPY_SCHEDULER_ADDNEW,

  CPACPY_CONFIG_LOAD_SUCCESS,
} from '../actions/cpacpy'
const initialState = fromJS({
  schedulers: [
    { id: 'local', name: 'Local', version: 'unknown', backends: [], address: scheduler.local, polling: false, detecting: false, online: null, connected: false, connect: { callbacks: {} } },
  ],
  // id for scheduler
  scheduler: 'local',
})

export const selectSchedulers =
  () => (state) => state.get('schedulers')

export const selectScheduler =
  (scheduler) =>
    (state) =>
      state.get('schedulers').find((s) => s.get('id') == scheduler)

export const selectCurrentScheduler =
  () =>
    (state) =>
      selectScheduler(state.get('scheduler'))(state)

export const selectSchedulerBackend =
  (scheduler, backend) =>
    (state) =>
      selectScheduler(scheduler)(state)
        .get('backends')
        .find((b) => b.get('id') == backend)

export const selectSchedulerConnectCallback =
  (scheduler, callbackId) =>
    (state) =>
      selectScheduler(scheduler)(state).getIn(['connect', 'callbacks', callbackId])


export default function (state = initialState, action) {
  if (!state) {
    return initialState
  }

  if (!action) {
    return state
  }

  const { scheduler: id } = action
  const i = state.get('schedulers').findIndex((s) => s.get('id') === id)

  switch (action.type) {
    case CPACPY_INIT:
      return state

    case CPACPY_SCHEDULER_SCHEDULER:
      return state.setIn(['scheduler'], id)

    case CPACPY_SCHEDULER_DETECT:
      return state.setIn(['schedulers', i, 'detecting'], true)

    case CPACPY_SCHEDULER_POLLING:
      return state.setIn(['schedulers', i, 'polling'], true)

    case CPACPY_SCHEDULER_POLLING_CANCEL:
      return state.setIn(['schedulers', i, 'polling'], false)

    case CPACPY_SCHEDULER_INFO:
      const { info: { version, backends } } = action
      return state
        .setIn(['schedulers', i, 'version'], version)
        .setIn(['schedulers', i, 'backends'], fromJS(backends))

    case CPACPY_SCHEDULER_ONLINE:
    case CPACPY_SCHEDULER_OFFLINE:
      return state
        .setIn(['schedulers', i, 'online'], action.type == CPACPY_SCHEDULER_ONLINE)
        .setIn(['schedulers', i, 'detecting'], false)

    case CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK:
      const { callbackId, callbackAction } = action
      const callbackPath = [
        'schedulers',
        i,
        'connect',
        'callbacks',
        callbackId
      ]

      let callbacks = state.getIn(callbackPath, List())
      callbacks = callbacks.push(callbackAction)
      return state.setIn(callbackPath, callbacks)

    case CPACPY_SCHEDULER_ADDNEW:
      const name = action.payload.newName
      const IP = action.payload.newIP
      const port = action.payload.newPort
      const newObj = fromJS({ id: name,
          name: name,
          version: 'unknown',
          backends: [],
          address: IP + ':' + port,
          polling: false,
          detecting: false,
          online: null,
          connected: false,
          connect: { callbacks: {} } })
      const newState = state.update('schedulers', scheduler => scheduler.push(newObj)).setIn(['scheduler'], name).
      setIn(['scheduler'], name)
      return newState

    case CPACPY_CONFIG_LOAD_SUCCESS:
      return fromJS(action.config)


    default:
      return state
  }
}
