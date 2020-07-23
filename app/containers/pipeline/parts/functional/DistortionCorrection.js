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
import FormControlLabelled from 'components/FormControlLabelled'
import FormHelperText from '@material-ui/core/FormHelperText';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'


class DistortionCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return(
      <React.Fragment>
        <FormGroup>
          <FormLabel>
            <Help
              type="pipeline"
              help={`Use phase difference image(PhaseDiff) or Phase-Encoding Polarity(Blip-up/Blip-down) to perform distortion correction.`}
            />
            Options for Distortion Correction 
          </FormLabel>

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <Help
                  type="pipeline"
                  regex={/^distortion_correction/}
                  help={`Perform field map correction using a single phase difference image, a subtraction of the two phase images from each echo. Default scanner for this method is SIEMENS.`}
                >
                  <FormControlLabelled label="PhaseDiff">
                    <Switch
                      name="functional.distortion_correction.method.phasediff.enabled"
                      checked={configuration.getIn("functional.distortion_correction.method.phasediff.enabled".split("."))}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </Help>
              </FormGroup>
              <FormGroup row>
                <Help
                  type="pipeline"
                  regex={/^distortion_correction/}
                  help={`Uses AFNI 3dQWarp to calculate the distortion unwarp for EPI field maps of opposite/same phase encoding direction.`}
                >
                  <FormControlLabelled label="Blip">
                    <Switch
                      name="functional.distortion_correction.method.blip.enabled"
                      checked={configuration.getIn("functional.distortion_correction.method.blip.enabled".split("."))}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </Help>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>      
              <Collapse in={configuration.getIn("functional.distortion_correction.method.phasediff.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Specific options for 'PhaseDiff' distortion correction.`}
                    />
                    'PhaseDiff' Distortion Correction 
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_skullstrip/}
                      help={`Since the quality of the distortion heavily relies on the skull-stripping step, we provide a choice of method (AFNI 3dSkullStrip or FSL BET).`}
                      fullWidth
                    >
                      <TextField
                        select
                        label="Skull-strip the magnitude file with"
                        name="functional.distortion_correction.method.phasediff.skull_stripping"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.skull_stripping".split("."))}
                        onChange={onChange}
                        fullWidth={true} margin="normal" variant="outlined"
                        className={classes.textField}
                        helperText=''
                      >
                        <MenuItem value={"bet"}>BET</MenuItem>
                        <MenuItem value={"afni"}>3dSkullStrip</MenuItem>
                      </TextField>
                    </Help>
                  </FormGroup>
      
                  <FormGroup row > 
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_threshold/}
                      help={`Set the threshold value for the skull-stripping of the magnitude file. Depending on the data, a tighter extraction may be necessary in order to prevent noisy voxels from interfering with preparing the field map. The default value is 0.5 for BET and 0.6 for AFNI.`}
                      fullWidth
                    >
                      <TextField 
                        label="Threshold"
                        className={classes.textField} onChange={onChange}
                        name="functional.distortion_correction.method.phasediff.threshold"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.threshold".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                        helperText=''
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_deltaTE/}
                      help={`Set the Delta-TE value, used for preparing field map, time delay between the first and second echo images.`}
                      fullWidth
                    >
                      <TextField
                        label="Delta-TE"
                        name="functional.distortion_correction.method.phasediff.delta_te"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.delta_te".split("."))}
                        onChange={onChange}
                        fullWidth={true} margin="normal" variant="outlined"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                        }}
                        helperText=''
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_dwell_time/}
                      help={`Set the Dwell Time for the FSL Fugue input.`}
                      fullWidth
                    >
                      <TextField
                        label="Dwell Time"
                        fullWidth={true} margin="normal" variant="outlined"
                        name="functional.distortion_correction.method.phasediff.dwell_time"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.dwell_time".split("."))}
                        onChange={onChange}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        }}
                        helperText=''
                      />
                    </Help>
                  </FormGroup>              
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_dwell_asym_ratio/}
                      help={`Set the asymmetric ratio value for FSL Fugue input.`}
                      fullWidth
                    >
                      <TextField
                        label="Dwell to assymetric ratio"
                        fullWidth={true} margin="normal" variant="outlined"
                        name="functional.distortion_correction.method.phasediff.dwell_to_assymetric_ratio"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.dwell_to_assymetric_ratio".split("."))}
                        onChange={onChange}
                        helperText=''
                      />
                    </Help>               
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fmap_distcorr_pedir/}
                      help={`Set the phase-encoding direction.`}
                      fullWidth
                    >
                      <TextField
                        select
                        label="Phase-encoding direction"
                        fullWidth={true} margin="normal" variant="outlined"
                        className={classes.textField}
                        name="functional.distortion_correction.method.phasediff.phase_encoding_direction"
                        value={configuration.getIn("functional.distortion_correction.method.phasediff.phase_encoding_direction".split("."))}
                        onChange={onChange}
                        helperText=''
                      >
                        <MenuItem value={"x"}>x</MenuItem>
                        <MenuItem value={"y"}>y</MenuItem>
                        <MenuItem value={"z"}>z</MenuItem>
                        <MenuItem value={"-x"}>-x</MenuItem>
                        <MenuItem value={"-y"}>-y</MenuItem>
                        <MenuItem value={"-z"}>-z</MenuItem>
                      </TextField>
                    </Help>                  
                  </FormGroup>
                </FormGroup>
              </Collapse>
              <Collapse in={configuration.getIn("functional.distortion_correction.method.blip.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      regex={/^distortion_correction/}
                      help={`'Blip' Distortion Correction can be run without specific settings.`}
                    />
                    'Blip' Distortion Correction 
                  </FormLabel>
                </FormGroup>
              </Collapse>  
            </Grid>
           </Grid> 
        </FormGroup>
      </React.Fragment>
    )
  }
}

export default withStyles(DistortionCorrection.styles)(DistortionCorrection);
