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


class VHMC extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    const config = configuration.getIn(['derivatives', 'vhmc'])

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            label="Symmetric Brain Template"
            name="derivatives.vhmc.symmetric_brain"
            value={config.getIn(['symmetric_brain'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Symmetric Brain + Skull Template"
            name="derivatives.vhmc.symmetric_skull"
            value={config.getIn(['symmetric_skull'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Dilated Symmetric Brain Mask"
            name="derivatives.vhmc.dilated_symmetric_brain"
            value={config.getIn(['dilated_symmetric_brain'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="FLIRT Configuration file"
            name="derivatives.vhmc.flirt_configuration_file"
            value={config.getIn(['flirt_configuration_file'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(VHMC.styles)(VHMC);
