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

import Help from 'components/Help'


class NetworkCentrality extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    const config = configuration.getIn(['derivatives', 'network_centrality'])

    return (
      <Grid container>
        <Grid item sm={12}>

          <Help
            type="pipeline"
            regex={/^templateSpecificationFile/}
            help={`Full path to a NIFTI file describing the mask. Centrality will be calculated for all voxels within the mask.`}
            fullWidth
          >
            <TextField
              label="Voxel mask"
              name="derivatives.network_centrality.mask"
              value={config.getIn(['mask'])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
            />
          </Help>

          <FormGroup>
            <FormLabel>
              <Help
                help={``}
              />
              Degree Centrality
            </FormLabel>
            <Grid container>
              <Grid item md={6}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Connectivity weights`}
                      type="pipeline" regex={/^degWeightOptions/}
                    />
                    Weight
                  </FormLabel>
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
                </FormGroup>
              </Grid>
              <Grid item md={6}>
                <Help
                  type="pipeline"
                  regex={/^degCorrelationThresholdOption/}
                  help={`Select the type of threshold used when creating the adjacency matrix.`}
                  fullWidth
                >
                  <TextField
                    select
                    label="Threshold Type"
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
                </Help>
                <Help
                  type="pipeline"
                  regex={/^degCorrelationThreshold/}
                  help={`Based on the Threshold Type selected above, enter a Threshold value.`}
                  fullWidth
                >
                  <TextField
                    label="Threshold"
                    name="derivatives.network_centrality.degree_centrality.threshold"
                    value={config.getIn(['degree_centrality', 'threshold'])}
                    onChange={onChange}
                    fullWidth={true} margin="normal" variant="outlined"
                    helperText=''
                  />
                </Help>
              </Grid>
            </Grid>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <Help
                help={``}
              />
              Eigenvector
            </FormLabel>
            <Grid container>
              <Grid item md={6}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Connectivity weights`}
                      type="pipeline" regex={/^eigWeightOptions/}
                    />
                    Weight
                  </FormLabel>
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
                </FormGroup>
              </Grid>
              <Grid item md={6}>
                <Help
                  type="pipeline"
                  regex={/^eigCorrelationThresholdOption/}
                  help={`Select the type of threshold used when creating the adjacency matrix.`}
                  fullWidth
                >
                  <TextField
                    select
                    label="Threshold Type"
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
                </Help>
                <Help
                  type="pipeline"
                  regex={/^eigCorrelationThreshold/}
                  help={`Based on the Threshold Type selected above, enter a Threshold value.`}
                  fullWidth
                >
                  <TextField
                    label="Threshold"
                    name="derivatives.network_centrality.eigenvector.threshold"
                    value={config.getIn(['eigenvector', 'threshold'])}
                    onChange={onChange}
                    fullWidth={true} margin="normal" variant="outlined"
                    helperText=''
                  />
                </Help>
              </Grid>
            </Grid>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <Help
                help={``}
              />
              Local Functional Connectivity Density
            </FormLabel>
            <Grid container>
              <Grid item md={6}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Connectivity weights`}
                      type="pipeline" regex={/^lfcdWeightOptions/}
                    />
                    Weight
                  </FormLabel>
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
                </FormGroup>
              </Grid>
              <Grid item md={6}>
                <Help
                  type="pipeline"
                  regex={/^lfcdCorrelationThresholdOption/}
                  help={`Select the type of threshold used when creating the adjacency matrix.`}
                  fullWidth
                >
                  <TextField
                    select
                    label="Threshold Type"
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
                </Help>
                <Help
                  type="pipeline"
                  regex={/^lfcdCorrelationThreshold/}
                  help={`Based on the Threshold Type selected above, enter a Threshold value.`}
                  fullWidth
                >
                  <TextField
                    label="Threshold"
                    name="derivatives.network_centrality.local_connectivity_density.threshold"
                    value={config.getIn(['local_connectivity_density', 'threshold'])}
                    onChange={onChange}
                    fullWidth={true} margin="normal" variant="outlined"
                    helperText=''
                  />
                </Help>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NetworkCentrality.styles)(NetworkCentrality);
