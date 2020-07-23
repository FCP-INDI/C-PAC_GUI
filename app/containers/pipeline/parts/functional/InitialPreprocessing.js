import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography, Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'
import IconButton from '@material-ui/core/IconButton'

import {
  SettingsIcon,
} from 'components/icons';

class InitialPreprocessing extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, advanced, onChange } = this.props

    return (
      <React.Fragment>

        <FormControl fullWidth>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^n4_correct_mean_EPI/}
              help={`Run ANTs’ N4 Bias Field Correction on the input BOLD average (mean EPI).`}
            >
              <FormControlLabelled label="N4 Bias Field Correction">
                <Switch
                  name="functional.preprocessing.n4_mean_epi"
                  checked={configuration.getIn("functional.preprocessing.n4_mean_epi.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^runDespike/}
              help={`Turn on to run AFNI 3dDespike after motion correction`}
            >
              <FormControlLabelled label="Despike">
                <Switch
                  name="functional.preprocessing.despike.enabled"
                  checked={configuration.getIn("functional.preprocessing.despike.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>
    
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^runScaling/}
              help={`Turn on to apply scaling, usually used in rodent pipeline`}
            >
              <FormControlLabelled label="Scaling">
                <Switch
                  name="functional.preprocessing.scaling.enabled"
                  checked={configuration.getIn("functional.preprocessing.scaling.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>
          </FormControl>

          <Help
            type="pipeline"
            regex={/^scaling_factor/}
            help={`Scale the size of the dataset voxels by the factor.`}
            fullWidth
          >
            <TextField
              label="Scaling Factor"
              name="functional.preprocessing.scaling.factor"
              value={configuration.getIn("functional.preprocessing.scaling.factor".split("."))}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>
          
        
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^runMotionStatisticsFirst/}
              help={`Turn on to estimate motion statistics before slice timing correction`}
            >
              <FormControlLabelled label="Motion Statistics Estimation before Slice Timing Correction">
                <Switch
                  name="functional.preprocessing.motion_stats.enabled"
                  checked={configuration.getIn("functional.preprocessing.motion_stats.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <Help
                type="pipeline"
                regex={/^motion_correction/}
                help={`Choose the tool to perform motion correction`}
              />
              Motion Correction Tool
            </FormLabel>
            <FormControl>
              <FormGroup row>
                <FormControlLabelled label="AFNI: 3dvolreg">
                  <Switch
                    name="functional.preprocessing.motion_correction.method.volreg"
                    checked={configuration.getIn(["functional", "preprocessing", "motion_correction", "method", "volreg"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
                <FormControlLabelled label="FSL: mcflirt">
                  <Switch
                    name="functional.preprocessing.motion_correction.method.mcflirt"
                    checked={configuration.getIn(["functional", "preprocessing", "motion_correction", "method", "mcflirt"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>
              <Help
                type="pipeline"
                regex={/^motion_correction_reference/}
                help={`Choose the motion correction reference`}
              />
              Motion Correction Reference
            </FormLabel>
            <FormControl>
              <FormGroup row>
                <FormControlLabelled label="mean">
                  <Switch
                    name="functional.preprocessing.motion_correction.reference.mean"
                    checked={configuration.getIn(["functional", "preprocessing", "motion_correction", "reference", "mean"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
                <FormControlLabelled label="median">
                  <Switch
                    name="functional.preprocessing.motion_correction.reference.median"
                    checked={configuration.getIn(["functional", "preprocessing", "motion_correction", "reference", "median"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
                <FormControlLabelled label="selected volume">
                  <Switch
                    name="functional.preprocessing.motion_correction.reference.selected_volume"
                    checked={configuration.getIn(["functional", "preprocessing", "motion_correction", "reference", "selected_volume"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <Help
                type="pipeline"
                regex={/^motion_correction_reference_volume/}
                help={`Motion Correction Reference Volume`}
                fullWidth
              >
                <TextField
                  label="Motion Correction Reference Volume"
                  name="functional.preprocessing.motion_correction.reference_volume"
                  value={configuration.getIn("functional.preprocessing.motion_correction.reference_volume".split("."))}
                  onChange={onChange}
                  fullWidth={true} margin="normal" variant="outlined"
                  helperText=''
                />
              </Help>
            </FormControl>
          </FormGroup>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(InitialPreprocessing.styles)(InitialPreprocessing));
