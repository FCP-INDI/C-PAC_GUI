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
<<<<<<< HEAD
<<<<<<< HEAD
  PIPELINE_DELETE,
=======
  DATASET_CONFIG_LOADED,
=======
  DATASET_CONFIG_LOAD,
>>>>>>> 31b5f4b (data config viewer)
} from '../actions/dataset'

import {
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)
  PIPELINE_NAME_UPDATE,
  PIPELINE_DUPLICATE,
  PIPELINE_VERSION_DIRTY_UPDATE,
  PIPELINE_VERSION_DIRTY_SAVE,
  PIPELINE_DOWNLOAD,
  PIPELINE_IMPORT_DONE,
  PIPELINE_IMPORT
} from '../actions/pipeline'

import {
  init as theodoreInit
} from '../actions/theodore'

<<<<<<< HEAD
<<<<<<< HEAD
// import { phenotype } from './config.data'
import cpac from '@internal/c-pac';
import { getDefaultPipeline, defaultPipelineUrl } from '@internal/c-pac/pipeline';
import cpacSchema from '@internal/c-pac/resources/pipeline/schema.json';

import { fromJS } from 'immutable';
=======
import {
  datasets
} from './config.dataset'

import cpac from '@internal/c-pac'

function* loadConfig (action) {
  yield put(configLoading(action))
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)
=======
import cpac from '@internal/c-pac'

function* loadConfig () {
  yield put(configLoading())
>>>>>>> 31b5f4b (data config viewer)

async function getPipelineDefault() {
  const pipelineDefault = await getDefaultPipeline(defaultPipelineUrl);
  return pipelineDefault;
}

function* loadConfig(action) {
  yield put(configLoading(action));

<<<<<<< HEAD
<<<<<<< HEAD
  let initialState = null;

  yield getPipelineDefault().then((template) => {

    const config = {

      version: VERSION,
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
      schema: { pipeline: fromJS(cpacSchema) },
      pipelines: [
        template
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

      executions: [

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
=======
    datasets,
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)

    try {
      initialState = JSON.parse(localStorage.getItem('state'))
    } catch (e) {
    }
=======
    pipelines: [
      cpac.pipeline.template
    ],
>>>>>>> 31b5f4b (data config viewer)

    if (!initialState) {
      initialState = config;
      localStorage.setItem('state', JSON.stringify(config));
      console.log("Using initial state");
    } else {
      // Update default if necessary
      if (!fromJS(template).equals(fromJS(initialState.pipelines[0]))) {
        const pipelineIds = initialState.pipelines.map((p) => p.id);
        let oldDefault = initialState.pipelines[0];
        if (oldDefault == undefined) {
          initialState.pipelines.push(template);
        } else if (oldDefault.versions !== undefined) {
          if (Object.keys(oldDefault.versions).includes['0']) {
            oldDefault.id = `default-${oldDefault.versions[0].version}`;
          }
          if (!pipelineIds.includes(template.id)) {
            initialState.pipelines.push(oldDefault);
            initialState.pipelines[0] = template;
          };
        };
      };
      console.log("Using local state");
    }

<<<<<<< HEAD
    if (!initialState.executions) {
      initialState.executions = []
      localStorage.setItem('state', JSON.stringify(initialState))
    }

    if (initialState.pipelines) {
      localStorage.setItem('state', JSON.stringify(initialState));
    }

    if (!initialState.version) {
      initialState.version = VERSION
      localStorage.setItem('state', JSON.stringify(initialState))
    }
  });

  yield put(configLoaded(initialState));
=======
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

  yield put(theodoreInit())
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)
}

function* saveConfig() {
<<<<<<< HEAD
  const config = yield select((state) => state.main.getIn(['config']));
  localStorage.setItem('state', JSON.stringify(config.toJS()));
=======
  const config = yield select((state) => state.main.getIn(['config']))
  localStorage.setItem('state', JSON.stringify(config.toJS()))
>>>>>>> 31b5f4b (data config viewer)
  yield put(configSaved())
}

function* clearConfig(config) {
  localStorage.removeItem('state')
  yield put(configCleared(config))
}

export default function* configSaga() {
  yield all([
    takeEvery(CONFIG_LOAD, loadConfig),
    takeEvery(CONFIG_SAVE, saveConfig),
<<<<<<< HEAD
    takeEvery(PIPELINE_IMPORT, saveConfig),
    takeEvery(PIPELINE_IMPORT_DONE, saveConfig),
=======
    takeEvery(CONFIG_CLEAR, clearConfig),

>>>>>>> 31b5f4b (data config viewer)
    takeEvery(PIPELINE_NAME_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_SAVE, saveConfig),
    takeEvery(PIPELINE_DUPLICATE, saveConfig),
<<<<<<< HEAD
    takeEvery(PIPELINE_DELETE, saveConfig),
    takeEvery(CONFIG_CLEAR, clearConfig),
=======
>>>>>>> 31b5f4b (data config viewer)
  ])
}
