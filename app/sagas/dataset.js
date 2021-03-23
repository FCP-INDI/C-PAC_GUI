import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import cpac from '@internal/c-pac'

import {
  DATASET_CONFIG_LOAD,
  DATASET_CONFIG_LOAD_SUCCESS,
  DATASET_CONFIG_LOAD_ERROR,
  DATASET_CONFIG_SAVE,
  DATASET_CONFIG_SAVE_SUCCESS,
  DATASET_CONFIG_SAVE_ERROR,
  DATASET_CONFIG_CLEAR,
  DATASET_CONFIG_CLEAR_SUCCESS,
  DATASET_CONFIG_CLEAR_ERROR,
  DATASET_SETTINGS_CREATE,
  DATASET_SETTINGS_UPDATE,
  DATASET_GENERATE_DATA_CONFIG,
  DATASET_GENERATE_DATA_CONFIG_SUCCESS,
  DATASET_GENERATE_DATA_CONFIG_ERROR,
  DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
  DATASET_GENERATE_DATA_CONFIG_FINISHED,
  DATASET_GENERATE_DATA_CONFIG_FETCHED,
  DATASET_GENERATE_DATA_CONFIG_URL,
} from '../actions/dataset'

import {
  scheduleDataSettings as cpacpyScheduleDataSettings,
  connectSendWatch as cpacpyConnectSendWatch,
  fetchResults as cpacpyFetchResults,
} from '../actions/cpacpy'

import {
  selectCurrentScheduler, selectScheduler,
} from '../reducers/cpacpy'

import {
  selectDataset,
} from '../reducers/dataset'

import {
  datasets,
} from './dataset.default'

import {
  selectSaga as selectSagaFunc,
  configLocalState, fetch,
} from './utils'

const selectSaga = selectSagaFunc('dataset')


function* generateDataConfig({ dataset: { id, version }, scheduler }) {
  const dataset = yield selectSaga(selectDataset(id))

  if (!scheduler) {
    scheduler = (yield selectSagaFunc('cpacpy')(selectCurrentScheduler())).get('id')
  }

  yield put(cpacpyScheduleDataSettings(
    scheduler,
    cpac.data_settings.dump(dataset.toJS(), version),
    {
      success: (data) => ({
        type: DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
        dataset: { id, version }, scheduler, schedule: data.schedule
      }),
      error: (exception) => ({
        type: DATASET_GENERATE_DATA_CONFIG_ERROR,
        dataset: { id, version }, exception
      }),
    }
  ))
}


function* generateDataConfigWatch({ dataset, scheduler, schedule }) {
  yield put(cpacpyConnectSendWatch(
    scheduler,
    schedule,
    {
      action: (scheduler, data) => {
        if (data.type !== "End") {
          return
        }
        return {
          type: DATASET_GENERATE_DATA_CONFIG_FINISHED,
          dataset, scheduler, schedule
        }
      },
      error: (exception) => ({
        type: DATASET_GENERATE_DATA_CONFIG_ERROR,
        dataset, scheduler, schedule, exception
      })
    }
  ))
}

function* generateDataConfigFetchResult({ dataset, scheduler, schedule }) {
  yield put(cpacpyFetchResults(
    scheduler,
    schedule,
    'data_config',
    {
      success: (data) => ({
        type: DATASET_GENERATE_DATA_CONFIG_FETCHED,
        dataset, data: data.result.data_config,
      }),
      error: (exception) => ({
        type: DATASET_GENERATE_DATA_CONFIG_ERROR,
        dataset, exception
      }),
    }
  ))
}

function* generateDataConfigResult({ dataset, data }) {
  yield put({
    type: DATASET_GENERATE_DATA_CONFIG_SUCCESS,
    dataset,
    config: cpac.data_config.parse(data),
  })
  yield put({ type: DATASET_CONFIG_SAVE })
}

function* updateDataset() {
  yield put({ type: DATASET_CONFIG_SAVE })
}

function* generateDataConfigUrlFetch({ dataset: { id }, url }) {
  try {
    const { response, error, headers: resHeaders } = yield call(
      fetch,
      url,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      }
    )

    yield put({
      type: DATASET_GENERATE_DATA_CONFIG_FETCHED,
      dataset: { id },
      data: response,
    })
  } catch (exception) {
    yield put({
      type: DATASET_GENERATE_DATA_CONFIG_ERROR,
      dataset: { id },
      exception: exception
    })
  }
}

export default function* configSaga() {
  yield all([
    ...configLocalState('dataset', { datasets }, {
      load: DATASET_CONFIG_LOAD,
      save: DATASET_CONFIG_SAVE,
      clear: DATASET_CONFIG_CLEAR,
      loadSuccess: DATASET_CONFIG_LOAD_SUCCESS,
      loadError: DATASET_CONFIG_LOAD_ERROR,
      saveSuccess: DATASET_CONFIG_SAVE_SUCCESS,
      saveError: DATASET_CONFIG_SAVE_ERROR,
      clearSuccess: DATASET_CONFIG_CLEAR_SUCCESS,
      clearError: DATASET_CONFIG_CLEAR_ERROR,
    }),
    takeEvery(DATASET_GENERATE_DATA_CONFIG, generateDataConfig),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_SCHEDULED, generateDataConfigWatch),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_FINISHED, generateDataConfigFetchResult),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_FETCHED, generateDataConfigResult),
    takeEvery(DATASET_SETTINGS_CREATE, updateDataset),
    takeEvery(DATASET_SETTINGS_UPDATE, updateDataset),
    takeEvery(DATASET_GENERATE_DATA_CONFIG_URL, generateDataConfigUrlFetch),
  ])
}
