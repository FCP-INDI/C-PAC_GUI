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

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            label="Symmetric Brain Template"
            value={"$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_symmetric.nii.gz"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Symmetric Brain + Skull Template"
            value={"$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_symmetric.nii.gz"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Dilated Symmetric Brain Mask"
            value={"$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_symmetric_dil.nii.gz"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="FLIRT Configuration file"
            value={"$FSLDIR/etc/flirtsch/T1_2_MNI152_2mm.cnf"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(VHMC.styles)(VHMC);
