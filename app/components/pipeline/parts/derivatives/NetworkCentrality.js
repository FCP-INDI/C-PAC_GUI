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

    const config = configuration.getIn(['derivatives', 'network_centrality'])

    return (
      <Grid container>
        <Grid item sm={12}>
          <TextField
            label="Mask"
            name="derivatives.network_centrality.mask"
            value={config.getIn(['mask'])}
            onChange={onChange}
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
                    name="derivatives.network_centrality.degree_centrality.binarized"
                    checked={config.getIn(['degree_centrality', 'binarized'])}
                    onChange={onChange}
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
                    name="derivatives.network_centrality.degree_centrality.weighted"
                    checked={config.getIn(['degree_centrality', 'weighted'])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>

          <TextField
            select
            label="Degree Centrality Threshold Type"
            name="derivatives.network_centrality.degree_centrality.threshold_type"
            value={config.getIn(['degree_centrality', 'threshold_type'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Degree Centrality Threshold"
            name="derivatives.network_centrality.degree_centrality.threshold"
            value={config.getIn(['degree_centrality', 'threshold'])}
            onChange={onChange}
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
                    name="derivatives.network_centrality.eigenvector.binarized"
                    checked={config.getIn(['eigenvector', 'binarized'])}
                    onChange={onChange}
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
                    name="derivatives.network_centrality.eigenvector.weighted"
                    checked={config.getIn(['eigenvector', 'weighted'])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>

          <TextField
            select
            label="Eigenvector Threshold Type"
            name="derivatives.network_centrality.eigenvector.threshold_type"
            value={config.getIn(['eigenvector', 'threshold_type'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Eigenvector Threshold"
            name="derivatives.network_centrality.eigenvector.threshold"
            value={config.getIn(['eigenvector', 'threshold'])}
            onChange={onChange}
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
                    name="derivatives.network_centrality.local_connectivity_density.binarized"
                    checked={config.getIn(['local_connectivity_density', 'binarized'])}
                    onChange={onChange}
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
                    name="derivatives.network_centrality.local_connectivity_density.weighted"
                    checked={config.getIn(['local_connectivity_density', 'weighted'])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>

          <TextField
            select
            label="Local Functional Connectivity Density Threshold Type"
            name="derivatives.network_centrality.local_connectivity_density.threshold_type"
            value={config.getIn(['local_connectivity_density', 'threshold_type'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            helperText=''
          >
            <MenuItem value={"significance"}>Significance</MenuItem>
            <MenuItem value={"sparsity"}>Sparsity</MenuItem>
            <MenuItem value={"correlation"}>Correlation</MenuItem>
          </TextField>

          <TextField
            label="Local Functional Connectivity Density Threshold"
            name="derivatives.network_centrality.local_connectivity_density.threshold"
            value={config.getIn(['local_connectivity_density', 'threshold'])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NetworkCentrality.styles)(NetworkCentrality);
