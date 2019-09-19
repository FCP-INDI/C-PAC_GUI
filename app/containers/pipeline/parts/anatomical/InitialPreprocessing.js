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

  // state = {
  //   nlmfOptions: true,
  //   n4Options: true,
  // }

  // handleValueChange = (event) => {
  //   const name = event.target.name

  //   const checkBoxes = [
  //     "anatomical.preprocessing.methods.nlmf.enabled",
  //     "anatomical.preprocessing.methods.n4.enabled"
  //     // "anatomical.preprocessing.enabled"
  //   ]

  //   if (!checkBoxes.includes(name)) {
  //     this.props.onChange([
  //       [name, event.target.value]
  //     ])

  //   } else {
  //     const changes = []
  //     const value = event.target.checked

      // if (name == "anatomical.preprocessing.enabled") {
      //   changes.push([name, !value])
      //   if (value) {
      //     changes.push(["anatomical.preprocessing.methods.nlmf.enabled", false])
      //     changes.push(["anatomical.preprocessing.methods.n4.enabled", false])
      //   }
      // }

  //     const methods = [
  //       "anatomical.preprocessing.methods.nlmf.enabled",
  //       "anatomical.preprocessing.methods.n4.enabled"
  //     ]
  //     if (methods.includes(name)) {
  //       changes.push([name, value])
  //       if (value) {
  //         changes.push(["anatomical.preprocessing.methods.nlmf.enabled", false])
  //         changes.push(["anatomical.preprocessing.methods.n4.enabled", false])
  //       }
  //     }

  //     this.props.onChange(changes)
  //   }
  // };

  // handleOpenNLMF = () => {
  //   this.setState({ nlmfOptions: true })
  // }

  // handleOpenN4 = () => {
  //   this.setState({ n4Options: true })
  // }
  
  // handleCloseNLMF = () => {
  //   this.setState({ nlmfOptions: false })
  // }

  // handleCloseN4 = () => {
  //   this.setState({ n4Options: false })
  // }

  render() {
    const { classes, configuration, advanced, onChange } = this.props

    return (
      <React.Fragment>
        <FormControl fullWidth>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^non_local_means_filtering/}
              help={`Turn on to apply non-local means filtering`}
            >
              <FormControlLabelled label="Non Local Means Filtering">
                <Switch
                  name="anatomical.preprocessing.methods.nlmf.enabled"
                  checked={configuration.getIn("anatomical.preprocessing.methods.nlmf.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^n4_bias_field_correction/}
              help={`Turn on to apply N4 bias correction`}
            >
              <FormControlLabelled label="N4 Bias Correction">
                <Switch
                  name="anatomical.preprocessing.methods.n4.enabled"
                  checked={configuration.getIn("anatomical.preprocessing.methods.n4.enabled".split("."))}
                  onChange={onChange}
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

export default connect(mapStateToProps)(withStyles(InitialPreprocessing.styles)(InitialPreprocessing));
