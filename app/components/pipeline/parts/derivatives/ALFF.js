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


class ALFF extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <TextField
            label="f/ALFF Low-pass cutoff"
            value={0.1}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
            InputProps={{
              endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
            }}
          />

          <TextField
            label="f/ALFF High-pass cutoff"
            value={0.01}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
            InputProps={{
              endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
            }}
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(ALFF.styles)(ALFF);
