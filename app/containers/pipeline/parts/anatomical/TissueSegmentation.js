import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import Help from 'components/Help'


class TissueSegmentation extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <Help
          type="pipeline"
          regex={/^PRIORS_WHITE/}
          help={`Full path to a binarized White Matter prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
          fullWidth
        >
          <TextField
            label="White Matter Prior Probability Map"
            name="anatomical.tissue_segmentation.priors.white_matter"
            value={configuration.getIn("anatomical.tissue_segmentation.priors.white_matter".split("."))}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
          />
        </Help>

        <Help
          type="pipeline"
          regex={/^PRIORS_GRAY/}
          help={`Full path to a binarized Gray Matter prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
          fullWidth
        >
          <TextField
            label="Gray Matter Prior Probability Map"
            name="anatomical.tissue_segmentation.priors.gray_matter"
            value={configuration.getIn("anatomical.tissue_segmentation.priors.gray_matter".split("."))}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
          />
        </Help>

        <Help
          type="pipeline"
          regex={/^PRIORS_CSF/}
          help={`Full path to a binarized CSF prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
          fullWidth
        >
          <TextField
            label="Cerebrospinal Fluid Prior Probability Map"
            name="anatomical.tissue_segmentation.priors.cerebrospinal_fluid"
            value={configuration.getIn("anatomical.tissue_segmentation.priors.cerebrospinal_fluid".split("."))}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
          />
        </Help>
      </React.Fragment>
    )
  }
}

export default withStyles(TissueSegmentation.styles)(TissueSegmentation);
