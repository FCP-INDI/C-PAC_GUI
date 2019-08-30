import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import Collapse from '@material-ui/core/Collapse';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'


class Registration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <Help
          type="pipeline"
          regex={/^resolution_for_anat/}
          help={`The resolution to which anatomical images should be transformed during registration. This is the resolution at which processed anatomical files will be output.`}
          fullWidth
        >
          <TextField label="Resolution"
            name="anatomical.registration.resolution"
            value={configuration.getIn("anatomical.registration.resolution".split("."))}
            onChange={onChange}
            fullWidth margin="normal" variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
          />
        </Help>

        <FormGroup>
          <FormLabel>
            <Help
              help={`Templates to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            />
            Templates
          </FormLabel>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^template_brain_only_for_anat/}
              help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
              fullWidth
            >
              <TextField label="Brain" fullWidth margin="normal" variant="outlined"
                        name="anatomical.registration.brain_template"
                        value={configuration.getIn("anatomical.registration.brain_template".split("."))}
                        onChange={onChange}
              />
            </Help>
          </FormGroup>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^template_skull_for_anat/}
              help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
              fullWidth
            >
              <TextField label="Skull" fullWidth margin="normal" variant="outlined"
                          name="anatomical.registration.skull_template"
                          value={configuration.getIn("anatomical.registration.skull_template".split("."))}
                          onChange={onChange} />
            </Help>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <FormLabel>
            <Help
              type="pipeline"
              regex={/^regOption/}
              help={`Use either ANTS or FSL (FLIRT and FNIRT) as your anatomical registration method.`}
            />
            Methods
          </FormLabel>

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabelled label="ANTS">
                  <Switch
                    name="anatomical.registration.methods.ants.enabled"
                    checked={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="FSL FLIRT/FNIRT">
                  <Switch
                    name="anatomical.registration.methods.fsl.enabled"
                    checked={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Specific options for fine tuning the ANTS registration.`}
                    />
                    ANTS options
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^regWithSkull/}
                      help={`Register skull-on anatomical image to template. Calculating the transform with skull-stripped images is reported to be better, but it requires very high-quality skull-stripping. If skull-stripping is imprecise, registration with skull is preferred. This option only affects ANTS due to the fact that FNIRT already uses skull-on images for calculating warps.`}
                    >
                      <FormControlLabelled label="ANTS Skull-on Transform">
                        <Switch
                          name="anatomical.registration.methods.ants.configuration.skull_on"
                          checked={configuration.getIn("anatomical.registration.methods.ants.configuration.skull_on".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^use_lesion_mask/}
                      help={`Use lesion mask for better registration, when available.`}
                    >
                      <FormControlLabelled label="Use lesion mask when available">
                        <Switch
                          name="anatomical.registration.methods.ants.configuration.lesion_mask"
                          checked={configuration.getIn("anatomical.registration.methods.ants.configuration.lesion_mask".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>

                  <Grid item xs={8}>
                    <Help
                        type="pipeline"
                        regex={/^anatRegANTSinterpolation/}
                        help={`We provide a choice of interpolation options (Linear, LanczosWindowedSinc, or BSpline), set LanczosWindowedSinc as the default.`}
                        fullWidth
                      >
                        <TextField
                          select
                          label="Interpolation Option for ANTS"
                          fullWidth margin="normal" variant="outlined"
                          className={classes.textField} onChange={onChange}
                          name="anatomical.registration.methods.ants.interpolation"
                          value={configuration.getIn("anatomical.registration.methods.ants.interpolation".split("."))}
                          helperText=''
                        >
                          <MenuItem value={"linear"}>Linear</MenuItem>
                          <MenuItem value={"sinc"}>LanczosWindowedSinc</MenuItem>
                          <MenuItem value={"spline"}>BSpline</MenuItem>
                        </TextField>
                      </Help>
                    </Grid>
                </FormGroup>
              </Collapse>
              <Collapse in={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Specific options for fine tuning the FLIRT/FNIRT registration.`}
                    />
                    FSL FLIRT/FNIRT options
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fnirtConfig/}
                      help={`Configuration file to be used by FSL to set FNIRT parameters. It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.`}
                      fullWidth
                    >
                      <TextField label="FNIRT Configuration" fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.fsl.configuration.config_file"
                                value={configuration.getIn("anatomical.registration.methods.fsl.configuration.config_file".split("."))}
                                onChange={onChange}
                      />
                    </Help>

                    <Help
                      type="pipeline"
                      regex={/^ref_mask/}
                      help={`A reference mask to be used by FNIRT.`}
                      fullWidth
                    >
                      <TextField label="FNIRT Reference Mask" fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.fsl.configuration.reference_mask"
                                value={configuration.getIn("anatomical.registration.methods.fsl.configuration.reference_mask".split("."))}
                                onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fsl_linear_reg_only/}
                      help={`Perform linear registration only.`}
                    >
                      <FormControlLabelled label="Perform linear registration only">
                        <Switch
                          name="anatomical.registration.methods.fsl.configuration.linear_only"
                          checked={configuration.getIn("anatomical.registration.methods.fsl.configuration.linear_only".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                    <Grid item xs={8}>
                      <FormGroup row>
                        <Help
                            type="pipeline"
                            regex={/^anatRegFSLinterpolation/}
                            help={`We provide a choice of interpolation options (Trilinear, Sinc, or Spline), set sinc as the default.`}
                            fullWidth
                          >
                            <TextField
                              select
                              label="Interpolation Option for FSL"
                              fullWidth margin="normal" variant="outlined"
                              className={classes.textField} onChange={onChange}
                              name="anatomical.registration.methods.fsl.interpolation"
                              value={configuration.getIn("anatomical.registration.methods.fsl.interpolation".split("."))}
                              helperText=''
                            >
                              <MenuItem value={"linear"}>Trilinear</MenuItem>
                              <MenuItem value={"sinc"}>Sinc</MenuItem>
                              <MenuItem value={"spline"}>Spline</MenuItem>
                            </TextField>
                          </Help>
                        </FormGroup>
                      </Grid>
                </FormGroup>
              </Collapse>
            </Grid>
          </Grid>
        </FormGroup>
      </React.Fragment>
    )
  }
}

export default withStyles(Registration.styles)(Registration);
