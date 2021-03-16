import { fromJS } from 'immutable'
import cpac from '@internal/c-pac'

import {
  DATASET_CONFIG_LOAD_SUCCESS,
  DATASET_SETTINGS_CREATE,
  DATASET_SETTINGS_UPDATE,
  DATASET_GENERATE_DATA_CONFIG,
  DATASET_GENERATE_DATA_CONFIG_SUCCESS,
  DATASET_GENERATE_DATA_CONFIG_ERROR,
  DATASET_GENERATE_DATA_CONFIG_SCHEDULED,
  DATASET_GENERATE_DATA_CONFIG_FETCHED,
  DATASET_SELECT_SCHEDULER,
} from '../actions/dataset'

const initialState = fromJS({
  datasets: [],
})

export const selectDatasets =
  () => (state) => state.get('datasets')

export const selectDataset =
  (dataset) => (state) => state.get('datasets').find((d) => d.get('id') == dataset)


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

    case DATASET_GENERATE_DATA_CONFIG: {
      const { dataset: { id } } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state
        .setIn(['datasets', i, 'loading'], true)
        .removeIn(['datasets', i, 'error'])
    }
    
    case DATASET_GENERATE_DATA_CONFIG_SUCCESS: {
      const { dataset: { id }, config } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state
        .setIn(['datasets', i, 'data'], fromJS(config))
        .setIn(['datasets', i, 'loading'], false)
        .removeIn(['datasets', i, 'error'])
    }

    case DATASET_GENERATE_DATA_CONFIG_ERROR: {
      const { dataset: { id }, exception } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)
      let errorMessage = exception.message
      if (!errorMessage) {
        errorMessage = 'general exception'
      }

      return state
        .setIn(['datasets', i, 'error'], errorMessage)
        .setIn(['datasets', i, 'loading'], false)
    }

    case DATASET_GENERATE_DATA_CONFIG_SCHEDULED: {
      const { dataset: { id }, config } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)

      return state
        .setIn(['datasets', i, 'data'], fromJS(config))
    }

    case DATASET_SETTINGS_CREATE: {
      const { dataset: { name, configuration } } = action
      let id = cpac.utils.slugify(name);
      let i = state.get('datasets').findIndex((d) => d.get('id') === id)
      let c = null;
      if (i !== -1) {
        c = 0;
        while (i > -1) {
          c++;
          i = state.get('datasets').findIndex((d) => d.get('id') === `${id}-${c}`);
        }
      }

      const version = Object.keys(cpac.data_settings.template.versions)[0]

      id = c !== null ? `${id}-${c}` : id;
      const dataset = fromJS(cpac.data_settings.template)
        .set('id', id)
        .set('name', name)
        .mergeIn(['versions', version, 'configuration'], fromJS(configuration))

      return state
        .updateIn(['datasets'], datasets => datasets.push(dataset))
    }

    case DATASET_SETTINGS_UPDATE: {
      const { dataset: { id, name, configuration } } = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)
      const version = `${state.getIn(['datasets', i, 'versions']).keySeq().map(i => +i).max()}`

      return state
        .setIn(['datasets', i, 'name'], name)
        .mergeIn(['datasets', i, 'versions', version, 'configuration'], fromJS(configuration))
    }

    case DATASET_SELECT_SCHEDULER: {
      const {dataset: {id}, scheduler} = action
      const i = state.get('datasets').findIndex((d) => d.get('id') === id)
      const version = `${state.getIn(['datasets', i, 'versions']).keySeq().map(i => +i).max()}`

      return state.setIn(['datasets', i, 'versions', version, 'configuration', 'options', 'scheduler'], scheduler)
    }

    default:
      return state
  }
}
