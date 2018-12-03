import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import Collapse from '@material-ui/core/Collapse';

import getter from 'lodash.get';
import setter from 'lodash.set';


class Registration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item lg={8} xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <TextField label="Resolution"
                         name="anatomical.registration.resolution"
                         value={configuration.getIn("anatomical.registration.resolution".split("."))}
                         onChange={onChange}
                         fullWidth={true} margin="normal" variant="outlined"
                         InputProps={{
                           endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                         }}
                         helperText='The resolution to which anatomical images should be transformed during registration. This is the resolution at which processed anatomical files will be output.'
                         />
            </Grid>
          </Grid>

          <Typography variant="h6" color="textSecondary">
            Templates
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <TextField label="Brain" fullWidth={true} margin="normal" variant="outlined"
                         name="anatomical.registration.brain_template"
                         value={configuration.getIn("anatomical.registration.brain_template".split("."))}
                         onChange={onChange}
                         helperText='Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.' />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Skull" fullWidth={true} margin="normal" variant="outlined"
                         name="anatomical.registration.skull_template"
                         value={configuration.getIn("anatomical.registration.skull_template".split("."))}
                         onChange={onChange}
                         helperText='Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.'/>
            </Grid>
          </Grid>

          <Typography variant="h6" color="textSecondary">
            Methods
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <FormGroup row>
                <FormControlLabel
                  label="ANTS"
                  control={
                    <Switch
                      name="anatomical.registration.methods.ants.enabled"
                      checked={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </FormGroup>
              <FormGroup row>
                <FormControlLabel
                  label="FSL FNIRT"
                  control={
                    <Switch
                      name="anatomical.registration.methods.fsl.enabled"
                      checked={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </FormGroup>
            </Grid>

            <Grid item xs={6}>
              <Collapse in={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}>
                <TextField label="FNIRT Configuration" fullWidth={true} margin="normal" variant="outlined"
                           name="anatomical.registration.methods.fsl.configuration.config_file"
                           value={configuration.getIn("anatomical.registration.methods.fsl.configuration.config_file".split("."))}
                           onChange={onChange}
                           helperText='Configuration file to be used by FSL to set FNIRT parameters. It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.' />
                <TextField label="FNIRT Reference Mask" fullWidth={true} margin="normal" variant="outlined"
                           name="anatomical.registration.methods.fsl.configuration.reference_mask"
                           value={configuration.getIn("anatomical.registration.methods.fsl.configuration.reference_mask".split("."))}
                           onChange={onChange}
                           helperText='A reference mask to be used by FNIRT' />
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>
                <FormControl>
                  <FormControlLabel
                    label="ANTS Skull-on Transform"
                    control={
                      <Switch
                        name="anatomical.registration.methods.ants.configuration.skull_on"
                        checked={configuration.getIn("anatomical.registration.methods.ants.configuration.skull_on".split("."))}
                        onChange={onChange}
                      />
                    }
                  />
                  <FormHelperText>Register skull-on anatomical image to template. Calculating the transform with skull-stripped images is reported to be better, but it requires very high-quality skull-stripping. If skull-stripping is imprecise, registration with skull is preferred. This option only affects ANTS due to the fact that FNIRT already uses skull-on images for calculating warps.</FormHelperText>
                </FormControl>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} xs={12} style={{ padding: 20 }}>
          <Typography paragraph>In order to compare brain activations between subjects, individual functional and anatomical images must first be transformed to match a common template. The most commonly used template (MNI152) is maintained by the Montreal Neurological Institute, and is created by combining data from the brains of many different individuals to create an “average” brain. The image below shows how an individual brain is warped to match the shape of the template.</Typography>
          <Typography paragraph>C-PAC provides the option of either using FSL (FLIRT and FNIRT) or Advanced Normalization Tools (ANTS) to register images. Although the use of ANTS requires an extra step during the C-PAC install process, we have found its results to be significantly better than those produced by FSL (a conclusion supported by a recent systematic analysis by Klein et al.).</Typography>
          <Typography paragraph>During registration, individual anatomical images are first transformed to match the common template. Then, the functional data for each subject is registered to their own transformed anatomical image. Finally, functional derivative files are transformed to the common template. For more detail on how C-PAC computes these steps, please see the Registration Page of the developer documentation.</Typography>
          <Typography paragraph>By default, C-PAC will register subject brains to the MNI152 template included with FSL. Users wishing to register their data to a different template (such as a group specific template) can specify alternative template files.</Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(Registration.styles)(Registration);
