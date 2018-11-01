import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

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
      <React.Fragment>
        <Typography variant="h6">
          Skull stripping
        </Typography>
        <SkullStripping configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <Typography variant="h6">
          Registration
        </Typography>
        <Registration configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
      </React.Fragment>
    )
  }
}

export default withStyles(Anatomical.styles)(Anatomical);
