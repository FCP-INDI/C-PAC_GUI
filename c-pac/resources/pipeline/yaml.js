import yaml from 'js-yaml'

import raw from './pipeline_config_template.yml'
export { raw }

let rawTemplate = ''
let emptyLines = ''
for (let l of raw.split('\n')) {
  const commentMatch = /^#.*/.exec(l)
  if (commentMatch) {
    rawTemplate += emptyLines + l + "\n"
    emptyLines = ''
    continue
  }

  const match = /^([a-zA-Z_]+)\s*:/.exec(l)
  if (match) {
    rawTemplate += emptyLines + "${config." + match[1] + "}" + "\n"
    emptyLines = ''
    continue
  }

  const emptyMatch = /^\s*$/g.exec(l)
  if (emptyMatch) {
    emptyLines += "\n"
    continue
  }

  // Reset empty lines when between values
  emptyLines = ''
}

function replacements(yaml, pipeline, environment) {
  return eval('`' + yaml.replace(/`/g,'\\`') +'`')
}

function replace(config) {
  return eval('`' + rawTemplate + '`')
}

export default (config) => {
  const configYamled = {}
  for (let k of Object.keys(config)) {
    let flowLevel = -1
    if (!!config[k] && config[k].constructor === Array) {
      if (config[k].length > 0) {
        if (config[k][0].constructor !== Object) {
          flowLevel = 1
        }
      }
    }

    configYamled[k] = yaml.safeDump(
      { [k]: config[k] },
      { flowLevel, lineWidth: 9999 }
    )
  }

  return replace(configYamled)

  // const environment = {
  //   paths: {
  //     fsl_dir: '$FSLDIR',
  //   }
  // }

  // return replacements(yaml, configYamled, environment)
}