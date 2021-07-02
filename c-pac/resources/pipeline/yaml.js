import yaml from 'js-yaml';


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
  let yamlJS = yaml.load(yamlString, {json: true});
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
        if (Array.isArray(yamlObj)) {
          return yamlObj.map(item => updateBooleansToJSON(item));
        };
        return Object.assign({}, ...Object.entries(yamlObj).map(entry => {
          let returnObj = {};
          returnObj[entry[0]] = updateBooleansToJSON(entry[1])
          return returnObj;
        }));
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


export { loadYaml }
