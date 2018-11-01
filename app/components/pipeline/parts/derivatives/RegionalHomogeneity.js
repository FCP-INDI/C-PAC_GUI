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


class RegionalHomogeneity extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            select
            label="Voxel Cluster size"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={7}
            helperText=''
          >
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={27}>27</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(RegionalHomogeneity.styles)(RegionalHomogeneity);
