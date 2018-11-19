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
            name="functional.distortion_correction.skull_stripping"
            value={configuration.getIn(["functional", "distortion_correction", "skull_stripping"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            helperText=''
          >
            <MenuItem value={"bet"}>BET</MenuItem>
            <MenuItem value={"afni"}>3dSkullStrip</MenuItem>
          </TextField>

          <TextField
            label="Threshold"
            name="functional.distortion_correction.threshold"
            value={configuration.getIn(["functional", "distortion_correction", "threshold"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Delta-TE"
            name="functional.distortion_correction.delta_te"
            value={configuration.getIn(["functional", "distortion_correction", "delta_te"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            }}
            helperText=''
          />

          <TextField
            label="Dwell Time"
            fullWidth={true} margin="normal" variant="outlined"
            name="functional.distortion_correction.dwell_time"
            value={configuration.getIn(["functional", "distortion_correction", "dwell_time"])}
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">s</InputAdornment>,
            }}
            helperText=''
          />

          <TextField
            label="Dwell to assymetric ratio"
            fullWidth={true} margin="normal" variant="outlined"
            name="functional.distortion_correction.dwell_to_assymetric_ratio"
            value={configuration.getIn(["functional", "distortion_correction", "dwell_to_assymetric_ratio"])}
            onChange={onChange}
            helperText=''
          />

          <TextField
            select
            label="Phase-encoding direction"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            name="functional.distortion_correction.phase_encoding_direction"
            value={configuration.getIn(["functional", "distortion_correction", "phase_encoding_direction"])}
            onChange={onChange}
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
