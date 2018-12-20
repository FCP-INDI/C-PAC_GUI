import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Help from 'components/Help'


class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            fullWidth
          >
            <TextField label="Functional Resolution"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.functional_resolution"
              value={configuration.getIn(["functional", "template_registration", "functional_resolution"])}
              onChange={onChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
              }}
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            fullWidth
          >
            <TextField label="Derivative Resolution"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.derivative_resolution"
              value={configuration.getIn(["functional", "template_registration", "derivative_resolution"])}
              onChange={onChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
              }}
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            fullWidth
          >
            <TextField label="Standard Brain Template"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.brain_template"
              value={configuration.getIn(["functional", "template_registration", "brain_template"])}
              onChange={onChange}
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            fullWidth
          >
            <TextField label="Standard Brain + Skull Template"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.skull_template"
              value={configuration.getIn(["functional", "template_registration", "skull_template"])}
              onChange={onChange}
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^template_skull_for_anat/}
            help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            fullWidth
          >
            <TextField label="Standard Identity Matrix"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.identity_matrix"
              value={configuration.getIn(["functional", "template_registration", "identity_matrix"])}
              onChange={onChange}
            />
          </Help>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
