import { fromJS, List } from 'immutable'

import {
  EXECUTION_CONFIG_LOAD_SUCCESS,
  EXECUTION_PREPROCESS_DATASET,
  EXECUTION_PREPROCESS_DATASET_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_SCHEDULED,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS,
  EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED,
  EXECUTION_PREPROCESS_DATASET_FINISHED,
} from '../actions/execution'

const initialState = fromJS({
  executions: [],
})


export const selectExecutions =
  () => (state) => state.get('executions')

export const selectExecution =
  (execution) => (state) => state.get('executions').find((e) => e.get('id') == execution)


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
        scheduler: { id: scheduler.id, backend: scheduler.backend },
        pipeline: { id: pipeline.id, version: pipeline.version },
        dataset: { id: dataset.id, version: dataset.version, view: dataset.view },
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
          logs: [],
          status: null,
        }))
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_STATUS: {
      const { execution, schedule, status } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      return state.setIn(['executions', i, 'schedules', schedule, 'status'], status)
    }

    case EXECUTION_PREPROCESS_DATASET_PROCESSING_FINISHED: {
      const { execution, schedule, status } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)
      return state.setIn(['executions', i, 'schedules', schedule, 'status'], status)
    }

    case EXECUTION_PREPROCESS_DATASET_FINISHED: {
      const { execution } = action
      const i = state.get('executions').findIndex((e) => e.get('id') === execution)

      const status = state.getIn(['executions', i, 'schedules'])
        .valueSeq()
        .every((s) => s.get('status') === 'success') ? 'success' : 'failure'

      return state.setIn(['executions', i, 'status'], status)
    }
    default:
      return state
  }
}
