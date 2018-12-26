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
import FormControlLabelled from 'components/FormControlLabelled'


class Smoothing extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^fwhm/}
            help={`Full Width at Half Maximum of the Gaussian kernel used during spatial smoothing.`}
            fullWidth
          >
            <TextField
              label="Smoothing kernel FWHM"
              name="functional.smoothing.kernel_fwhm"
              value={configuration.getIn(["functional", "smoothing", "kernel_fwhm"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
              }}
            />
          </Help>

          <FormControl component="fieldset">
            <FormGroup row>
              <Help
                mini
                type="pipeline"
                regex={/^smoothing_order/}
                help={`Choose whether to smooth outputs before or after z-scoring.`}
              >
                <FormControlLabelled label="Perform smoothing before z-scoring">
                  <Switch
                    name="functional.smoothing.before_zscore"
                    checked={configuration.getIn(["functional", "smoothing", "before_zscore"])}
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
                regex={/^runZScoring/}
                help={`z-score standardize the derivatives. This is required for group-level analysis.`}
              >
                <FormControlLabelled label="Apply z-score standarization to derivatives">
                  <Switch
                    name="functional.smoothing.zscore_derivatives"
                    checked={configuration.getIn(["functional", "smoothing", "zscore_derivatives"])}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </Help>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(Smoothing.styles)(Smoothing);
