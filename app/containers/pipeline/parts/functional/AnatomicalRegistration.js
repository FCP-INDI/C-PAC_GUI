import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Collapse from '@material-ui/core/Collapse';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'
import IconButton from '@material-ui/core/IconButton'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  SettingsIcon,
} from 'components/icons';

class AnatomicalRegistration extends Component {

  static styles = theme => ({
  });

  state = {
    fslOptions: false,
  }

  handleValueChange = (event) => {
    const name = event.target.name

    const checkBoxes = [
      "functional.anatomical_registration.functional_masking.fsl.enabled",
    ]

    if (!checkBoxes.includes(name)) {
      this.props.onChange([
        [name, event.target.value]
      ])

    } else {
      const changes = []
      const value = event.target.checked

      const methods = [
        "functional.anatomical_registration.functional_masking.fsl.enabled"
      ]

      if (methods.includes(name)) {
        changes.push([name, value])
      }

      this.props.onChange(changes)
    }
  };

  handleOpenFSL = () => {
    this.setState({ fslOptions: true })
  }

  handleCloseFSL = () => {
    this.setState({ fslOptions: false })
  }

  render() {
    const { classes, configuration, advanced, onChange } = this.props
    return (
      <Grid container>
        <Grid item sm={12}>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^runBBReg/}
              help={`Run Functional to Anatomical Registration with BB Register.`}
            >
              <FormControlLabelled label="Using BB Registration">
                <Switch
                  name="functional.anatomical_registration.bb_registration"
                  checked={configuration.getIn(["functional", "anatomical_registration", "bb_registration"])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <Collapse in={configuration.getIn(["functional", "anatomical_registration", "bb_registration"])}>
            <Help
              type="pipeline"
              regex={/^boundaryBasedRegistrationSchedule/}
              help={`Standard FSL 5.0 Scheduler used for Boundary Based Registration. It is not necessary to change this path unless you intend to use non-standard MNI registration.`}
              fullWidth
            >
              <TextField label="BB Registration Scheduler"
                          fullWidth margin="normal" variant="outlined"
                          name="functional.anatomical_registration.bb_registration_scheduler"
                          value={configuration.getIn(["functional", "anatomical_registration", "bb_registration_scheduler"])}
                          onChange={onChange}
                          helperText=''
                          />
            </Help>
          </Collapse>

          <Help
            type="pipeline"
            regex={/^func_reg_input/}
            help={`Choose whether to use the mean of the functional/EPI as the input to functional-to-anatomical registration or one of the volumes from the functional 4D timeseries that you choose.`}
            fullWidth
          >
            <TextField
              select
              label="Use as registration input"
              fullWidth margin="normal" variant="outlined"
              className={classes.textField} onChange={onChange}
              name="functional.anatomical_registration.registration_input"
              value={configuration.getIn(["functional", "anatomical_registration", "registration_input"])}
              helperText=''
            >
              <MenuItem value={"mean"}>Mean Functional</MenuItem>
              <MenuItem value={"selected"}>Selected Functional Volume</MenuItem>
            </TextField>
          </Help>

          <Collapse in={configuration.getIn(["functional", "anatomical_registration", "registration_input"]) == 'selected'}>
            <Help
              type="pipeline"
              regex={/^func_reg_input_volume/}
              help={`Input the index of which volume from the functional 4D timeseries input file you wish to use as the input for functional-to-anatomical registration.`}
              fullWidth
            >
              <TextField
                label="Functional Volume" onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                name="functional.anatomical_registration.functional_volume"
                value={configuration.getIn(["functional", "anatomical_registration", "functional_volume"])}
                helperText=''
                />
            </Help>
          </Collapse>

          <FormGroup>
            <FormLabel>
              <Help
                type="pipeline"
                regex={/^BBR_WM_source/}
                help={`Choose the tool to generate white matter segmentation for BB registration.`}
              />
              BB Registration White Matter Source
            </FormLabel>
            <FormControl>
              <FormGroup row>
                <FormControlLabelled label="FSL: FAST">
                  <Switch
                    name="functional.anatomical_registration.bb_registration_wm_source.fsl"
                    checked={configuration.getIn(["functional", "anatomical_registration", "bb_registration_wm_source", "fsl"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
                <FormControlLabelled label="FreeSurfer: recon-all">
                  <Switch
                    name="functional.anatomical_registration.bb_registration_wm_source.freesurfer"
                    checked={configuration.getIn(["functional", "anatomical_registration", "bb_registration_wm_source", "freesurfer"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <Help
                type="pipeline"
                regex={/^functionalMasking/}
                help={`Choose which tool to be used in functional masking.`}
              />
              Functional Masking
            </FormLabel>
            <FormControl>
            <FormGroup row>
                <FormControlLabelled label="AFNI: 3dAutoMask">
                  <Switch
                    name="functional.anatomical_registration.functional_masking.afni"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "afni"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>

              {/* functional masking - fsl option */}
              <Dialog
                open={this.state.fslOptions && configuration.getIn(["functional", "anatomical_registration", "functional_masking", "fsl", "enabled"])}
                onClose={this.handleCloseFSL}
                fullWidth={true}
              >
                <DialogTitle>{`FSL BET Options`}</DialogTitle>
                <DialogContent>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_frac/}
                      help={`Set the threshold value controling the brain vs non-brain voxels.`}
                      fullWidth
                    >
                      <TextField
                        label="Threshold" fullWidth margin="normal" variant="outlined"
                        name="functional.anatomical_registration.functional_masking.fsl.configuration.threshold"
                        value={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'threshold'])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_radius/}
                      help={`Head radius.`}
                      fullWidth
                    >
                      <TextField
                        label="Radius" fullWidth margin="normal" variant="outlined"
                        name="functional.anatomical_registration.functional_masking.fsl.configuration.radius"
                        value={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'radius'])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_vertical_gradient/}
                      help={`Vertical gradient in fractional intensity threshold, ranged between -1 and 1.`}
                      fullWidth
                    >
                      <TextField
                        label="Vertical Gradient" fullWidth margin="normal" variant="outlined"
                        name="functional.anatomical_registration.functional_masking.fsl.configuration.vertical_gradient"
                        value={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'vertical_gradient'])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_functional_mean_boolean/}
                      help={`Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces. It must be 'on' if select 'reduce_bias','robust','padding','remove_eyes',or 'surfaces' as 'on'.`}
                    >
                      <FormControlLabel
                        label="functional mean"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.functional_mean"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'functional_mean'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_threshold/}
                      help={`Apply thresholding to segmented brain image and mask.`}
                    >
                      <FormControlLabel
                        label="Apply threshold"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.apply_threshold"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'apply_threshold'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_mesh_boolean/}
                      help={`Mesh created along with skull stripping.`}
                    >
                      <FormControlLabel
                        label="Mesh"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.mesh"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'mesh'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_skull/}
                      help={`Create a skull image.`}
                    >
                      <FormControlLabel
                        label="Skull"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.skull"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'skull'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_surfaces/}
                      help={`Gets additional skull and scalp surfaces by running bet2 and betsurf.`}
                    >
                      <FormControlLabel
                        label="Surfaces"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.surfaces"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'surfaces'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_outline/}
                      help={`Create a surface outline image.`}
                    >
                      <FormControlLabel
                        label="Surfaces outline"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.surface_outline"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'surface_outline'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_padding/}
                      help={`Add padding to the end of the image, improving BET.`}
                    >
                      <FormControlLabel
                        label="Padding"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.padding"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'padding'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_reduce_bias/}
                      help={`Reduce bias and cleanup neck.`}
                    >
                      <FormControlLabel
                        label="Reduce bias"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.reduce_bias"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'reduce_bias'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_remove_eyes/}
                      help={`Eyes and optic nerve cleanup.`}
                    >
                      <FormControlLabel
                        label="Remove eyes"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.remove_eyes"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'remove_eyes'])}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^bold_bet_robust/}
                      help={`Robust brain center estimation.`}
                    >
                      <FormControlLabel
                        label="Robust brain center"
                        control={
                          <Switch
                            name="functional.anatomical_registration.functional_masking.fsl.configuration.robust_brain_center"
                            checked={configuration.getIn(['functional', 'anatomical_registration', 'functional_masking', 'fsl', 'configuration', 'robust_brain_center'])}
                            onChange={this.handleValueChange}
                            color="primary"
                          />
                        }
                      />
                    </Help>
                  </FormGroup>
                </DialogContent>
              </Dialog>

              <FormGroup row>
                <FormControlLabel
                  label="FSL BET"
                  control={
                    <Switch
                      name="functional.anatomical_registration.functional_masking.fsl.enabled"
                      checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "fsl", "enabled"])}
                      onChange={this.handleValueChange}
                      color="primary"
                    />
                  }
                />
                  {configuration.getIn(["functional", "anatomical_registration", "functional_masking", "fsl", 'enabled']) ?
                  <IconButton
                    onClick={() => this.handleOpenFSL()}>
                    <SettingsIcon />
                  </IconButton>
                  : null}
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="FSL+AFNI: BET+3dAutoMask">
                  <Switch
                    name="functional.anatomical_registration.functional_masking.fsl_afni"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "fsl_afni"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <Help
                  help={`Refine functional mask by registering anatomical mask to functional space`}
                >
                  <FormControlLabelled label="Anatomical Refined Functional Mask">
                    <Switch
                      name="functional.anatomical_registration.functional_masking.anat_refined"
                      checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "anat_refined"])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </Help>
              </FormGroup>
            </FormControl>
          </FormGroup>

        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(AnatomicalRegistration.styles)(AnatomicalRegistration));

// export default withStyles(AnatomicalRegistration.styles)(AnatomicalRegistration);
