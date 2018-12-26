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
            regex={/^slice_timing_pattern/}
            help={`Acquisition strategy for acquiring image slices. Slice acquisition information is read from scan parameters in the data configuration file. If this is not provided, then this option will apply.`}
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
            regex={/^TR/}
            help={`Specify the TR (in seconds) at which images were acquired. If empty, TR information is then read from scan parameters in the data configuration file, or the image file header if there is no scan information in the data configuration.`}
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
            regex={/^startIdx/}
            help={`First timepoint to include in analysis. Default is 0 (beginning of timeseries). First timepoint selection in the scan parameters in the data configuration file, if present, will override this selection.`}
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
            regex={/^stopIdx/}
            help={`Last timepoint to include in analysis. Default is empty (end of timeseries). Last timepoint selection in the scan parameters in the data configuration file, if present, will override this selection.`}
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
