import { fromJS, isImmutable, List, Map } from 'immutable'

import {
  EXECUTION_CONFIG_LOAD_SUCCESS,
  EXECUTION_PREPROCESS_DATASET,
  EXECUTION_PREPROCESS_DATASET_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED,
  EXECUTION_PREPROCESS_DATASET_FINISHED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_NODELOG,
} from '../actions/execution'

const initialState = fromJS({
  executions: [],
})


export const selectExecutions =
  () => (state) => state.get('executions')

export const selectExecution =
  (execution) => (state) => state.get('executions').find((e) => e.get('id') == execution)

export const selectSchedule =
  (execution, schedule) => (state) => selectExecution(execution)(state).getIn(['schedules', schedule])


export default function (state = initialState, action) {
  if (!state) {
    return initialState
  }

  if (!action) {
    return state
  }

  switch (action.type) {
    case EXECUTION_CONFIG_LOAD_SUCCESS:
      return fromJS(action.config)

    case EXECUTION_PREPROCESS_DATASET: {
      const { execution: id, scheduler, dataset, pipeline, note } = action

      const execution = fromJS({
        id,
        note,
        start: new Date().getTime(),
        finish: null,
        status: 'unknown',
        scheduler: { id: scheduler.id, backend: scheduler.backend, profile: scheduler.profile },
        pipeline: { id: pipeline.id, version: pipeline.version },
        dataset: { id: dataset.id, version: dataset.version, view: dataset.view, subjectNum: dataset.subjectNum },
      })

      return state.updateIn(['executions'], executions => executions.push(execution))
    }

    case EXECUTION_PREPROCESS_DATASET_SCHEDULED: {
      const { execution } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)

      return state
        .setIn(['executions', i, 'status'], 'running')
        .setIn(['executions', i, 'schedules'], fromJS({}))
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED: {
      const { execution, schedule, name, parent=null } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)

      return state
        .setIn(['executions', i, 'schedules', schedule], fromJS({
          id: schedule,
          name,
          parent,
          status: null,
        }))
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS: {
      const { execution, schedule, status } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      return state.setIn(['executions', i, 'schedules', schedule, 'status'], status)
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_RESULT: {
      const { execution, schedule, key, result: { type } } = action
      if (type === "crash" || type === "log") {
        return state
      }

      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      const resultByType = ['executions', i, 'schedules', schedule, 'results', type]
      return state.setIn(
        resultByType,
        state.getIn(resultByType, List()).push(key)
      )
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_NODELOG: {
      const i = state.get('executions').findIndex((e) => e.get('id') === action.execution)
      let nodeInfos = Map()
      for (let nodeInfo of action.runtimeResults) {
        nodeInfos = nodeInfos.set(nodeInfo.data.message.content.id, fromJS({
          'id': nodeInfo.data.message.content.id,
          'start': nodeInfo.data.message.content.start,
          'finish': nodeInfo.data.message.content.end,
          'runtime_mem_gb': nodeInfo.data.message.content.runtime_memory_gb,
          'runtime_threads': nodeInfo.data.message.content.runtime_threads,
          'status': nodeInfo.data.message.content.runtime_memory_gb ? 'success' : 'running',
        }))
      }
      let nextState = state
      if (state.getIn(['executions', i, 'schedules', action.schedule, 'status']) === 'unknown') {
        nextState = state.setIn(['executions', i, 'schedules', action.schedule, 'status'], 'running')
      }
      return nextState.mergeIn(['executions', i, 'schedules', action.schedule, 'nodes'], nodeInfos)
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_LOG: {
      const { execution, schedule, key, log, timestamp, name } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      const resultByType = ['executions', i, 'schedules', schedule, 'results', 'logs', key]
      return state.setIn(resultByType, fromJS({ log, name, at: timestamp, _cache: true }))
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_CRASH: {
      const { execution, schedule, key, crash, timestamp, name } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      const resultByType = ['executions', i, 'schedules', schedule, 'results', 'crashes', key]
      return state.setIn(resultByType, fromJS({ ...crash, name, at: timestamp, _cache: true }))
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED: {
      const { execution, schedule, status } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      return state.setIn(['executions', i, 'schedules', schedule, 'status'], status)
        .updateIn(['executions', i, 'schedules', schedule, 'nodes'],
          item => item.map(kv => kv.set('status', kv.get('status') === 'success' ? 'success' : 'unknown')))
    }

    case EXECUTION_PREPROCESS_DATASET_FINISHED: {
      const { execution } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)

      const status = state.getIn(['executions', i, 'schedules'])
        .valueSeq()
        .every((s) => s.get('status') === 'success') ? 'success' : 'failure'

      return state
        .setIn(['executions', i, 'finish'], new Date().getTime())
        .setIn(['executions', i, 'status'], status)
    }
    default:
      return state
  }
}
