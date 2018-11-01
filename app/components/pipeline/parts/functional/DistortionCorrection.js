import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


class DistortionCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <TextField
            select
            label="Skull-strip the magnitude file with"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"bet"}
            helperText=''
          >
            <MenuItem value={"bet"}>BET</MenuItem>
            <MenuItem value={"afni"}>3dSkullStrip</MenuItem>
          </TextField>

          <TextField
            label="BET Threshold"
            value={0.5}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="AFNI Threshold"
            value={0.6}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Delta-TE"
            value={2.46}
            fullWidth={true} margin="normal" variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            }}
            helperText=''
          />

          <TextField
            label="Dwell Time"
            fullWidth={true} margin="normal" variant="outlined"
            value={0.0005}
            InputProps={{
              endAdornment: <InputAdornment position="end">s</InputAdornment>,
            }}
            helperText=''
          />

          <TextField
            label="Dwell to assymetric ratio"
            fullWidth={true} margin="normal" variant="outlined"
            value={0.93902439}
            helperText=''
          />

          <TextField
            select
            label="Phase-encoding direction"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"x"}
            helperText=''
          >
            <MenuItem value={"x"}>x</MenuItem>
            <MenuItem value={"y"}>y</MenuItem>
            <MenuItem value={"z"}>z</MenuItem>
            <MenuItem value={"-x"}>-x</MenuItem>
            <MenuItem value={"-y"}>-y</MenuItem>
            <MenuItem value={"-z"}>-z</MenuItem>
          </TextField>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(DistortionCorrection.styles)(DistortionCorrection);
