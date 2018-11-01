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


class NuisanceRegression extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <TextField
            label="Lateral Ventrical Mask"
            value="/usr/share/fsl/5.0/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz"
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="CompCor Components"
            value={5}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormGroup row>
            <FormControlLabel
              label="Use Frinston's 24 motion regressors"
              control={
                <Switch
                  name="anatomical.skull_stripping.methods.bet.enabled"
                  checked={true}
                  onChange={this.handleChange}
                  color="primary"
                />
              }
            />
          </FormGroup>

          <FormControl component="fieldset">
            <FormLabel component="legend">Motion Spike De-noising</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="No De-noising"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.bet.enabled"
                    checked={true}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="De-spiking"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.afni.enabled"
                    checked={false}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="Scrubbing"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.afni.enabled"
                    checked={false}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>

          <TextField
            select
            label="Framewise Displacement (FD) Calculation"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"jenkinson"}
            helperText=''
          >
            <MenuItem value={"jenkinson"}>Jenkinson</MenuItem>
            <MenuItem value={"power"}>Power</MenuItem>
          </TextField>

          <TextField
            label="Framewise Displacement (FD) Threshold"
            value={5}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
          />

          <TextField
            label="Preceding volumes to De-noise"
            value={1}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Subsequent volumes to De-noise"
            value={1}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NuisanceRegression.styles)(NuisanceRegression);
