import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import uuid from 'uuid/v4'

import { scheduler } from 'consts'
import { fetch, websocketChannel, scheduler as sched } from './utils'

import {
  THEODORE_INIT,
  THEODORE_SCHEDULER_DETECT,
  THEODORE_SCHEDULER_OFFLINE,
  THEODORE_SCHEDULER_POLLING,
  THEODORE_SCHEDULER_POLLING_CANCEL,
  THEODORE_SCHEDULER_CONNECT,
  THEODORE_SCHEDULER_CONNECT_CANCEL,
  THEODORE_SCHEDULER_CONNECT_MESSAGE,
  THEODORE_SCHEDULER_CONNECT_SEND,
  THEODORE_SCHEDULER_CONNECT_SEND_CALLBACK,
  THEODORE_SCHEDULER_CALL,

  init as theodoreInit,
  detect as theodoreDetect,
  polling as theodorePolling,
  watch as theodoreWatch,
  online as theodoreSchedulerOnline,
  offline as theodoreSchedulerOffline,
} from '../actions/theodore'

import cpac from '@internal/c-pac'

function* init() {
  const schedulers = yield select((state) => state.theodore.get('schedulers'))
  const [ ...scheduler ] = schedulers.keys()
  for (let s of scheduler) {
    yield put(theodoreDetect(s))
  }
}

function* detect({ scheduler }) {
  try {
    const { response, error } = yield call(
      fetch,
      `http://${scheduler}`,
      { method: 'GET' }
    )

    if (response.api === 'theodore') {
      yield put(theodoreSchedulerOnline(scheduler))
      yield put(theodoreWatch(scheduler))
      return
    }
  } catch (error) {
  }
  yield put(theodoreSchedulerOffline(scheduler))
}

function* pollingBackground(scheduler) {
  yield delay(4000)
  yield put(theodoreDetect(scheduler))
}

function* polling({ scheduler }) {
  yield race({
    task: call(pollingBackground, scheduler),
    cancel: take(THEODORE_SCHEDULER_POLLING_CANCEL)
  })
}

function* senderListener(scheduler, socket) {
  while (true) {
    const { message, action } = yield take(
      sched(THEODORE_SCHEDULER_CONNECT_SEND, scheduler)
    )

    const id = uuid()

    socket.send(JSON.stringify({ ...message, __theo_message_id: id }))

    if (action) {
      yield put({
        type: THEODORE_SCHEDULER_CONNECT_SEND_CALLBACK,
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

    if (message && message.__theo_message_id) {
      const { data } = message

      let callbacks = yield select(
        (state) => 
          state.theodore.getIn([
            'schedulers',
            scheduler,
            'connect',
            'callbacks',
            message.__theo_message_id
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
    THEODORE_SCHEDULER_CONNECT_MESSAGE,
    THEODORE_SCHEDULER_CONNECT_CANCEL,
  )

  while (true) {
    const { cancel } = yield race({
      receiver: call(receiverListener, scheduler, channel),
      sender: call(senderListener, scheduler, ws),
      cancel: take(sched(THEODORE_SCHEDULER_CONNECT_CANCEL, scheduler)),
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
    takeEvery(THEODORE_INIT, init),
    takeEvery(THEODORE_SCHEDULER_DETECT, detect),
    takeEvery(THEODORE_SCHEDULER_OFFLINE, polling),
    takeEvery(THEODORE_SCHEDULER_CONNECT, connect),
    takeEvery(THEODORE_SCHEDULER_CONNECT_CANCEL, detect),
    takeEvery(THEODORE_SCHEDULER_CALL, callScheduler),
  ])
}