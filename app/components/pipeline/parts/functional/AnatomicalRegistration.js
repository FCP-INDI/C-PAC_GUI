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


class AnatomicalRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <FormGroup row>
            <FormControlLabel
              label="Using BB Registration"
              control={
                <Switch
                  name="anatomical.skull_stripping.methods.afni.enabled"
                  checked={false}
                  onChange={this.handleChange}
                  color="primary"
                />
              }
            />
          </FormGroup>

          <TextField label="BB Registration Scheduler"
                      fullWidth={true} margin="normal" variant="outlined"
                      name="anatomical.registration.resolution"
                      value={'/usr/share/fsl/5.0/etc/flirtsch/bbr.sch'}
                      onChange={onValueChange}
                      helperText=''
                      />

          <TextField
            select
            label="Use as registration input"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"mean"}
            helperText=''
          >
            <MenuItem value={"mean"}>Mean Functional</MenuItem>
            <MenuItem value={"selected"}>Selected Functional Volume</MenuItem>
          </TextField>

          <TextField
            label="Functional Volume"
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Functional Masking</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="FSL BET"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.bet.enabled"
                    checked={true}
                    onChange={this.handleChange}
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
                    name="anatomical.skull_stripping.methods.afni.enabled"
                    checked={false}
                    onChange={this.handleChange}
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
