import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField label="Functional Resolution"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.template_registration.functional_resolution"
                      value={configuration.getIn(["functional", "template_registration", "functional_resolution"])}
                      onChange={onChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      helperText=''
                      />

          <TextField label="Derivative Resolution"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.template_registration.derivative_resolution"
                      value={configuration.getIn(["functional", "template_registration", "derivative_resolution"])}
                      onChange={onChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                      }}
                      helperText=''
                      />

          <TextField label="Standard Brain Template"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.template_registration.brain_template"
                      value={configuration.getIn(["functional", "template_registration", "brain_template"])}
                      onChange={onChange}
                      helperText=''
                      />

          <TextField label="Standard Brain + Skull Template"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.template_registration.skull_template"
                      value={configuration.getIn(["functional", "template_registration", "skull_template"])}
                      onChange={onChange}
                      helperText=''
                      />

          <TextField label="Standard Identity Matrix"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.template_registration.identity_matrix"
                      value={configuration.getIn(["functional", "template_registration", "identity_matrix"])}
                      onChange={onChange}
                      helperText=''
                      />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
