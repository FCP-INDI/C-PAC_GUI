import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'


class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>

            <Help
              type="pipeline"
              regex={/^funcRegANTSinterpolation/}
              help={`We provide a choice of interpolation options (Linear, LanczosWindowedSinc, or BSpline), set LanczosWindowedSinc as the default.`}
              fullWidth
            >

              <TextField
                select
                label="Interpolation Option for ANTS"
                fullWidth margin="normal" variant="outlined"
                className={classes.textField} onChange={onChange}
                name="functional.template_registration.methods.ants.interpolation"
                value={configuration.getIn(["functional", "template_registration", "methods", "ants","interpolation"])}
                helperText=''
              >
                <MenuItem value={"linear"}>Linear</MenuItem>
                <MenuItem value={"sinc"}>LanczosWindowedSinc</MenuItem>
                <MenuItem value={"spline"}>BSPline</MenuItem>

              </TextField>
            </Help>

          </Collapse>

          <Collapse in={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}>

            <Help
              type="pipeline"
              regex={/^funcRegFSLinterpolation/}
              help={`We provide a choice of interpolation options (Linear, Sinc, or Spline), set sinc as the default.`}
              fullWidth
            >

              <TextField
                select
                label="Interpolation Option for FSL"
                fullWidth margin="normal" variant="outlined"
                className={classes.textField} onChange={onChange}
                name="functional.template_registration.methods.fsl.interpolation"
                value={configuration.getIn(["functional", "template_registration", "methods", "fsl", "interpolation"])}
                helperText=''
              >
                <MenuItem value={"linear"}>Linear</MenuItem>
                <MenuItem value={"sinc"}>Sinc</MenuItem>
                <MenuItem value={"spline"}>Spline</MenuItem>

              </TextField>
            </Help>

          </Collapse>

          <Help
            type="pipeline"
            regex={/^resolution_for_func_preproc/}
            help={`The resolution (in mm) to which the preprocessed, registered functional timeseries outputs are written into. Note that selecting a 1 mm or 2 mm resolution might substantially increase your RAM needs- these resolutions should be selected with caution. For most cases, 3 mm or 4 mm resolutions are suggested.`}
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
            regex={/^resolution_for_func_derivative/}
            help={`The resolution (in mm) to which the registered derivative outputs are written into.`}
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
            regex={/^template_brain_only_for_func/}
            help={`Standard FSL Skull Stripped Template. Used as a reference image for functional registration.`}
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
            regex={/^template_skull_for_func/}
            help={`Standard FSL Anatomical Brain Image with Skull.`}
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
            regex={/^identityMatrix/}
            help={`Matrix containing all 1's. Used as an identity matrix during registration. It is not necessary to change this path unless you intend to use non-standard MNI registration.`}
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
