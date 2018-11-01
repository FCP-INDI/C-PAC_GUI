import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField label="Functional Resolution"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={configuration.anatomical.registration.resolution}
                      onChange={onValueChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      helperText=''
                      />

          <TextField label="Derivative Resolution"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={configuration.anatomical.registration.resolution}
                      onChange={onValueChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      helperText=''
                      />

          <TextField label="Standard Brain Template"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={'/usr/share/fsl/5.0/data/standard/MNI152_T1_${resolution_for_func_preproc}_brain.nii.gz'}
                      onChange={onValueChange}
                      helperText=''
                      />

          <TextField label="Standard Brain + Skull Template"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={'/usr/share/fsl/5.0/data/standard/MNI152_T1_${resolution_for_func_preproc}.nii.gz'}
                      onChange={onValueChange}
                      helperText=''
                      />

          <TextField label="Standard Identity Matrix"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={'/usr/share/fsl/5.0/etc/flirtsch/ident.mat'}
                      onChange={onValueChange}
                      helperText=''
                      />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
