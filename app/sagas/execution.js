import { eventChannel } from 'redux-saga'
import { all, delay, select, call, cancelled, put, race, take, takeEvery } from 'redux-saga/effects'

import cpac from '@internal/c-pac'

import { executions } from './execution.default'

import {
  EXECUTION_CONFIG_LOAD,
  EXECUTION_CONFIG_LOAD_SUCCESS,
  EXECUTION_CONFIG_LOAD_ERROR,
  EXECUTION_CONFIG_SAVE,
  EXECUTION_CONFIG_SAVE_SUCCESS,
  EXECUTION_CONFIG_SAVE_ERROR,
  EXECUTION_CONFIG_CLEAR,
  EXECUTION_CONFIG_CLEAR_SUCCESS,
  EXECUTION_CONFIG_CLEAR_ERROR,

  EXECUTION_PREPROCESS_DATASET,
  EXECUTION_PREPROCESS_DATASET_SUCCESS,
  EXECUTION_PREPROCESS_DATASET_ERROR,
  EXECUTION_PREPROCESS_DATASET_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH_ERROR,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG_ERROR,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_ERROR,
  EXECUTION_PREPROCESS_DATASET_FINISHED,
  EXECUTION_PREPROCESS_DATASET_FETCHED,
} from '../actions/execution'

import {
  selectExecution,
  selectSchedule,
} from '../reducers/execution'

import {
  schedulePipeline as cpacpySchedulePipeline,
  connectSendWatch as cpacpyConnectSendWatch,
  fetchResults as cpacpyFetchResults,
} from '../actions/cpacpy'

import {
  selectScheduler,
} from '../reducers/cpacpy'

import {
  selectDataset,
} from '../reducers/dataset'

import {
  selectSaga as selectSagaFunc,
  configLocalState,
} from './utils'

const selectSaga = selectSagaFunc('execution')

function* preprocessDataset({ execution: executionId }) {
  const execution = yield selectSaga(selectExecution(executionId))
  const scheduler = yield selectSagaFunc('cpacpy')(selectScheduler(execution.getIn(['scheduler', 'id'])))
  const dataset = yield selectSagaFunc('dataset')(selectDataset(execution.getIn(['dataset', 'id'])))

  // @TODO rework pipelines
  const pipeline = yield selectSagaFunc('main')(
    (state) => state.getIn(['config', 'pipelines']).find(
      (p) => p.get('id') == execution.getIn(['pipeline', 'id'])))

  yield put(cpacpySchedulePipeline(
    scheduler.get('id'),
    cpac.data_config.dump(dataset.toJS(), execution.getIn(['dataset', 'version']), execution.getIn(['dataset', 'view'])),
    cpac.pipeline.dump(pipeline.toJS(), execution.getIn(['dataset', 'version'])),
    {
      success: (data) => ({
        type: EXECUTION_PREPROCESS_DATASET_SCHEDULED,
        scheduler: scheduler.get('id'),
        execution: executionId,
        schedule: data.schedule
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_ERROR,
        scheduler: scheduler.get('id'),
        execution: executionId,
        exception
      }),
    },
    execution.getIn(['scheduler', 'profile']),
  ))
}

function* preprocessDatasetWatch({ scheduler, execution, schedule }) {
  yield put({
    type: EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED,
    scheduler, execution, schedule
  })
}

function* preprocessDatasetProcessingScheduleWatch({ scheduler, execution, schedule, parent }) {
  yield put(cpacpyConnectSendWatch(
    scheduler,
    schedule,
    {
      action: (scheduler, data) => {
        switch (data.type) {
          case 'Spawn': {
            const { name, child: subSchedule } = data.message
            return {
              type: EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED,
              scheduler, execution, schedule: subSchedule, name, parent: schedule,
            }
          }
          case 'Status': {
            const subSchedule = data.id
            const status = data.message.status
            return {
              type: EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS,
              scheduler, execution, schedule: subSchedule, status,
            }
          }
          case 'Result': {
            const subSchedule = data.id
            const { result, timestamp, key} = data.message
            return {
              type: EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT,
              scheduler, execution, schedule: subSchedule, key, result, timestamp: timestamp * 1000.,
            }
          }
          case 'End': {
            const subSchedule = data.id
            const status = data.message.status.toLowerCase()
            return {
              type: EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED,
              scheduler, execution, schedule: subSchedule, status
            }
          }
        }
      },
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_PROCESSING_ERROR,
        scheduler, execution, schedule, exception
      })
    }
  ))
}

function* preprocessDatasetProcessingScheduleFinish({ scheduler, execution: executionId }) {
  const execution = yield selectSaga(selectExecution(executionId))
  const allStatuses = execution
    .get('schedules')
    .valueSeq()
    .every((s) => s.get('status') === 'success' || s.get('status') === 'failure')
    
  if (allStatuses) {
    yield put({
      type: EXECUTION_PREPROCESS_DATASET_FINISHED,
      scheduler, execution: executionId,
    })
    yield put({ type: EXECUTION_CONFIG_SAVE })
  }
}

function* preprocessDatasetFetchLogResult({ scheduler, execution, schedule: scheduleId, key, timestamp }) {
  const schedule = yield selectSaga(selectSchedule(execution, scheduleId))
  let log = ''
  if (schedule) {
    log = schedule.get('log') || ''
  }

  yield put(cpacpyFetchResults(
    scheduler,
    scheduleId,
    key,
    {
      success: (data, name) => ({
        type: EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG,
        scheduler, execution, schedule: scheduleId, key, log: log + data, timestamp, name,
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG_ERROR,
        scheduler, execution, schedule: scheduleId, key, exception
      }),
    },
    { start: 0, end: null }
  ))
}

function* preprocessDatasetFetchCrashResult({ scheduler, execution, schedule, key, timestamp }) {
  yield put(cpacpyFetchResults(
    scheduler,
    schedule,
    key,
    {
      success: (data, name) => ({
        type: EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH,
        scheduler, execution, schedule, key, crash: JSON.parse(data), timestamp, name,
      }),
      error: (exception) => ({
        type: EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH_ERROR,
        scheduler, execution, schedule, key, exception
      }),
    }
  ))
}

export default function* configSaga() {
  yield all([
    ...configLocalState('execution', { executions }, {
      load: EXECUTION_CONFIG_LOAD,
      save: EXECUTION_CONFIG_SAVE,
      clear: EXECUTION_CONFIG_CLEAR,
      loadSuccess: EXECUTION_CONFIG_LOAD_SUCCESS,
      loadError: EXECUTION_CONFIG_LOAD_ERROR,
      saveSuccess: EXECUTION_CONFIG_SAVE_SUCCESS,
      saveError: EXECUTION_CONFIG_SAVE_ERROR,
      clearSuccess: EXECUTION_CONFIG_CLEAR_SUCCESS,
      clearError: EXECUTION_CONFIG_CLEAR_ERROR,
    }),
    takeEvery(EXECUTION_PREPROCESS_DATASET, preprocessDataset),
    takeEvery(EXECUTION_PREPROCESS_DATASET_SCHEDULED, preprocessDatasetWatch),
    takeEvery(EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED, preprocessDatasetProcessingScheduleWatch),
    takeEvery(EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED, preprocessDatasetProcessingScheduleFinish),
    takeEvery(
      (act) => 
        act.type === EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT && act?.result?.type === 'crash',
      preprocessDatasetFetchCrashResult
    ),
    takeEvery(
      (act) => 
        act.type === EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT && act?.result?.type === 'log',
      preprocessDatasetFetchLogResult
    ),
  ])
}