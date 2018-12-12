import React, { Component } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class FormControlLabelled extends Component {
  render() {
    return (
      <FormControlLabel
        label={ this.props.label }
        control={ this.props.children }
      />
    )
  }
}
