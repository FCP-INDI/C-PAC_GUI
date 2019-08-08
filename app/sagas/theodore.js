import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import { scheduler } from 'consts'
import { fetch, websocketChannel } from './utils'

import {
  THEODORE_INIT,
  THEODORE_SCHEDULER_DETECT,
  THEODORE_SCHEDULER_POLLING,
  THEODORE_SCHEDULER_WATCH,
  THEODORE_SCHEDULER_WATCH_CANCEL,
  THEODORE_SCHEDULER_WATCH_MESSAGE,
  init as theodoreInit,
  detect as theodoreDetect,
  polling as theodorePolling,
  watch as theodoreWatch,
  online as theodoreSchedulerOnline,
  offline as theodoreSchedulerOffline,
} from '../actions/theodore'

import cpac from '@internal/c-pac'
import { exception } from 'react-ga';

function* init() {
  // yield put(theodorePolling())
  const schedulers = yield select((state) => state.theodore.get('schedulers'))
  const [ ...servers ] = schedulers.keys()
  for (let s of servers) {
    yield put(theodoreDetect(s))
  }
}

function* pollingBackground() {
  while (true) {
    const schedulers = yield select((state) => state.theodore.get('schedulers'))
    const [ ...servers ] = schedulers.keys()
    for (let s of servers) {
      yield put(theodoreDetect(s))
    }
    yield delay(6000)
  }
}

function* polling() {
  yield race({
    task: call(pollingBackground),
    cancel: take(THEODORE_SCHEDULER_POLLING)
  })
}

function* detect({ server }) {
  try {
    const { response, error } = yield call(
      fetch,
      `http://${server}`,
      { method: 'GET' }
    )

    if (response.api === 'theodore') {
      yield put(theodoreSchedulerOnline(server))
      yield put(theodoreWatch(server))
      return
    }
  } catch (error) {
  }
  yield put(theodoreSchedulerOffline(server))
}

function* watchBackground(server) {
  const channel = yield call(
    websocketChannel,
    `ws://${server}/schedule/watch`,
    THEODORE_SCHEDULER_WATCH_MESSAGE,
    THEODORE_SCHEDULER_WATCH_CANCEL
  )

  while (true) {
    try {
      const action = yield take(channel)
      yield put(action)
    } catch (err) {
    }

    if (yield cancelled()) {
      channel.close();
      break
    }
  }
}

function* watch({ server }) {
  yield race({
    task: call(watchBackground, server),
    cancel: take(THEODORE_SCHEDULER_WATCH_CANCEL)
  })
}

export default function* configSaga() {
  yield all([
    takeEvery(THEODORE_INIT, init),
    takeEvery(THEODORE_SCHEDULER_DETECT, detect),
    takeEvery(THEODORE_SCHEDULER_WATCH, watch),
  ])
}