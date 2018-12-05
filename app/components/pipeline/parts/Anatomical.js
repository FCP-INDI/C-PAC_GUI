import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import {
  SkullStripping,
  Registration,
  TissueSegmentation,
} from './anatomical'

class Anatomical extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <Typography variant="h6">
          Skull stripping
        </Typography>
        <SkullStripping configuration={configuration} onChange={onChange} />
        <Typography variant="h6">
          Registration
        </Typography>
        <Registration configuration={configuration} onChange={onChange} />
        <Typography variant="h6">
          Tissue Segmentation
        </Typography>
        <TissueSegmentation configuration={configuration} onChange={onChange} />
      </React.Fragment>
    )
  }
}

export default withStyles(Anatomical.styles)(Anatomical);
