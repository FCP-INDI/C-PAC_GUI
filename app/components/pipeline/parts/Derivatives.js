import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import {
  ALFF,
  NetworkCentrality,
  RegionalHomogeneity,
  SeedBasedCorrelation,
  TimeSeriesExtraction,
  VHMC
} from './derivatives'

class Derivatives extends Component {
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
        <TimeSeriesExtraction configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <SeedBasedCorrelation configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <ALFF configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <NetworkCentrality configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <VHMC configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <RegionalHomogeneity configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
      </div>
    )
  }
}

export default withStyles(Derivatives.styles)(Derivatives);
