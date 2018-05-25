import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { CONFIG_LOAD, configLoading, configLoaded } from '../actions/main'

function* loadConfig (action) {
  yield put(configLoading(action))
  // yield delay(500)
  yield put(configLoaded({
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
        data: {
          subjects: {
            summary: {
              phenotype: [
                {
                  variable: 'Sites',
                  data: [
                    { name: 'CALTECH', value: 38 },
                    { name: 'CMU', value: 27 },
                    { name: 'KKI', value: 55 },
                    { name: 'LEUVEN_1', value: 29 },
                    { name: 'LEUVEN_2', value: 35 },
                    { name: 'MAX_MUN', value: 57 },
                    { name: 'NYU', value: 184 },
                    { name: 'OHSU', value: 28 },
                    { name: 'OLIN', value: 36 },
                    { name: 'PITT', value: 57 },
                    { name: 'SBL', value: 30 },
                    { name: 'SDSU', value: 36 },
                    { name: 'STANFORD', value: 40 },
                    { name: 'TRINITY', value: 49 },
                    { name: 'UCLA_1', value: 82 },
                    { name: 'UCLA_2', value: 27 },
                    { name: 'UM_1', value: 110 },
                    { name: 'UM_2', value: 35 },
                    { name: 'USM', value: 101 },
                    { name: 'YALE', value: 56 },
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
          }
        },
        pipelines: [
          {
            id: '0000-0000-0000-0000',
            name: 'Just anatomical',
            definition: {

            }
          }
        ]
      },
      adhd: {
        id: 'adhd',
        name: 'ADHD',
        summary: {
          pipelines: 2,
          subjects: 300
        }
      },
    }
  }))
}

function* configSaga () {
  yield takeEvery(CONFIG_LOAD, loadConfig)
}

export default configSaga
