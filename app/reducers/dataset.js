import { fromJS } from 'immutable'

import {
  DATASET_CONFIG_LOAD_SUCCESS,
  DATASET_GENERATE_DATA_CONFIG,
  DATASET_GENERATE_DATA_CONFIG_SUCCESS,
  DATASET_GENERATE_DATA_CONFIG_ERROR,
  DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
  DATASET_GENERATE_DATA_CONFIG_FETCHED,
} from '../actions/dataset'

const initialState = fromJS({
  datasets: [],
})

export default function (state = initialState, action) {
  if (!state) {
    return initialState
  }

  if (!action) {
    return state
  }

  switch (action.type) {
    case DATASET_CONFIG_LOAD_SUCCESS:
      return fromJS(action.config)

    case DATASET_GENERATE_DATA_CONFIG_SUCCESS: {
      const { dataset: id, config } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state.setIn([
        'datasets', i, 'data'
      ], fromJS(config)).setIn([
        'datasets', i, 'loading'
      ], false)
    }

    case DATASET_GENERATE_DATA_CONFIG_SCHEDULED: {
      const { dataset: id, config } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state.setIn([
        'datasets', i, 'data'
      ], fromJS(config))
    }

    case DATASET_GENERATE_DATA_CONFIG: {
      const { dataset: id } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state.setIn([
        'datasets', i, 'loading'
      ], true)
    }
    
    default:
      return state
  }
}
