import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import {
  EXECUTION_CONFIG_LOAD,
  EXECUTION_CONFIG_LOAD_SUCCESS,
  EXECUTION_CONFIG_LOAD_ERROR,
  EXECUTION_PREPROCESS_DATASET,
  EXECUTION_PREPROCESS_DATASET_SUCCESS,
  EXECUTION_PREPROCESS_DATASET_ERROR,
  EXECUTION_PREPROCESS_DATASET_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_FINISHED,
  EXECUTION_PREPROCESS_DATASET_FETCHED,
} from '../actions/execution'

import {
  CPACPY_SCHEDULER_CALL,
  CPACPY_SCHEDULER_CONNECT_SEND,
} from '../actions/cpacpy'

import {
  executions,
} from './execution.default'

import cpac from '@internal/c-pac'

function* loadLocalState () {
  const initialState = {
    version: VERSION,
    executions,
  }

  let localState = null
  try {
    localState = JSON.parse(localStorage.getItem('execution'))
  } catch (e) {
  }

  if (!localState) {
    localState = initialState
    localStorage.setItem('execution', JSON.stringify(localState))
  }

  yield put({
    type: EXECUTION_CONFIG_LOAD_SUCCESS,
    config: localState
  })
}

function* saveLocalState() {
  const config = yield select((state) => state.execution);
  localStorage.setItem('execution', JSON.stringify(config.toJS()))
}

function* clearLocalState(config) {
  localStorage.removeItem('execution')
}

function* preprocessDataset({ dataset, dataSettings, version }) {
  yield put({
    type: CPACPY_SCHEDULER_CALL,
    scheduler: 'localhost:3333',
    method: 'POST',
    endpoint: '/schedule',
    data: {
      type: 'data_settings',
      data_settings: cpac.data_settings.dump(dataSettings.toJS(), version),
    },
    response: {
      success: (data) => ({
        type: EXECUTION_PREPROCESS_DATASET_SCHEDULED,
        dataset, data
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_ERROR,
        dataset, exception
      }),
    }
  })
}

function* preprocessDatasetWatch({ dataset, data: { schedule } }) {
  yield put({
    type: CPACPY_SCHEDULER_CONNECT_SEND,
    scheduler: 'localhost:3333',
    action: (scheduler, data) => {
      if (data.type !== "End") {
        return
      }
      return {
        type: EXECUTION_PREPROCESS_DATASET_FINISHED,
        dataset, data
      }
    },
    error: (exception) => ({
      type: EXECUTION_PREPROCESS_DATASET_ERROR,
      dataset, exception
    }),
    message: {
      type: 'watch',
      schedule,
    }
  })
}

function* preprocessDatasetFetchResult({ dataset, data: { id, statuses, available_results } }) {
  yield put({
    type: CPACPY_SCHEDULER_CALL,
    scheduler: 'localhost:3333',
    method: 'GET',
    endpoint: `/schedule/${id}/result/data_config`,
    response: {
      success: (data) => ({
        type: EXECUTION_PREPROCESS_DATASET_FETCHED,
        dataset, data: data.result.data_config,
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_ERROR,
        dataset, exception
      }),
    }
  })
}

function* preprocessDatasetResult({ dataset, data }) {
  yield put({
    type: EXECUTION_PREPROCESS_DATASET_SUCCESS,
    dataset,
    config: cpac.data_config.parse(data),
  })
}

export default function* configSaga() {
  yield all([
    takeEvery(EXECUTION_CONFIG_LOAD, loadLocalState),
    takeEvery(EXECUTION_PREPROCESS_DATASET_SUCCESS, saveLocalState),
    takeEvery(EXECUTION_PREPROCESS_DATASET, preprocessDataset),
    takeEvery(EXECUTION_PREPROCESS_DATASET_SCHEDULED, preprocessDatasetWatch),
    takeEvery(EXECUTION_PREPROCESS_DATASET_FINISHED, preprocessDatasetFetchResult),
    takeEvery(EXECUTION_PREPROCESS_DATASET_FETCHED, preprocessDatasetResult),
  ])
}