import yaml from 'js-yaml';
import yamlTemplate, { raw, loadYaml } from './resources/pipeline/yaml';

const defaultPipelineUrl = 'https://raw.githubusercontent.com/FCP-INDI/C-PAC/main/dev/docker_data/default_pipeline.yml';
const versionRe = new RegExp('(?<=\# Version:? \s*).*');

function setVersion(rawTemplate) {
  let version = versionRe.exec(rawTemplate);
  version = (version && version.length) ? version[0] : 'unspecified';
  return ({
    "id": `default-${version}`,
    "name": "Default",
    "versions": {
      0: {
        "version": version,
        "configuration": loadYaml(rawTemplate)
      }
    }
  });
}

async function getDefaultPipeline(url) {
  const defaultPipeline = await fetch(defaultPipelineUrl, { mode: "cors" })
  .then(response => {
    return response.text().then(defaultRaw => setVersion(defaultRaw))
  }, function(e) {
    console.error("Default pipeline failed to load! Falling back to local copy (may be out of date)");
  });
  return defaultPipeline;
}

/**
 * Takes a configuration object, pipeline name string, and version string and returns a YAML string
 * @param {object} configObj
 * @param {string} pipelineName
 * @param {string} version
 * @returns {string} YAML representation of configObj
 */
const dump = (configObj, pipelineName, version, cpacVersion) => (
  `%YAML 1.1
---
# CPAC Pipeline Configuration YAML file
# Version ${cpacVersion}
#
# http://fcp-indi.github.io for more info.
#
# Pipeline config "${pipelineName}", version GUI-${version}
# ${Date(Date.now())}
#
# Tip: This file can be edited manually with a text editor for quick modifications.

${yaml.dump(configObj)}`.replace(/\s*'':.*/gi, ''))

export { defaultPipelineUrl, dump, getDefaultPipeline, versionRe }

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function normalizeValues(config) {
  if (typeof config === 'object') {
    for (const key in config) {
      config[key] = normalizeValues(config[key])
    }
    return config
  } else {
    if (config === 'On') return true
    if (config === 'Off') return false
    if (config === 'None') return null
    return config
  }
}
