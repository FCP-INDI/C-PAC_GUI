import React, { Component } from 'react';

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


class AnatomicalRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

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
              <FormGroup row>
                <FormControlLabelled label="FSL: BET">
                  <Switch
                    name="functional.anatomical_registration.functional_masking.fsl"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "fsl"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
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
                <FormControlLabelled label="Anatomical Refined: refine functional mask by registering anatomical mask to functional space">
                  <Switch
                    name="functional.anatomical_registration.functional_masking.anat_refined"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "anat_refined"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </FormControl>
          </FormGroup>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(AnatomicalRegistration.styles)(AnatomicalRegistration);
