import * as docker from './backends/docker'

export async function executions() {
  return docker.executions()
}

export async function execute(pipeline, data_config) {
  return docker.execute(pipeline, data_config)
}
