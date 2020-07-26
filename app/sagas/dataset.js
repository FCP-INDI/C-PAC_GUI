import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import {
  DATASET_CONFIG_LOAD,
  DATASET_CONFIG_LOAD_SUCCESS,
  DATASET_CONFIG_LOAD_ERROR,
  DATASET_GENERATE_DATA_CONFIG,
  DATASET_GENERATE_DATA_CONFIG_SUCCESS,
  DATASET_GENERATE_DATA_CONFIG_ERROR,
  DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
  DATASET_GENERATE_DATA_CONFIG_FINISHED,
  DATASET_GENERATE_DATA_CONFIG_FETCHED,
} from '../actions/dataset'

import {
  CPACPY_SCHEDULER_CALL,
  CPACPY_SCHEDULER_CONNECT_SEND,
} from '../actions/cpacpy'

import {
  datasets,
} from './dataset.default'

import cpac from '@internal/c-pac'

function* loadLocalState () {
  const initialState = {
    version: VERSION,
    datasets,
  }

  let localState = null
  try {
    localState = JSON.parse(localStorage.getItem('dataset'))
  } catch (e) {
  }

  if (!localState) {
    localState = initialState
    localStorage.setItem('dataset', JSON.stringify(localState))
  }

  yield put({
    type: DATASET_CONFIG_LOAD_SUCCESS,
    config: localState
  })
}

function* saveLocalState() {
  const config = yield select((state) => state.dataset);
  localStorage.setItem('dataset', JSON.stringify(config.toJS()))
}

function* clearLocalState(config) {
  localStorage.removeItem('dataset')
}

function* generateDataConfig({ dataset, dataSettings, version }) {
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
        type: DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
        dataset, data
      }),
      error: (exception) => ({
        type: DATASET_GENERATE_DATA_CONFIG_ERROR,
        dataset, exception
      }),
    }
  })
}

function* generateDataConfigWatch({ dataset, data: { schedule } }) {
  yield put({
    type: CPACPY_SCHEDULER_CONNECT_SEND,
    scheduler: 'localhost:3333',
    action: (scheduler, data) => {
      if (data.type !== "End") {
        return
      }
      return {
        type: DATASET_GENERATE_DATA_CONFIG_FINISHED,
        dataset, data
      }
    },
    error: (exception) => ({
      type: DATASET_GENERATE_DATA_CONFIG_ERROR,
      dataset, exception
    }),
    message: {
      type: 'watch',
      schedule,
    }
  })
}

function* generateDataConfigFetchResult({ dataset, data: { id, statuses, available_results } }) {
  yield put({
    type: CPACPY_SCHEDULER_CALL,
    scheduler: 'localhost:3333',
    method: 'GET',
    endpoint: `/schedule/${id}/result/data_config`,
    response: {
      success: (data) => ({
        type: DATASET_GENERATE_DATA_CONFIG_FETCHED,
        dataset, data: data.result.data_config,
      }),
      error: (exception) => ({
        type: DATASET_GENERATE_DATA_CONFIG_ERROR,
        dataset, exception
      }),
    }
  })
}

function* generateDataConfigResult({ dataset, data }) {
  yield put({
    type: DATASET_GENERATE_DATA_CONFIG_SUCCESS,
    dataset,
    config: cpac.data_config.parse(data),
  })
}

export default function* configSaga() {
  yield all([
    takeEvery(DATASET_CONFIG_LOAD, loadLocalState),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_SUCCESS, saveLocalState),
    takeEvery(DATASET_GENERATE_DATA_CONFIG, generateDataConfig),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_SCHEDULED, generateDataConfigWatch),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_FINISHED, generateDataConfigFetchResult),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_FETCHED, generateDataConfigResult),
  ])
}