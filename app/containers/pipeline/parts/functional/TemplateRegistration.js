import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabelled from 'components/FormControlLabelled'
import Switch from '@material-ui/core/Switch';

class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props
    const functional_resolution = configuration.getIn(["functional", "template_registration", "functional_resolution"])
    const derivative_resolution = configuration.getIn(["functional", "template_registration", "derivative_resolution"])
    
    return (
      <Grid container>
        <Grid item sm={12}>

          {/* <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>

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

          </Collapse> */}

          <Help
            type="pipeline"
            regex={/^resolution_for_func_preproc/}
            help={`The resolution (in mm) to which the preprocessed, registered functional timeseries outputs are written into. 
            Optional input types: 1 one integer or float number indicating 3 same dimensions, e.g. 3 or 2.5; 2 three different integers or float numbers connected by 'x', e.g. 3x2.67x2.67. 
            Note that selecting a 1 mm or 2 mm resolution might substantially increase your RAM needs- these resolutions should be selected with caution. For most cases, 3 mm or 4 mm resolutions are suggested.`}
            fullWidth
          >
            <InputLabel>Functional Resolution</InputLabel>
            {
            
              functional_resolution.size !== undefined ?

              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.0"
                    value={functional_resolution.get(0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.1"
                    value={functional_resolution.get(1)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.2"
                    value={functional_resolution.get(2)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

              :
              
              <TextField label="Resolution"
                name="functional.template_registration.functional_resolution"
                value={functional_resolution}
                onChange={function(event) {
                  if (event.target.value.includes("x")) {
                    let values = event.target.value.replace(/[^0-9\.x]/, '').split("x").filter(Boolean).map(parseFloat)
                    values = [...values, ...values, ...values].slice(0, 3)
                    onChange(
                      [[['functional', 'template_registration', 'functional_resolution'], values]]
                    )
                  } else {
                    onChange(event)
                  }
                }}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
              />
            }
          </Help>

          <Help
            type="pipeline"
            regex={/^resolution_for_func_derivative/}
            help={`The resolution (in mm) to which the registered derivative outputs are written into.`}
            fullWidth
          >
            <InputLabel>Derivative Resolution</InputLabel>
            {
            
              derivative_resolution.size !== undefined ?

              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.0"
                    value={derivative_resolution.get(0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.1"
                    value={derivative_resolution.get(1)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.2"
                    value={derivative_resolution.get(2)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

              :
              
              <TextField label="Resolution"
                name="functional.template_registration.derivative_resolution"
                value={derivative_resolution}
                onChange={function(event) {
                  if (event.target.value.includes("x")) {
                    let values = event.target.value.replace(/[^0-9\.x]/, '').split("x").filter(Boolean).map(parseFloat)
                    values = [...values, ...values, ...values].slice(0, 3)
                    onChange(
                      [[['functional', 'template_registration', 'derivative_resolution'], values]]
                    )
                  } else {
                    onChange(event)
                  }
                }}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
              />
            }
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

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabelled label="T1 Template Registration">
                  <Switch
                    name="functional.template_registration.t1_template.enabled"
                    checked={configuration.getIn("functional.template_registration.t1_template.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="EPI Template Registration">
                  <Switch
                    name="functional.template_registration.epi_template.enabled"
                    checked={configuration.getIn("functional.template_registration.epi_template.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("functional.template_registration.t1_template.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    T1 - Brain/Skull Templates
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_brain_only_for_func/}
                      help={`Standard FSL Skull Stripped Template. Used as a reference image for functional registration.`}
                      fullWidth
                    >
                      <TextField label="Standard Brain Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.t1_template.brain_template"
                        value={configuration.getIn(["functional", "template_registration", "t1_template", "brain_template"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_skull_for_func/}
                      help={`Standard FSL Anatomical Brain Image with Skull.`}
                      fullWidth
                    >
                      <TextField label="Standard Brain + Skull Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.t1_template.skull_template"
                        value={configuration.getIn(["functional", "template_registration", "t1_template", "skull_template"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                </FormGroup>
              </Collapse>
              <Collapse in={configuration.getIn("functional.template_registration.epi_template.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    EPI - Brain/Skull Template
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_epi/}
                      help={`EPI template. Used as a reference image for functional registration.`}
                      fullWidth
                    >
                      <TextField label="EPI Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.epi_template.template_epi"
                        value={configuration.getIn(["functional", "template_registration", "epi_template", "template_epi"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                </FormGroup>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
