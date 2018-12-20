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

    // tissue_segmentation.priors.gray_matter
    // tissue_segmentation.priors.cerebrospinal_fluid

    return (
      <Grid container>
        <Grid item lg={8} xs={12}>

          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
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
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
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
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
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
        </Grid>
        <Grid item lg={4} style={{ padding: 16 }}>
          <Typography paragraph>Skull-stripping is the removal of skull and other non-brain tissue like dura and eyes from anatomical images, which could otherwise complicate co-registration and normalization steps.</Typography>
          <Typography paragraph>C-PAC provides options for configuring skull-stripping - users can select:</Typography>
          <Typography component="ul">
            <li>AFNI’s 3dSkullStrip</li>
            <li>FSL’s BET, and can configure further parameters for each of these tools.</li>
            <li>Providing their own brain mask for extraction</li>
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TissueSegmentation.styles)(TissueSegmentation);
