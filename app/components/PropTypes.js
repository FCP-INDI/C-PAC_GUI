import PropTypes from 'prop-types';
import Immutable from 'immutable';

/** Give consistent validation error information
 * @param {string} propName
 * @param {string} componentName
 * @returns {string}
 */
const ValidationError = (propName, componentName) => {
  return new Error(
    `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
  );
}

/** DRY in creating optional & required variants.
 * @param {bool} isRequired
 * @returns {function}
 */
const PropTypeFactory = (isRequired, propType) => {
  const OptionalCustomPropTypes = {
    entryList: (props, propName, componentName) => {
      const prop = props.propName;
      if (prop != null || !isRequired) {
        if (
          typeof(prop[0]) != 'string' ||
          !Immutable.List.isList(prop[1])
        ) { return ValidationError(propName, componentName); }
      }
      return null;
    },
    roiPaths: (props, propName, componentName) => {
      const prop = props.propName;
      if (prop != null || !isRequired) {
        if (
          !Immutable.Map.isMap(prop) ||
          Object.entries(roiPaths).flat().filter(
            element => typeof(element) !== 'string'
          ).length // if anything in this map is not a string, returns true
        ) { return ValidationError(propName, componentName); }
      }
    }
  }
  
  return OptionalCustomPropTypes[propType];
}

/** Specify custom PropType keys */
const customPropTypesKeys = [
  'entryList',
  'roiPaths'
]

/** Set all custom PropTypes via PropTypeFactory */
const CustomPropTypes = {};
customPropTypesKeys.map(k => {
  CustomPropTypes[k] = PropTypeFactory(false, k)
  CustomPropTypes[k].isRequired = PropTypeFactory(true, k)
})

export default CustomPropTypes;
