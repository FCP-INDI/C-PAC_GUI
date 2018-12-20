import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Help from 'components/Help'


class SliceTimingCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <Help
            type="pipeline"
            regex={/^skullstrip_option/}
            help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            fullWidth
          >
            <TextField
              select
              label="Slice Acquisition Pattern"
              name="functional.slice_timing_correction.pattern"
              value={configuration.getIn(["functional", "slice_timing_correction", "pattern"])}
              onChange={onChange}
              fullWidth margin="normal" variant="outlined"
              className={classes.textField} helperText=''
            >
              <MenuItem value={"header"}>Use NIFTI header</MenuItem>
              <MenuItem value={"alt+z"}>alt+z</MenuItem>
              <MenuItem value={"alt+z2"}>alt+z2</MenuItem>
              <MenuItem value={"alt-z"}>alt-z</MenuItem>
              <MenuItem value={"alt-z2"}>alt-z2</MenuItem>
              <MenuItem value={"seq+z"}>seq+z</MenuItem>
              <MenuItem value={"seq-z"}>seq-z</MenuItem>
            </TextField>
          </Help>

          <Help
            type="pipeline"
            regex={/^skullstrip_option/}
            help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            fullWidth
          >
          <TextField
            label="Repetition Time (TR)"
            fullWidth margin="normal" variant="outlined"
            name="functional.slice_timing_correction.repetition_time"
            value={configuration.getIn(['functional', 'slice_timing_correction', 'repetition_time'])}
            onChange={onChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">sec</InputAdornment>,
            }}
          />
          </Help>

          <Help
            type="pipeline"
            regex={/^skullstrip_option/}
            help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            fullWidth
          >
            <TextField
              label="First Timepoint"
              name="functional.slice_timing_correction.first_timepoint"
              value={configuration.getIn(['functional', 'slice_timing_correction', 'first_timepoint'])}
              onChange={onChange}
              fullWidth margin="normal" variant="outlined"
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^skullstrip_option/}
            help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            fullWidth
          >
            <TextField
              label="Last Timepoint"
              name="functional.slice_timing_correction.last_timepoint"
              value={configuration.getIn(['functional', 'slice_timing_correction', 'last_timepoint'])}
              onChange={onChange}
              fullWidth margin="normal" variant="outlined"
            />
          </Help>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(SliceTimingCorrection.styles)(SliceTimingCorrection);
