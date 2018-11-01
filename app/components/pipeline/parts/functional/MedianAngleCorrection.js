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


class MedialAngleCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            label="Target angle"
            value={90}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
            InputProps={{
              endAdornment: <InputAdornment position="end">°</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(MedialAngleCorrection.styles)(MedialAngleCorrection);
