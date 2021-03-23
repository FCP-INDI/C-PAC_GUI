export const DATASET_CONFIG_LOAD = 'DATASET_CONFIG_LOAD'
export const DATASET_CONFIG_LOAD_SUCCESS = 'DATASET_CONFIG_LOAD_SUCCESS'
export const DATASET_CONFIG_LOAD_ERROR = 'DATASET_CONFIG_LOAD_ERROR'
export const DATASET_CONFIG_SAVE = 'DATASET_CONFIG_SAVE'
export const DATASET_CONFIG_SAVE_SUCCESS = 'DATASET_CONFIG_SAVE_SUCCESS'
export const DATASET_CONFIG_SAVE_ERROR = 'DATASET_CONFIG_SAVE_ERROR'
export const DATASET_CONFIG_CLEAR = 'DATASET_CONFIG_CLEAR'
export const DATASET_CONFIG_CLEAR_SUCCESS = 'DATASET_CONFIG_CLEAR_SUCCESS'
export const DATASET_CONFIG_CLEAR_ERROR = 'DATASET_CONFIG_CLEAR_ERROR'

export const DATASET_SETTINGS_CREATE = 'DATASET_SETTINGS_CREATE'
export const DATASET_SETTINGS_UPDATE = 'DATASET_SETTINGS_UPDATE'

export const DATASET_GENERATE_DATA_CONFIG = 'DATASET_GENERATE_DATA_CONFIG'
export const DATASET_GENERATE_DATA_CONFIG_SUCCESS = 'DATASET_GENERATE_DATA_CONFIG_SUCCESS'
export const DATASET_GENERATE_DATA_CONFIG_ERROR = 'DATASET_GENERATE_DATA_CONFIG_ERROR'

export const DATASET_GENERATE_DATA_CONFIG_SCHEDULED = 'DATASET_GENERATE_DATA_CONFIG_SCHEDULED'
export const DATASET_GENERATE_DATA_CONFIG_FINISHED = 'DATASET_GENERATE_DATA_CONFIG_FINISHED'
export const DATASET_GENERATE_DATA_CONFIG_FETCHED = 'DATASET_GENERATE_DATA_CONFIG_FETCHED'

export const DATASET_GENERATE_DATA_CONFIG_URL = 'DATASET_GENERATE_DATA_CONFIG_URL'

export const DATASET_SELECT_SCHEDULER = 'DATASET_SELECT_SCHEDULER'

export function createDataSettings(name, configuration) {
  return {
    type: DATASET_SETTINGS_CREATE,
    dataset: { name, configuration }
  }
}

export function updateDataSettings(id, name, configuration) {
  return {
    type: DATASET_SETTINGS_UPDATE,
    dataset: { id, name, configuration }
  }
}

export function generateDataConfig(scheduler, dataset) {
  return {
    type: DATASET_GENERATE_DATA_CONFIG,
    scheduler, dataset
  }
}

export function importDataConfig(dataset, config) {
  return {
    type: DATASET_GENERATE_DATA_CONFIG_SUCCESS,
    dataset, config
  }
}

export function generateDataConfigUrlFetch(dataset, url) {
  return {
    type : DATASET_GENERATE_DATA_CONFIG_URL,
    dataset, url
  }
}

export function updateDatasetError(dataset, exception) {
  return {
    type: DATASET_GENERATE_DATA_CONFIG_ERROR,
    dataset, exception
  }
}

export function datasetSaveAll() {
  return {
    type: DATASET_CONFIG_SAVE,
  }
}
