import Docker from 'dockerode'

const docker = new Docker({socketPath: '/var/run/docker.sock'})

export async function executions() {
  const containers = (await docker.listContainers()).filter((c) => c.Image.startsWith('fcpindi/cpac'))
  return containers
}

export async function* execute(pipeline, data_config) {
  const name = `c-pac_${new Date().getTime()}`

  const container = await docker.createContainer({
    name,
    Image: 'fcpindi/c-pac',

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
      '/bids_dataset',
      '/outputs',
      'participant'
    ],
    HostConfig: {
      Binds: [
        '/tmp:/scratch',
        `/tmp/${name}_dumb:/bids_dataset`,
        `/tmp/${name}_outputs:/outputs`,
      ],
    },
  })

  await container.start()
}
