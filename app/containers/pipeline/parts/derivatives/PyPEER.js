import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControlLabelled from 'components/FormControlLabelled'
import FormHelperText from '@material-ui/core/FormHelperText';

import Help from 'components/Help'

class PyPEER extends Component {

    static styles = theme => ({
    });
  
    render() {
      const { classes, configuration, onChange } = this.props

      return (
        <Grid container>
          <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^peer_eye_scan_names/}
            help={`PEER scan names to use for training. Example: ['peer_run-1', 'peer_run-2']`}
            fullWidth
          >
            <TextField
              label="PEER Eye Scan Names"
              name="derivatives.pypeer.peer_eye_scan_names"
              value={configuration.getIn(["derivatives", "pypeer", "peer_eye_scan_names"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^peer_data_scan_names/}
            help={`Naturalistic viewing data scan names to use for eye estimation. Example: ['movieDM']`}
            fullWidth
          >
            <TextField
              label="PEER Data Scan Names"
              name="derivatives.pypeer.peer_data_scan_names"
              value={configuration.getIn(["derivatives", "pypeer", "peer_data_scan_names"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^eye_mask_path/}
            help={`Template-space eye mask`}
            fullWidth
          >
            <TextField
              label="Eye Mask Path"
              name="derivatives.pypeer.eye_mask_path"
              value={configuration.getIn(["derivatives", "pypeer", "eye_mask_path"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^peer_stimulus_path/}
            help={`This is a file describing the stimulus locations from the calibration sequence.`}
            fullWidth
          >
            <TextField
              label="PyPEER Stimulus File Path"
              name="derivatives.pypeer.peer_stimulus_path"
              value={configuration.getIn(["derivatives", "pypeer", "peer_stimulus_path"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <FormControl component="fieldset">
            <FormGroup row>
              <Help
                mini
                type="pipeline"
                regex={/^peer_gsr/}
                help={`Global signal regression`}
              >
                <FormControlLabelled label="Perform global signal regression">
                  <Switch
                    name="derivatives.pypeer.peer_gsr"
                    checked={configuration.getIn(["derivatives", "pypeer", "peer_gsr"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                mini
                type="pipeline"
                regex={/^peer_scrub/}
                help={`Motion scrubbing`}
              >
                <FormControlLabelled label="Perform motion scrubbing">
                  <Switch
                    name="derivatives.pypeer.peer_scrub.enabled"
                    checked={configuration.getIn(["derivatives", "pypeer", "peer_scrub", "enabled"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </Help>
            </FormGroup>
          </FormControl>

          <Help
            type="pipeline"
            regex={/^peer_scrub_thresh/}
            help={`Motion scrubbing threshold`}
            fullWidth
          >
            <TextField
              label="Motion Scrubbing Threshold"
              name="derivatives.pypeer.peer_scrub.thresh"
              value={configuration.getIn(["derivatives", "pypeer", "peer_scrub", "thresh"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          {/* <Grid item xs={8}>
              <Collapse in={configuration.getIn("derivatives.pypeer.peer_scrub.enabled".split("."))}>
                <FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^peer_scrub_thresh/}
                      help={`Motion scrubbing threshold`}
                      fullWidth
                    >
                      <TextField label="Motion Scrubbing Threshold" fullWidth margin="normal" variant="outlined"
                                name="derivatives.pypeer.peer_scrub_thres"
                                value={configuration.getIn("derivatives.pypeer.peer_scrub_thres".split("."))}
                                onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                </Collapse>
            </Grid> */}
          </Grid>
        </Grid>
      )    
    }
}

export default withStyles(PyPEER.styles)(PyPEER);
