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

import Help from 'components/Help'


class DistortionCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^fmap_distcorr_skullstrip/}
            help={`Since the quality of the distortion heavily relies on the skull-stripping step, we provide a choice of method (AFNI 3dSkullStrip or FSL BET).`}
            fullWidth
          >
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
          </Help>

          <Help
            type="pipeline"
            regex={/^fmap_distcorr_frac/}
            help={`Set the threshold value for the skull-stripping of the magnitude file. Depending on the data, a tighter extraction may be necessary in order to prevent noisy voxels from interfering with preparing the field map.`}
            fullWidth
          >
            <TextField
              label="Threshold"
              name="functional.distortion_correction.threshold"
              value={configuration.getIn(["functional", "distortion_correction", "threshold"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^fmap_distcorr_deltaTE/}
            help={`Set the Delta-TE value, used for preparing field map, time delay between the first and second echo images.`}
            fullWidth
          >
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
          </Help>

          <Help
            type="pipeline"
            regex={/^fmap_distcorr_dwell_time/}
            help={`Set the Dwell Time for the FSL Fugue input.`}
            fullWidth
          >
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
          </Help>

          <Help
            type="pipeline"
            regex={/^fmap_distcorr_dwell_asym_ratio/}
            help={`Set the asymmetric ratio value for FSL Fugue input.`}
            fullWidth
          >
            <TextField
              label="Dwell to assymetric ratio"
              fullWidth={true} margin="normal" variant="outlined"
              name="functional.distortion_correction.dwell_to_assymetric_ratio"
              value={configuration.getIn(["functional", "distortion_correction", "dwell_to_assymetric_ratio"])}
              onChange={onChange}
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^fmap_distcorr_pedir/}
            help={`Set the phase-encoding direction.`}
            fullWidth
          >
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
          </Help>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(DistortionCorrection.styles)(DistortionCorrection);
