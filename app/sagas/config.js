import { delay } from 'redux-saga'
import { select, put, takeEvery } from 'redux-saga/effects'
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
} from '../actions/pipeline'

// import { phenotype } from './config.data'

function* loadConfig (action) {
  yield put(configLoading(action))
  // yield delay(500)

  const config = {

    datasets: [
      {
        id: '0000-0000-0000-0000',
        name: 'ABIDE',
        summary: {
          participants: 1112,
          sites: 17,
        },
        settings: {
          format: 'bids',
          base_directory: 's3://test-bucket/adhd',
          aws_credential_path: '',
          anatomical_path_template: '',
          functional_path_template: '',
          anatomical_scan: '',
          scan_parameters_path: '',
          brain_mask_path: '',
          fieldmap_phase_path_template: '',
          fieldmap_magnitude_path_template: '',
          subjects: {
            inclusion: [],
            exclusion: [],
          },
          sites: [],
        }
      },

      {
        id: '0000-0000-0000-0001',
        name: 'ABIDE II ',
        summary: {
          participants: 1114,
          sites: 19,
        },
        settings: {
          format: 'bids',
          base_directory: '',
          aws_credential_path: '',
          anatomical_path_template: '',
          functional_path_template: '',
          anatomical_scan: '',
          scan_parameters_path: '',
          brain_mask_path: '',
          fieldmap_phase_path_template: '',
          fieldmap_magnitude_path_template: '',
          subjects: {
            inclusion: [],
            exclusion: [],
          },
          sites: [],
        }
      }
    ],

    pipelines: [
      {
        id: 'default',
        name: 'Default',
        versions: {
          '0': {
            version: '1.3.0',
            configuration: {
              anatomical: {
                enabled: true,
                registration: {
                  resolution: 1,
                  brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm_brain.nii.gz',
                  skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm.nii.gz',
                  methods: {
                    ants: { enabled: true, configuration: { skull_on: false } },
                    fsl: { enabled: true, configuration: { config_file: '', reference_mask: '' } }
                  }
                },
                skull_stripping: {
                  enabled: true,
                  methods: {
                    afni: { enabled: true },
                    bet: { enabled: false }
                  }
                },
                tissue_segmentation: {
                  enabled: true,
                  priors: {
                    white_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
                    gray_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_gray_bin.nii.gz',
                    cerebrospinal_fluid: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_csf_bin.nii.gz',
                  }
                }
              },
              functional: {
                enabled: true,
                slice_timing_correction: {
                  enabled: true,
                  pattern: 'header',
                  repetition_time: '',
                  first_timepoint: '',
                  last_timepoint: '',
                },
                distortion_correction: {
                  enabled: true,
                  skull_stripping: 'afni',
                  threshold: 0.6,
                  delta_te: 2.46,
                  dwell_time: 0.0005,
                  dwell_to_assymetric_ratio: 0.93902439,
                  phase_encoding_direction: 'x',
                },
                anatomical_registration: {
                  enabled: true,
                  bb_registration: false,
                  bb_registration_scheduler: '${environment.paths.fsl_dir}/etc/flirtsch/bbr.sch',
                  registration_input: 'mean',
                  functional_volume: 0,
                  functional_masking: {
                    bet: false,
                    afni: false,
                  },
                },
                template_registration: {
                  enabled: true,
                  functional_resolution: 3,
                  derivative_resolution: 3,
                  brain_template: '',
                  skull_template: '',
                  identity_matrix: '',

                },
                nuisance_regression: {
                  enabled: true,
                  lateral_ventricles_mask: '${environment.paths.fsl_dir}/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz',
                  compcor_components: 5,
                  friston_motion_regressors: true,
                  spike_denoising: {
                    no_denoising: true,
                    despiking: false,
                    scrubbing: false,
                  },
                  fd_calculation: 'jenkinson',
                  fd_threshold: 0.2,
                  pre_volumes: 1,
                  post_volumes: 1,
                },
                median_angle_correction: {
                  enabled: true,
                  target_angle: 90
                },
                temporal_filtering: {
                  enabled: true,
                  filters: [
                    {
                      low: 0.01,
                      high: 0.1
                    },
                  ]
                },
                aroma: {
                  enabled: true,
                },
                smoothing: {
                  enabled: true,
                  kernel_fwhm: 4,
                  before_zscore: false,
                  zscore_derivatives: false,
                }
              },
              derivatives: {
                enabled: true,
                timeseries_extraction: {
                  enabled: true,
                  masks: [
                  ],
                  outputs: {
                    csv: true,
                    numpy: true,
                  }
                },
                sca: {
                  enabled: false,
                  masks: [
                  ],
                  normalize: false,
                },
                vhmc: {
                  enabled: false,
                  symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_brain_symmetric.nii.gz',
                  symmetric_skull: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_symmetric.nii.gz',
                  dilated_symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_symmetric_dil.nii.gz',
                  flirt_configuration_file: '${environment.paths.fsl_dir}/etc/flirtsch/T1_2_MNI152_2mm.cnf',
                },
                alff: {
                  enabled: false,
                  cutoff: {
                    low: 0.01,
                    high: 0.1,
                  }
                },
                reho: {
                  enabled: false,
                  cluster_size: 7,
                },
                network_centrality: {
                  enabled: false,
                  mask: '',
                  degree_centrality: {
                    binarized: true,
                    weighted: true,
                    threshold_type: 'significance',
                    threshold: 0.001
                  },
                  eigenvector: {
                    binarized: true,
                    weighted: true,
                    threshold_type: 'significance',
                    threshold: 0.001
                  },
                  local_connectivity_density: {
                    binarized: true,
                    weighted: true,
                    threshold_type: 'significance',
                    threshold: 0.001
                  },
                },
              }
            }
          },
        }
      }
    ],

    projects: [
      {
        id: 'abide',
        name: 'ABIDE Preproc',
        pipeline: 'default',
        last_modification: new Date(Date.UTC(2015, 11, 17, 3, 24, 0)),
        participants: {
          dataset: '0000-0000-0000-0000',
          subsets: [
            {
              id: '123e4567-e89b-12d3-a456-426655440000',
              description: 'Site: NYU',
              subjects: [
                "51456", "51457", "51458", "51459", "51460", "51461", "51462", "51463", "51464", "51465", "51466", "51467", "51468", "51469", "51470", "51471", "51472", "51473", "51474", "51475", "51476", "51477", "51478", "51479", "51480", "51481", "51482", "51483", "51484", "51485", "51486", "51487", "51488", "51489", "51490", "51491", "51492", "51493"
              ]
            },
            {
              id: '123e4567-e89b-12d3-a456-426655440001',
              description: 'Site: CALTECH',
              subjects: [
                "51456", "51457", "51458", "51459", "51460", "51461", "51462", "51463", "51464", "51465", "51466", "51467", "51468", "51469"
              ]
            },
          ]
        },
      },
    ]
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
  yield [
    takeEvery(CONFIG_LOAD, loadConfig),

    takeEvery(CONFIG_SAVE, saveConfig),
    takeEvery(PIPELINE_NAME_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_UPDATE, saveConfig),
    takeEvery(PIPELINE_VERSION_DIRTY_SAVE, saveConfig),
    takeEvery(PIPELINE_DUPLICATE, saveConfig),

    takeEvery(CONFIG_CLEAR, clearConfig),
  ]
}
