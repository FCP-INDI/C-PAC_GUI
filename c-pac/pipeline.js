import yaml from 'js-yaml';
import yamlTemplate, { raw, loadYaml } from './resources/pipeline/yaml';
import { default as rawTemplate } from './resources/pipeline/default_pipeline.yml';

const defaultPipelineUrl = 'https://raw.githubusercontent.com/FCP-INDI/C-PAC/master/dev/docker_data/default_pipeline.yml'
const versionRe = new RegExp('(?<=\# Version:? \s*).*');

let template;

function setVersion() {
  const version = versionRe.exec();
  template = {
    "id": "default",
    "name": "Default",
    "versions": {
      0: {
        "version": (version && version.length) ? version[0] : 'unspecified',
        "configuration": loadYaml(rawTemplate)
      }
    }
  }
  return template;
}

async function getDefaultPipeline(url) {
  const defaultPipeline = await fetch(defaultPipelineUrl, { mode: "cors" })
  .then(response => {
    return response.text().then(defaultRaw => setVersion(defaultRaw))
  }, function(e) {
    console.error("Default pipeline failed to load! Falling back to local copy (may be out of date)");
    return setVersion(rawTemplate);
  })
  return defaultPipeline;
}

export { defaultPipelineUrl, getDefaultPipeline, rawTemplate }

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
