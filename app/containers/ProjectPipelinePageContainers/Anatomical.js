import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';


class Anatomical extends Component {

  static styles = theme => ({
    divider: {
      margin: '30px 0 0 0',
    }
  });

  render() {
    const { classes } = this.props

    return (
      <Grid container spacing={8}>
        <Grid item lg={6} xs={12}>
          <Typography variant="h6">
            Registration
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TextField label="Resolution" fullWidth={true}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                        helperText='The resolution to which anatomical images should be transformed during registration. This is the resolution at which processed anatomical files will be output.'
                        />
            </Grid>
          </Grid>
          <Typography variant="h6" color="textSecondary" className={classes.divider}>
            Templates
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TextField label="Brain" fullWidth={true}
                         helperText='Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.' />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Skull" fullWidth={true}
                         helperText='Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.'/>
            </Grid>
          </Grid>
          <Typography variant="h6"  color="textSecondary" className={classes.divider}>
            Method
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TextField
                select
                label=" "
                fullWidth
                value='fsl'
              >
                <MenuItem key='fsl' value='fsl'>
                  FSL FNIRT
                </MenuItem>
                <MenuItem key='afni' value='afni'>
                  AFNI 3dSkullStrip
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Config" fullWidth={true} helperText='Configuration file to be used by FSL to set FNIRT parameters. It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.' />
              <TextField label="Mask" fullWidth={true} helperText='Configuration file to be used by FSL to set FNIRT parameters. It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.' />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12} style={{ padding: 20 }}>
          <Typography paragraph>In order to compare brain activations between subjects, individual functional and anatomical images must first be transformed to match a common template. The most commonly used template (MNI152) is maintained by the Montreal Neurological Institute, and is created by combining data from the brains of many different individuals to create an “average” brain. The image below shows how an individual brain is warped to match the shape of the template.</Typography>
          <Typography paragraph>C-PAC provides the option of either using FSL (FLIRT and FNIRT) or Advanced Normalization Tools (ANTS) to register images. Although the use of ANTS requires an extra step during the C-PAC install process, we have found its results to be significantly better than those produced by FSL (a conclusion supported by a recent systematic analysis by Klein et al.).</Typography>
          <Typography paragraph>During registration, individual anatomical images are first transformed to match the common template. Then, the functional data for each subject is registered to their own transformed anatomical image. Finally, functional derivative files are transformed to the common template. For more detail on how C-PAC computes these steps, please see the Registration Page of the developer documentation.</Typography>
          <Typography paragraph>By default, C-PAC will register subject brains to the MNI152 template included with FSL. Users wishing to register their data to a different template (such as a group specific template) can specify alternative template files.</Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(Anatomical.styles)(Anatomical)
);
