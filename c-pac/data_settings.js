import yaml from 'js-yaml'
import semver from 'semver'
import deepmerge from 'deepmerge'

import { slugify, clone } from './utils'

import { default as defaultTemplate } from './resources/data_settings/config'
import yamlTemplate, { raw } from './resources/data_settings/yaml'

const template = parse(raw)
template.subjectListName = 'Default'
template.outputSubjectListLocation = '.'

export { yamlTemplate, template, raw as rawTemplate }

export function parse(content) {
  const settings = yaml.safeLoad(content)

  const t = clone(defaultTemplate)
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

  c.format = 'bids'
  c.options.base = (settings.bidsBaseDir || '').replace(/\/$/, '')

  return t
}

export function dump(data_settings, version='0') {

  const c = data_settings.versions[version].configuration

  const config = {}

  config.dataFormat = c.format

  config.bidsBaseDir = c.options.base

  config.anatomicalTemplate = c.options.patterns.anatomical_path_template
  config.functionalTemplate = c.options.patterns.functional_path_template
  config.scanParametersCSV = c.options.patterns.scan_parameters_path
  config.brain_mask_template = c.options.patterns.brain_mask_path
  config.fieldMapPhase = c.options.patterns.fieldmap_phase_path_template
  config.fieldMapMagnitude = c.options.patterns.fieldmap_magnitude_path_template
  config.anatomical_scan = c.options.patterns.anatomical_scan

  config.awsCredentialsFile = c.options.aws_credential_path
  config.subjectList = null
  config.exclusionSubjectList = null
  config.siteList = null
  config.exclusionSiteList = null
  config.sessionList = null
  config.exclusionSessionList = null
  config.scanList = null
  config.exclusionScanList = null

  config.outputSubjectListLocation = '.'
  config.subjectListName = data_settings.name

  return yamlTemplate(config)
}
