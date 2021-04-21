import yaml from 'js-yaml';
import raw from './pipeline_config_template.yml';

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


/**
 * Loads YAML 1.1 into JSON, specifically handling
 *     [YAML 1.1 booleans]{@link https://yaml.org/type/bool.html}
 * @param {string} yamlString A YAML document as a string
 * @example
 * loadYaml("item: On")
 * //=> {"item": true}
 * @returns {(Object|Array)} Returns the YAML contents as JSON.
 */
const loadYaml = (yamlString) => {
  let yamlJS = yaml.load(yamlString);
  return updateBooleansToJSON(yamlJS);
};


/**
 * Helper function to convert
 *     [YAML 1.1 boolean strings]{@link https://yaml.org/type/bool.html}
 *     to boolean type
 * @param {(Object|Array|string|boolean|number|null)} yamlObj
 * @example
 * updateBooleansToJSON({item: "Off"})
 * //=> {"item": false}
 * @returns {(Object|Array|string|boolean|number|null)} Returns the given type
 *     unless the given type is a YAML 1.1 boolean string, in which case
 *     returns boolean.
 */
const updateBooleansToJSON = (yamlObj) => {
  if (yamlObj != null) {
    switch (typeof(yamlObj)) {
      case 'object':
        return Object.assign({}, ...Object.entries(yamlObj).map(entry => {
          let returnObj = {};
          returnObj[entry[0]] = updateBooleansToJSON(entry[1])
          return returnObj;
        }));
      case 'array':
        return yamlObj.map(item => updateBooleans(item));
      case 'string':
        switch (yamlObj) {
          case 'On':
          case 'on':
          case 'true':
          case 'True':
            return true;
          case 'Off':
          case 'off':
          case 'false':
          case 'False':
            return false;
          default:
            return yamlObj;
        };
    };
  }
  return yamlObj;
}


export { raw, loadYaml }
