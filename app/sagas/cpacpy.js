import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import uuid from 'uuid/v4'

import { scheduler } from 'consts'
import { fetch, websocketChannel, scheduler as sched } from './utils'

import {
  CPACPY_INIT,
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
  polling as cpacpyPolling,
  watch as cpacpyWatch,
  online as cpacpySchedulerOnline,
  offline as cpacpySchedulerOffline,
} from '../actions/cpacpy'

function* init() {
  const schedulers = yield select((state) => state.cpacpy.get('schedulers'))
  const [ ...scheduler ] = schedulers.keys()
  for (let s of scheduler) {
    yield put(cpacpyDetect(s))
  }
}

function* detect({ scheduler }) {
  try {
    const { response, error } = yield call(
      fetch,
      `http://${scheduler}`,
      { method: 'GET' }
    )

    if (response.api === 'cpacpy') {
      yield put(cpacpySchedulerOnline(scheduler))
      yield put(cpacpyWatch(scheduler))
      return
    }
  } catch (error) {
  }
  yield put(cpacpySchedulerOffline(scheduler))
}

// @TODO make sure pooling is happening just once for each scheduler
function* pollingBackground(scheduler) {
  yield delay(4000)
  yield put(cpacpyDetect(scheduler))
}

function* polling({ scheduler }) {
  yield race({
    task: call(pollingBackground, scheduler),
    cancel: take(CPACPY_SCHEDULER_POLLING_CANCEL)
  })
}

function* senderListener(scheduler, socket) {
  while (true) {
    const { message, action } = yield take(
      sched(CPACPY_SCHEDULER_CONNECT_SEND, scheduler)
    )

    const id = uuid()

    socket.send(JSON.stringify({ ...message, __cpacpy_message_id: id }))

    if (action) {
      yield put({
        type: CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK,
        scheduler,
        id,
        action
      })
    }
  }
}

function* receiverListener(scheduler, channel) {
  while (true) {

    const action = yield take(channel)
    const { message } = action

    if (message && message.__cpacpy_message_id) {
      const { data } = message

      let callbacks = yield select(
        (state) => 
          state.cpacpy.getIn([
            'schedulers',
            scheduler,
            'connect',
            'callbacks',
            message.__cpacpy_message_id
          ]))

      if (callbacks) {
        for (let callback of callbacks.toJS()) {
          try {
            yield put(
              callback instanceof Function ?
              callback(scheduler, data) :
              { type: callback, scheduler, data }
            )
          } catch (error) {
          }
        }
      }
    }

    yield put(action)
  }
}

function* connect({ scheduler }) {
  const ws = new WebSocket(`ws://${scheduler}/schedule/connect`) 

  const channel = yield call(
    websocketChannel,
    scheduler,
    ws,
    CPACPY_SCHEDULER_CONNECT_MESSAGE,
    CPACPY_SCHEDULER_CONNECT_CANCEL,
  )

  while (true) {
    const { cancel } = yield race({
      receiver: call(receiverListener, scheduler, channel),
      sender: call(senderListener, scheduler, ws),
      cancel: take(sched(CPACPY_SCHEDULER_CONNECT_CANCEL, scheduler)),
    })
    if (cancel) {
      channel.close()
      break
    }
  }
}

function* callScheduler({
  scheduler='localhost:3333',
  method='GET',
  endpoint,
  data,
  response: { success, error }
}) {

  const success_return = (data) =>
    success instanceof Function ?
      success(data) :
      { type: success, data }

  const error_return = (exception) =>
    error instanceof Function ?
      error(exception) :
      { type: error, exception }

  try {
    const { response, error } = yield call(
      fetch,
      `http://${scheduler}${endpoint}`,
      {
        method,
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    yield put(success_return(response))
  } catch (exception) {
    console.log(exception)
    yield put(error_return(exception))
  }
}

export default function* configSaga() {
  yield all([
    takeEvery(CPACPY_INIT, init),
    takeEvery(CPACPY_SCHEDULER_DETECT, detect),
    takeEvery(CPACPY_SCHEDULER_OFFLINE, polling),
    takeEvery(CPACPY_SCHEDULER_CONNECT, connect),
    takeEvery(CPACPY_SCHEDULER_CONNECT_CANCEL, detect),
    takeEvery(CPACPY_SCHEDULER_CALL, callScheduler),
  ])
}