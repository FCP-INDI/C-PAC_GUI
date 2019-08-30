import { fromJS } from 'immutable'

import {
  EXECUTION_PREPROCESS
} from '../actions/execution'

const initialState = fromJS({
  executions: [],
})

export default function (state = initialState, action) {
  if (!state) {
    return initialState
  }

  if (!action) {
    return state
  }

  switch (action.type) {
    // case EXECUTION_CONFIG_LOAD_SUCCESS:
    //   return fromJS(action.config)

    case EXECUTION_PREPROCESS_SAVE: {
      const { dataset: id, config } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state.setIn([
        'datasets', i, 'data'
      ], fromJS(config))
    }
      
    default:
      return state
  }
}
