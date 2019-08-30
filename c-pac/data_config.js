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
  const series = []
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
    series.push(...Object.keys(func))
    unique_ids.push(unique_id)
    subject_ids.push(subject_id)
  }

  return {
    sets,
    sites: [...new Set(sites)],
    series: [...new Set(series)],
    unique_ids: [...new Set(unique_ids)],
    subject_ids: [...new Set(subject_ids)],
  }
}

export function dump(sets) {
  return yaml.safeDump(sets)
}
