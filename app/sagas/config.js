import { delay } from 'redux-saga'
import { all, select, put, takeEvery } from 'redux-saga/effects'
import {
  CONFIG_LOAD,
  configLoading,
  configLoaded,

  CONFIG_SAVE,
  configSaved,

  CONFIG_CLEAR,
  configCleared,
} from '../actions/main'

import {
  DATASET_CONFIG_LOAD,
} from '../actions/dataset'

import {
  PIPELINE_NAME_UPDATE,
  PIPELINE_DUPLICATE,
  PIPELINE_VERSION_DIRTY_UPDATE,
  PIPELINE_VERSION_DIRTY_SAVE,
  PIPELINE_DOWNLOAD
} from '../actions/pipeline'

import {
  init as cpacpyInit
} from '../actions/cpacpy'

import cpac from '@internal/c-pac'

function* loadConfig () {
  yield put(configLoading())

  const config = {

    version: VERSION,
    settings: {
      advanced: false,
    },

    pipelines: [
      cpac.pipeline.template
    ],

    group_analyses: [
      {
        id: '0000-0000-0000-0001',
        steps: [
          {
            type: 'MDMR',
            parameters: {
              factors: [],
              covariates: [],
              permutations: 1000,
            }
          },
          {
            type: 'ISC',
            parameters: {
              std_filter: 0.0,
              permutations: 1000,
            }
          },
          {
            type: 'ISFC',
            parameters: {
              std_filter: 0.0,
              permutations: 1000,
            }
          },
          {
            type: 'QPP',
            parameters: {
              permutations: 1000,
              iterations: 15,
              window: 30,
              initial_threshold: 0.2,
              final_threshold: 0.3,
              initial_threshold_iterations: 20,
            }
          },
          {
            type: 'FEAT',
            parameters: {
              formula: 'Sex + Diagnosis + Age + MeanFD_Jenkinson + Custom_ROI_Mean',
              
            }
          },
        ]
      }
    ],

  }

  let localState = null
  try {
    localState = JSON.parse(localStorage.getItem('state'))
  } catch (e) {
  }

  if (!localState) {
    localState = config
    localStorage.setItem('state', JSON.stringify(config))
    console.log("Using initial state")
  } else {
    console.log("Using local state")
  }

  if (!localState.executions) {
    localState.executions = []
    localStorage.setItem('state', JSON.stringify(localState))
  }

  if (localState.pipelines) {
    localState.pipelines = localState.pipelines.map(cpac.pipeline.normalize)
    localStorage.setItem('state', JSON.stringify(localState))
  }

  if (!localState.version) {
    localState.version = VERSION
    localStorage.setItem('state', JSON.stringify(localState))
  }

  yield put({ type: DATASET_CONFIG_LOAD })
  yield put(configLoaded(localState))

  yield put(cpacpyInit())
}

function* saveConfig() {
  const config = yield select((state) => state.main.getIn(['config']))
  localStorage.setItem('state', JSON.stringify(config.toJS()))
  yield put(configSaved())
}

function* clearConfig(config) {
  localStorage.removeItem('state')
  yield put(configCleared(config))
}

export default function* configSaga () {
  yield all([
    takeEvery(CONFIG_LOAD, loadConfig),
    takeEvery(CONFIG_SAVE, saveConfig),
    takeEvery(CONFIG_CLEAR, clearConfig),

    takeEvery(PIPELINE_NAME_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_SAVE, saveConfig),
    takeEvery(PIPELINE_DUPLICATE, saveConfig),
  ])
}
