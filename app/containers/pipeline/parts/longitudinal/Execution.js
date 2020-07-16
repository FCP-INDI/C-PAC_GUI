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

class Execution extends Component {

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
              regex={/^run_longitudinal/}
              help={`Turn on to run anatomical longitudinal preprocessing pipeline`}
            >
              <FormControlLabelled label="Anatomical Longitudinal Preprocessing">
                <Switch
                  name="longitudinal.run_anatomical"
                  checked={configuration.getIn("longitudinal.run_anatomical".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^run_longitudinal/}
              help={`Functional longitudinal preprocessing pipeline is still in development and not available yet.`}
            >
              <FormControlLabelled label="Functional Longitudinal Preprocessing">
                <Switch
                  name="longitudinal.run_functional"
                  checked={configuration.getIn("longitudinal.run_functional".split("."))}
                //   onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>
        </FormControl>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(Execution.styles)(Execution));