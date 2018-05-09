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
          subjects: 1350
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
