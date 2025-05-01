import React, { Component } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

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
