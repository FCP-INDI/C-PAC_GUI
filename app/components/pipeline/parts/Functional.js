import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import {
  AnatomicalRegistration,
  DistortionCorrection,
  MedianAngleCorrection,
  NuisanceRegression,
  TemplateRegistration,
  SliceTimingCorrection,
  Smoothing,
  TemporalFiltering
} from './functional'

class Functional extends Component {
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
        <SliceTimingCorrection configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <AnatomicalRegistration configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <TemplateRegistration configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <DistortionCorrection configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <NuisanceRegression configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <MedianAngleCorrection configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <TemporalFiltering configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
        <Divider className={classes.divider} />
        <Smoothing configuration={configuration} onChange={onChange} onValueChange={onValueChange} />
      </div>
    )
  }
}

export default withStyles(Functional.styles)(Functional);
