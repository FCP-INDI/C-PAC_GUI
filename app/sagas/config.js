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
  PIPELINE_NAME_UPDATE,
  PIPELINE_DUPLICATE,
  PIPELINE_VERSION_DIRTY_UPDATE,
  PIPELINE_VERSION_DIRTY_SAVE,
  PIPELINE_DOWNLOAD
} from '../actions/pipeline'


// import { phenotype } from './config.data'
import cpac from '@internal/c-pac'

function* loadConfig (action) {
  yield put(configLoading(action))
  // yield delay(500)

  const config = {

    settings: {
      advanced: false,
    },

    datasets: [
      // {
      //   id: '0000-0000-0000-0000',
      //   name: 'ABIDE',
      //   summary: {
      //     participants: 1112,
      //     sites: 17,
      //   },
      //   settings: {
      //     format: 'bids',
      //     base_directory: 's3://test-bucket/adhd',
      //     aws_credential_path: '',
      //     anatomical_path_template: '',
      //     functional_path_template: '',
      //     anatomical_scan: '',
      //     scan_parameters_path: '',
      //     brain_mask_path: '',
      //     fieldmap_phase_path_template: '',
      //     fieldmap_magnitude_path_template: '',
      //     subjects: {
      //       inclusion: [],
      //       exclusion: [],
      //     },
      //     sites: [],
      //   }
      // },

      // {
      //   id: '0000-0000-0000-0001',
      //   name: 'ABIDE II ',
      //   summary: {
      //     participants: 1114,
      //     sites: 19,
      //   },
      //   settings: {
      //     format: 'bids',
      //     base_directory: '',
      //     aws_credential_path: '',
      //     anatomical_path_template: '',
      //     functional_path_template: '',
      //     anatomical_scan: '',
      //     scan_parameters_path: '',
      //     brain_mask_path: '',
      //     fieldmap_phase_path_template: '',
      //     fieldmap_magnitude_path_template: '',
      //     subjects: {
      //       inclusion: [],
      //       exclusion: [],
      //     },
      //     sites: [],
      //   }
      // }
    ],

    pipelines: [
      cpac.pipeline.template
    ],

    // projects: [
    //   {
    //     id: 'abide',
    //     name: 'ABIDE Preproc',
    //     pipeline: 'default',
    //     last_modification: new Date(Date.UTC(2015, 11, 17, 3, 24, 0)),
    //     participants: {
    //       dataset: '0000-0000-0000-0000',
    //       subsets: [
    //         {
    //           id: '123e4567-e89b-12d3-a456-426655440000',
    //           description: 'Site: NYU',
    //           subjects: [
    //             "51456", "51457", "51458", "51459", "51460", "51461", "51462", "51463", "51464", "51465", "51466", "51467", "51468", "51469", "51470", "51471", "51472", "51473", "51474", "51475", "51476", "51477", "51478", "51479", "51480", "51481", "51482", "51483", "51484", "51485", "51486", "51487", "51488", "51489", "51490", "51491", "51492", "51493"
    //           ]
    //         },
    //         {
    //           id: '123e4567-e89b-12d3-a456-426655440001',
    //           description: 'Site: CALTECH',
    //           subjects: [
    //             "51456", "51457", "51458", "51459", "51460", "51461", "51462", "51463", "51464", "51465", "51466", "51467", "51468", "51469"
    //           ]
    //         },
    //       ]
    //     },
    //   },
    // ]
  }

  let initialState = null
  try {
    initialState = JSON.parse(localStorage.getItem('state'))
  } catch (e) {
  }

  if (!initialState) {
    initialState = config
    localStorage.setItem('state', JSON.stringify(config))
    console.log("Using initial state")
  } else {
    console.log("Using local state")
  }

  yield put(configLoaded(initialState))
}

function* saveConfig() {
  const config = yield select((state) => state.main.getIn(['config']));
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
    takeEvery(PIPELINE_NAME_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_SAVE, saveConfig),
    takeEvery(PIPELINE_DUPLICATE, saveConfig),

    takeEvery(CONFIG_CLEAR, clearConfig),
  ])
}
