import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { CONFIG_LOAD, configLoading, configLoaded } from '../actions/main'
import { phenotype } from './config.data'

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
        }
      },

      {
        id: '0000-0000-0000-0001',
        name: 'ABIDE II ',
        summary: {
          participants: 1114,
          sites: 19,
        }
      }
    ],

    pipelines: [
      {
        id: '0000-0000-0000-0000',
        name: 'Default',
        last_version: 1527624899948,
        versions: {
          1527624899948: {
            cpac_version: '1.3.0',
            configuration: {
              anatomical: {
                registration: {
                  resolution: 1,
                  brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm_brain.nii.gz',
                  skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm.nii.gz',
                  methods: {
                    ants: { enabled: true, configuration: { skull_on: false } },
                    fnirt: { enabled: true, configuration: { config_file: '', reference_mask: '' } }
                  }
                },
                skull_stripping: {
                  enabled: true,
                  methods: {
                    afni: { enabled: false },
                    bet: { enabled: false }
                  }
                },
                tissue_segmentation: {
                  priors: {
                    white_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
                    gray_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_gray_bin.nii.gz',
                    cerebrospinal_fluid: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_csf_bin.nii.gz',
                  }
                }
              },
              functional: {
                slice_timing_correction: {

                },
                distortion_correction: {

                },
                anatomical_registration: {

                },
                template_registration: {

                },
                nuisance_regression: {

                },
                median_angle_correction: {

                },
                temporal_filtering: {

                },
                aroma: {

                }
              },
              derivatives: {
                timeseries_extraction: {
                  mask: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
                  methods: [
                    { method: 'SpatialRegression' },
                    { method: 'DualRegression' },
                    { method: 'MultipleRegression' },
                    { method: 'Average' },
                  ]
                },
                sca: {

                },
                vhmc: {

                },
                alff: {

                },
                reho: {

                },
                network_centrality: {

                },
              }
            }
          },
        }
      },
      {
        id: '0000-0000-0000-0001',
        name: 'Wooba-dooba',
        last_version: 1527624899948,
      },
      {
        id: '0000-0000-0000-0002',
        name: 'Monkey proc',
        last_version: 1527624899948,
      }
    ],

    projects: [
      {
        id: 'abide',
        name: 'ABIDE Preproc',
        pipeline: '0000-0000-0000-0000',
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

  config.pipelines[1].versions = config.pipelines[0].versions
  config.pipelines[2].versions = config.pipelines[0].versions

  yield put(configLoaded(config))
}

function* configSaga () {
  yield takeEvery(CONFIG_LOAD, loadConfig)
}

export default configSaga
