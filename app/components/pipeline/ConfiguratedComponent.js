import React, { Component } from 'react';

import getter from 'lodash.get';
import setter from 'lodash.set';

export default class ConfiguratedComponent extends Component {
  // constructor(props) {
    // super(props)
  // }

  render() {
    const {
      configuration,
      component,
      name,
      ...otherProps
    } = this.props

    const value = getter(configuration, name)

    console.log(configuration, name)
    console.log(value)

    return React.createElement(component, {
      ...otherProps,
      name,
      value
    })
  }
}
