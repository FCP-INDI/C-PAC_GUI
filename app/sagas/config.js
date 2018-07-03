import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { CONFIG_LOAD, configLoading, configLoaded } from '../actions/main'
import { phenotype } from './config.data'

function* loadConfig (action) {
  yield put(configLoading(action))
  // yield delay(500)
  const config = {
    environments: {
      docker: {
        id: 'docker',
        type: 'docker',
        parameters: {
          name: 'docker-cpac',
          socket: '/var/run/docker.sock',
          server: {
            port: 5497
          },
          directories: {
            dataset: '/home/anibalsolon/data/ds114_test1',
            output: '/home/anibalsolon/outputs',
            working: '/home/anibalsolon/scratch'
          }
        }
      }
    },

    projects: {
      abide: {
        id: 'abide',
        name: 'ABIDE',
        summary: {
          pipelines: 4,
          subjects: 1350,
        },
        subjects: {
          data: phenotype,
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
          ],
          summary: {
            phenotype: [
              {
                variable: 'Sites',
                data: [
                  { name: 'CALTECH', value: 38 },
                  { name: 'CMU', value: 27 },
                  { name: 'KKI', value: 55 },
                  { name: 'LEUVEN', value: 29 },
                  { name: 'MAX_MUN', value: 57 },
                  { name: 'NYU', value: 184 },
                  { name: 'OHSU', value: 28 },
                  { name: 'OLIN', value: 36 },
                  { name: 'PITT', value: 57 },
                ]
              },
              {
                variable: 'Sex distribution',
                data: [
                  {
                    name: 'M',
                    value: [
                      0, 0, 0, 0, 0, 0, 1, 12, 26, 44, 58, 78, 84, 70, 72, 60, 57, 56, 38, 25, 29, 30, 22, 25, 14, 13, 10, 16, 11, 14, 9, 10, 6, 11, 6, 4, 3, 2, 3, 8, 1, 2, 5, 0, 2, 2, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]
                  },
                  {
                    name: 'F',
                    value: [
                      0, 0, 0, 0, 0, 0, 0, 0, 10, 12, 14, 8, 14, 13, 32, 6, 5, 9, 4, 3, 5, 3, 3, 3, 2, 1, 0, 1, 3, 3, 1, 2, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ]
                  },
                ]
              }
            ]
          }
        },
        pipelines: [
          {
            id: '0000-0000-0000-0000',
            name: 'My anatomical pipeline',
            versions: {
              1527624899948: {
                cpac_version: '1.3.0',
                steps: {
                  anatomical: {
                    template_registration: {
                      resolution: 1,
                      brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm_brain.nii.gz',
                      skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm.nii.gz',
                      // method: {
                      //   tool: 'ANTS',
                      //   with_skull: true
                      // }
                      method: {
                        tool: 'FSL',
                        fnirt: {
                          config: 'T1_2_MNI152_2mm',
                          mask: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}_brain_mask_dil.nii.gz'
                        }
                      }
                    },
                    skull_strip: {
                      method: {
                        tool: 'AFNI',

                      },
                      method: {
                        tool: 'BET',

                      },
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
                    slice_time_correction: {

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
                    derivatives: {
                      timeline_extraction: {
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
                      falff: {

                      },
                      reho: {

                      },
                      network_centrality: {

                      },
                    }
                  }
                }
              },
              1427624899848: { },
              1327623899848: { },
              1227622899848: { }
            }
          }
        ],
        runs: [
          {
            id: '123e4567-e89b-12d3-a456-426655440000',
            status: 'success',
            summary: {
              time: {
                start: 1527627291594,
                end: 1527627291594 + (60 * 60 * 4 + 60 * 37 + 35),
                total: 60 * 60 * 4 + 60 * 37 + 35
              },
              memory: { max: 20 * 1024 * 1024 * 1024, mean: 5 * 1024 * 1024 * 1024 }
            },
            environment: {
              id: 'docker'
            },
            subjects: {
              type: 'subset',
              id: '123e4567-e89b-12d3-a456-426655440000'
            },
            pipeline: {
              version: 1527623899848,
              checksum: 'e53815e8c095e270c6560be1bb76a65d'
            }
          },
          {
            id: '123e4567-e89b-12d3-a456-426655440001',
            status: 'paused',
            summary: {
              time: {
                start: 1527626291594,
                end: 1527626291594 + (60 * 60 * 4 + 60 * 37 + 35),
                total: 60 * 60 * 4 + 60 * 37 + 35
              },
              memory: { max: 20 * 1024 * 1024 * 1024, mean: 5 * 1024 * 1024 * 1024 }
            },
            environment: {
              id: 'docker'
            },
            subjects: {
              type: 'subset',
              id: '123e4567-e89b-12d3-a456-426655440001'
            },
            pipeline: {
              version: 1527623899848,
              checksum: 'e53815e8c095e270c6560be1bb76a65d'
            }
          }
        ]
      },
    }
  }

  const vers = Object.keys(config.projects.abide.pipelines[0].versions)
  const current = Math.max(...vers)

  config.projects.abide.pipelines[0].current = config.projects.abide.pipelines[0].versions[current]

  yield put(configLoaded(config))
}

function* configSaga () {
  yield takeEvery(CONFIG_LOAD, loadConfig)
}

export default configSaga
