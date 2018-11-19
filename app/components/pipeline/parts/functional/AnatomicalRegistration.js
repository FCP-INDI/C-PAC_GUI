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


class AnatomicalRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <FormGroup row>
            <FormControlLabel
              label="Using BB Registration"
              control={
                <Switch
                  name="functional.anatomical_registration.bb_registration"
                  checked={configuration.getIn(["functional", "anatomical_registration", "bb_registration"])}
                  onChange={onChange}
                  color="primary"
                />
              }
            />
          </FormGroup>

          <TextField label="BB Registration Scheduler"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="functional.anatomical_registration.bb_registration_scheduler"
                      value={configuration.getIn(["functional", "anatomical_registration", "bb_registration_scheduler"])}
                      onChange={onChange}
                      helperText=''
                      />

          <TextField
            select
            label="Use as registration input"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField} onChange={onChange}
            name="functional.anatomical_registration.registration_input"
            value={configuration.getIn(["functional", "anatomical_registration", "registration_input"])}
            helperText=''
          >
            <MenuItem value={"mean"}>Mean Functional</MenuItem>
            <MenuItem value={"selected"}>Selected Functional Volume</MenuItem>
          </TextField>

          <Collapse in={configuration.getIn(["functional", "anatomical_registration", "registration_input"]) == 'selected'}>
            <TextField
              label="Functional Volume" onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              name="functional.anatomical_registration.functional_volume"
              value={configuration.getIn(["functional", "anatomical_registration", "functional_volume"])}
              helperText=''
            />
          </Collapse>

          <FormControl variant="outlined">
            <FormLabel>Functional Masking</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="FSL BET"
                control={
                  <Switch
                    name="functional.anatomical_registration.functional_masking.bet"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "bet"])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="AFNI 3dSkullStrip"
                control={
                  <Switch
                    name="functional.anatomical_registration.functional_masking.afni"
                    checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "afni"])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(AnatomicalRegistration.styles)(AnatomicalRegistration);
