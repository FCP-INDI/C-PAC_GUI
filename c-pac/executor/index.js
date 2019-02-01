import * as docker from './backends/docker'

export async function executions() {
  return docker.executions()
}

export async function execute(pipeline, data_config) {
  console.log(`Executing...`)
  return docker.execute(pipeline, data_config)
}

export async function logs(id) {
  if (id.indexOf('docker:') === 0) {
    return docker.logs(id)
  }
}
