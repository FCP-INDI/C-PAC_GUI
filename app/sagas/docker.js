import { delay } from 'redux-saga'
import { put, call, select, takeEvery } from 'redux-saga/effects'
import { DOCKER_INIT } from '../actions/docker'
import { environmentServerCheck, environmentChecked } from '../actions/main'

// import Docker from 'dockerode';

// image = 'bids/cpac:latest'
const image = 'cpac:latest'
const serverPort = '5497/tcp'

function dockerProcess (environment) {
  // const docker = new Docker({ socketPath: environment.parameters.socket })

  // docker.pullImage = async function (image) {
  //   const imgs = await docker.listImages()

  //   let foundImage = false
  //   for (const img of imgs) {
  //     if (img.RepoTags.find((t) => t === image)) {
  //       foundImage = true
  //       break
  //     }
  //   }

  //   if (foundImage) {
  //     return
  //   }

  //   return new Promise((resolve, reject) => {
  //     this.pull(image, (err, stream) => {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         this.modem.followProgress(stream, (err, output) => {
  //           if (!err) {
  //             resolve()
  //           } else {
  //             reject(err);
  //           }
  //         }, () => {
  //           console.log('Progress!')
  //         });
  //       }
  //     });
  //   })
  // }

  // return docker
  return {}
}

function* init (action) {
  const { environment: id } = action
  const environments = yield select((s) => s.main.config.environments);
  if (environments[id]) {
    const environment = environments[id]
    const docker = dockerProcess(environment)

    try {
      yield call(docker.pullImage, image)

      const {
        parameters: {
          name,
          directories: { dataset, output, working },
          server: { port }
        }
      } = environment

      const opts = {
        name,
        Hostname: name,
        Image: image,
        Cmd: ['/dataset', '/output', 'scheduler'],
        Volumes: {
          ['/dataset:' + dataset]: {},
          ['/output:' + output]: {},
          ['/scratch' + (working ? ':' + working : '')]: {},
        },
        ExposedPorts: {
          [port]: {}
        },
        PortBindings: {
          [port]: [
            {
              'HostIp': '127.0.0.1',
            }
          ]
        },
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        OpenStdin: false,
        StdinOnce: false
      }

      try {
        const existant = yield call(docker.getContainer.bind(docker), name)
        const stats = yield call(existant.inspect.bind(existant))
        const port = stats.NetworkSettings.Ports[serverPort][0]['HostPort']

        yield put(environmentChecked({
          [id]: {
            ...environment,
            runtime: {
              host: '127.0.0.1',
              port
            }
          }
        }))

        yield put(environmentServerCheck(id))
      } catch (error) {
        if (error.statusCode === 404) {
          const container = yield call(docker.createContainer.bind(docker), opts)
          yield call(container.start.bind(container))
          const stats = yield call(container.inspect.bind(container))
          const port = stats.NetworkSettings.Ports[serverPort][0]['HostPort']

          yield put(environmentChecked({
            [id]: {
              ...environment,
              runtime: {
                host: '127.0.0.1',
                port
              }
            }
          }))

          yield put(environmentServerCheck(id))
        } else {
          throw error
        }
      }
    } catch (error) {
      yield put(environmentChecked({
        [id]: {
          ...environment,
          status: {
            mode: 'OFFLINE'
          }
        }
      }))
    }
  }

}

function* configSaga () {
  yield takeEvery(DOCKER_INIT, init)
}

export default configSaga
