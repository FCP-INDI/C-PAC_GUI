import Docker from 'dockerode'
import requests from 'request'
import freePort from 'find-free-port'

const docker = new Docker({socketPath: '/var/run/docker.sock'})

export async function executions() {
  const containers = (await docker.listContainers())
    .filter((c) => c.Image.startsWith('fcpindi/c-pac'))
    .map((c) => ({
      id: `docker:${c.Id}`,
    }))
  return containers
}

export async function execute(pipeline, data_config) {
  const name = `c-pac_${new Date().getTime()}`

  console.log(`Executing ${name}`)

  const availablePort = `${await freePort(49152, 65535, '127.0.0.1')}`

  const container = await docker.createContainer({
    name,
    Image: 'fcpindi/c-pac:v1.4.0_dev',

    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: false,
    StdinOnce: false,

    Cmd: [
      '--pipeline_file',
      'data:text/plain;base64,' + Buffer.from(pipeline).toString('base64'),
      '--data_config_file',
      'data:text/plain;base64,' + Buffer.from(data_config).toString('base64'),
      '--monitoring',
      '/bids_dataset',
      '/outputs',
      'participant'
    ],
    ExposedPorts: { [availablePort]: {} },
    HostConfig: {
      PortBindings: { '8080': [{ HostPort: availablePort }] },
      Binds: [
        '/tmp:/scratch',
        `/tmp/${name}_dumb:/bids_dataset`,
        `/tmp/${name}_outputs:/outputs`,
      ],
    },
  })

  await container.start()
}

export async function logs(id) {
  const container = await docker.getContainer(id)
  const inspect = await container.inspect()

  const port = inspect.NetworkSettings.Ports['8080/tcp'][0]['HostPort']

  let log = {}

  while(true) {
    try {
      log = await request(`http://localhost:${port}`).json()
      // const iter = yield log
      // if (iter && iter.stop) {
      //   break
      // }
    } catch (error) {
    }
  }


  //inspect.State.Running
}
