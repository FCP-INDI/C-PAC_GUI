import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import uuid from 'uuid/v4'

import { scheduler } from 'consts'
import { fetch, websocketChannel, scheduler as schedulerMatch } from './utils'

import {
  CPACPY_INIT,
  CPACPY_SCHEDULER_SCHEDULER,
  CPACPY_SCHEDULER_DETECT,
  CPACPY_SCHEDULER_OFFLINE,
  CPACPY_SCHEDULER_POLLING,
  CPACPY_SCHEDULER_POLLING_CANCEL,
  CPACPY_SCHEDULER_CONNECT,
  CPACPY_SCHEDULER_CONNECT_CANCEL,
  CPACPY_SCHEDULER_CONNECT_MESSAGE,
  CPACPY_SCHEDULER_CONNECT_SEND,
  CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK,
  CPACPY_SCHEDULER_CALL,

  init as cpacpyInit,
  detect as cpacpyDetect,
  poll as cpacpyPoll,
  pollCancel as cpacpyPollCancel,
  watch as cpacpyWatch,
  info as cpacpySchedulerInfo,
  online as cpacpySchedulerOnline,
  offline as cpacpySchedulerOffline,
  connectSendCallback as cpacpyConnectSendCallback,
  connectSendCallbackCall as cpacpyConnectSendCallbackCall,
  callSuccess as cpacpyCallSuccess,
  callError as cpacpyCallError,
} from '../actions/cpacpy'

import {
  selectSchedulers,
  selectCurrentScheduler,
  selectScheduler,
  selectSchedulerConnectCallback,
} from '../reducers/cpacpy'

const selectSaga = (callback) => select((state) => callback(state.cpacpy))

function* init() {
  const scheduler = yield selectSaga(selectCurrentScheduler())
  yield put(cpacpyDetect(scheduler.get('id'), true, true))
}
// TODO
function* detect({ scheduler: id, poll=true, current=false }) {
  const scheduler = yield selectSaga(selectScheduler(id))
  if (scheduler.get('online')) {
    yield put(cpacpySchedulerOnline(id))
    yield put(cpacpyPollCancel(id))
    return
  }
  try {
    const { response, error } = yield call(
      fetch,
      `http://${scheduler.get('address')}`,
      { method: 'GET' }
    )

    if (response.api === 'cpacpy') {
      yield put(cpacpySchedulerInfo(id, {
        version: response.version,
        backends: response.backends,
      }))
      yield put(cpacpySchedulerOnline(id))
      yield put(cpacpyWatch(id))
      yield put(cpacpyPollCancel(id))
      return
    }
  } catch (error) {
    console.log(error)
  }
  yield put(cpacpySchedulerOffline(id))
  if (poll) {
    yield put(cpacpyPoll(id, current))
  }
}

function *offline({ scheduler }) {
  yield put(cpacpySchedulerOffline(scheduler))
}

// @TODO make sure pooling is happening just once for each scheduler
function* pollingBackground(scheduler) {
  yield delay(10000)
  yield put(cpacpyDetect(scheduler))
}

function* polling({ scheduler, current }) {
  yield race({
    task: call(pollingBackground, scheduler),
    cancel: take([
      CPACPY_SCHEDULER_SCHEDULER,
      schedulerMatch(CPACPY_SCHEDULER_POLLING_CANCEL, scheduler)
    ])
  })
}

function* senderListener(scheduler, socket) {
  while (true) {
    const { message, action, error } = yield take(
      schedulerMatch(CPACPY_SCHEDULER_CONNECT_SEND, scheduler.get('id'))
    )

    const id = uuid()
    socket.send(JSON.stringify({ ...message, __cpacpy_message_id: id }))
    // @TODO handle error

    if (action) {
      yield put(cpacpyConnectSendCallback(
        scheduler.get('id'), id, action
      ))
    }
  }
}

function* receiverListener(scheduler, channel) {
  while (true) {
    const action = yield take(channel)
    const { message } = action

    if (message && message.__cpacpy_message_id) {
      const { data } = message

      let callbacks = yield selectSaga(
        selectSchedulerConnectCallback(scheduler.get('id'), message.__cpacpy_message_id)
      )

      if (callbacks) {
        for (let callback of callbacks.toJS()) {
          try {
            yield put(
              callback instanceof Function ?
              callback(scheduler.get('id'), data) :
              cpacpyConnectSendCallbackCall(scheduler.get('id'), callback, data)
            )
          } catch (error) {
          }
        }
      }
    }

    yield put(action)
  }
}

// TODO: websocket to keep connect
function* connect({ scheduler: id }) {
  const scheduler = yield selectSaga(selectScheduler(id))
  const ws = new WebSocket(`ws://${scheduler.get('address')}/schedule/connect`)

  const channel = yield call(
    websocketChannel,
    scheduler.get('id'),
    ws,
    CPACPY_SCHEDULER_CONNECT_MESSAGE,
    CPACPY_SCHEDULER_CONNECT_CANCEL,
  )

  while (true) {
    const { cancel } = yield race({
      receiver: call(receiverListener, scheduler, channel),
      sender: call(senderListener, scheduler, ws),
      cancel: take(schedulerMatch(CPACPY_SCHEDULER_CONNECT_CANCEL, scheduler.get('id'))),
    })
    if (cancel) {
      channel.close()
      break
    }
  }
}

function* callAny({
  scheduler: id,
  method='GET',
  endpoint,
  data,
  response: { success, error },
  headers = {}
}) {

  const scheduler = id > -1 ? yield selectSaga(selectScheduler(id)) : -1
  const url = id > -1 ? `http://${scheduler.get('address')}${endpoint}` : endpoint

  const success_return = (data, headers) =>
    success instanceof Function ?
      success(data, headers) :
      cpacpyCallSuccess(scheduler, success, data, headers)

  const error_return = (exception) =>
    error instanceof Function ?
      error(exception) :
      cpacpyCallError(scheduler, error, exception)

  try {
    const { response, error, headers: resHeaders } = yield call(
      fetch,
      url,
      {
        method,
        body: data === null ? null : JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        }
      }
    )

    yield put(success_return(response, resHeaders))
  } catch (exception) {
    console.log(exception)
    yield put(error_return(exception))
  }
}

export default function* configSaga() {
  yield all([
    takeEvery(CPACPY_INIT, init),
    takeEvery(CPACPY_SCHEDULER_DETECT, detect),
    takeEvery(CPACPY_SCHEDULER_POLLING, polling),
    takeEvery(CPACPY_SCHEDULER_CONNECT, connect),
    takeEvery(CPACPY_SCHEDULER_CONNECT_CANCEL, offline),
    takeEvery(CPACPY_SCHEDULER_CALL, callAny),
  ])
}
