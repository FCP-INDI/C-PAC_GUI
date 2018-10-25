import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import {
  SkullStripping,
  Registration,
} from './anatomical'

class Anatomical extends Component {

  static styles = theme => ({
    divider: {
      margin: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    }
  });

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <div>
        <SkullStripping configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <Registration configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
      </div>
    )
  }
}

export default withStyles(Anatomical.styles)(Anatomical);
