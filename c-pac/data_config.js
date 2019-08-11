import yaml from 'js-yaml'
import semver from 'semver'
import deepmerge from 'deepmerge'

import { slugify, clone } from './utils'

export function parse(content) {
  const subjectSets = yaml.safeLoad(content)

  const hasUniqueId = subjectSets.every((t) => !!t.unique_id)
  const hasSiteId = subjectSets.every((t) => !!t.site)

  if (!subjectSets.every((t) => !!t.subject_id)) {
    throw Error('Some subjects do not have subject_id.')
  }

  if (
    subjectSets.some((t) => !!t.unique_id) &&
    !hasUniqueId
  ) {
    throw Error('Some subjects do not have unique_id.')
  }

  if (
    subjectSets.some((t) => !!t.site) &&
    !hasSiteId
  ) {
    throw Error('Some subjects do not have site.')
  }

  const sites = []
  const subject_ids = []
  const unique_ids = []
  const sets = {}
  for(let set of subjectSets) {
    const { anat, func, site, subject_id, unique_id=null } = set
    if (!(subject_id in sets)) {
      sets[subject_id] = {}
    }
    sets[subject_id][unique_id] = { 
      anatomical: anat, functionals: func, site 
    }
    sites.push(site)
    unique_ids.push(unique_id)
    subject_ids.push(subject_id)
  }

  return {
    sets,
    sites: [...new Set(sites)],
    unique_ids: [...new Set(unique_ids)],
    subject_ids: [...new Set(subject_ids)],
  }
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
