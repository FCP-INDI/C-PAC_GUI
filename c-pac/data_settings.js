import yaml from 'js-yaml'

import template from './resources/data_settings/config'
export { template }

export function parse(content) {
  const settings = yaml.safeLoad(content)

  const t = JSON.parse(JSON.stringify(template))
  const newver = `${new Date().getTime()}`
  t.versions[newver] = t.versions['default']
  delete t.versions['default']
  const c = t.versions[newver].configuration

  t.name = (settings.subjectListName || '').trim()

  if (typeof settings.dataFormat === 'string') {
    settings.dataFormat = [settings.dataFormat]
  }

  if (!settings.dataFormat.includes('BIDS')) {
    throw new Error('Only BIDS format is supported.')
  }

  c.format = 'BIDS'
  c.base = (settings.bidsBaseDir || '').replace(/\/$/, '')

  return t
}

export function dump(data_settings, version='0') {

  const c = data_settings.versions[version].configuration

  const config = {}

  config.dataFormat = ['BIDS']
  config.bidsBaseDir = c.base.replace(/\/$/, '')
  config.outputSubjectListLocation = ''
  config.subjectListName = data_settings.name

  // Generate valid YAML syntax
  const configYamled = {}
  for (let k of Object.keys(config)) {
    configYamled[k] = yaml.safeDump({ [k]: config[k] })
  }

  return yamlTemplate(configYamled)
}
