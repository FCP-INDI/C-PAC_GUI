import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import {
  EXECUTION_PREPROCESS,
  EXECUTION_PREPROCESS_SAVE,
  EXECUTION_PREPROCESS_SCHEDULED,
  EXECUTION_PREPROCESS_SUBJECT_SCHEDULED,
  EXECUTION_PREPROCESS_SUCCESS,
  EXECUTION_PREPROCESS_ERROR,
} from '../actions/execution'

import {
  THEODORE_SCHEDULER_CALL,
  THEODORE_SCHEDULER_CONNECT_SEND,
} from '../actions/theodore'

import cpac from '@internal/c-pac'

function* preprocess({ dataset, view=null, pipeline }) {

  const execution = uuid()

  yield put({
    type: EXECUTION_PREPROCESS_SAVE,
    execution,
    dataset,
    view,
    pipeline
  })

  yield put({
    type: THEODORE_SCHEDULER_CALL,
    scheduler: 'localhost:3333',
    method: 'POST',
    endpoint: '/schedule/pipeline',
    data: {
      execution,
      data_config: cpac.data_config.dump(dataset.toJS())
      pipeline: pipeline ? cpac.data_settings.dump(pipeline.toJS()) : null
    },
    response: {
      success: (data) => ({
        type: EXECUTION_PREPROCESS_SCHEDULED,
        execution, data
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_ERROR,
        execution, exception
      }),
    }
  })
}

function* preprocessWatch({ execution, data: { schedule } }) {
  yield put({
    type: THEODORE_SCHEDULER_CONNECT_SEND,
    scheduler: 'localhost:3333',
    action: (scheduler, data) => ({
      type: EXECUTION_PREPROCESS_SUBJECT_SCHEDULED,
      execution, data
    }),
    error: (exception) => ({
      type: EXECUTION_PREPROCESS_ERROR,
      execution, exception
    }),
    message: {
      type: 'SCHEDULE_WATCH',
      schedule, children: true,
    }
  })
}

function* preprocessSubjectWatch({ execution, data: { schedule } }) {
  yield put({
    type: THEODORE_SCHEDULER_CONNECT_SEND,
    scheduler: 'localhost:3333',
    action: (scheduler, data) => ({
      type: EXECUTION_PREPROCESS_SUBJECT_SCHEDULED,
      execution, data
    }),
    error: (exception) => ({
      type: EXECUTION_PREPROCESS_ERROR,
      execution, exception
    }),
    message: {
      type: 'SCHEDULE_WATCH',
      schedule, children: true,
    }
  })
}

export default function* configSaga() {
  yield all([
    takeEvery(EXECUTION_PREPROCESS, preprocess),
    takeEvery(EXECUTION_PREPROCESS_SCHEDULED, preprocessWatch),
    takeEvery(EXECUTION_PREPROCESS_SUBJECT_SCHEDULED, preprocessSubjectWatch),
  ])
}