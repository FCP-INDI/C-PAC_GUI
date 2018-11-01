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


class NetworkCentrality extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            label="Mask"
            value={""}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Degree Centrality Weight</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="Binarized"
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
                label="Weighted"
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
            label="Degree Centrality Threshold Type"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"significance"}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Degree Centrality Threshold"
            value={"0.001"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Eigenvector Weight</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="Binarized"
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
                label="Weighted"
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
            label="Eigenvector Threshold Type"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"significance"}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Eigenvector Threshold"
            value={"0.001"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormControl component="fieldset">
            <FormLabel component="legend">Local Functional Connectivity Density Weight</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="Binarized"
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
                label="Weighted"
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
            label="Local Functional Connectivity Density Threshold Type"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            value={"significance"}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Local Functional Connectivity Density Threshold"
            value={"0.001"}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NetworkCentrality.styles)(NetworkCentrality);
