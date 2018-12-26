import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'


class SkullStripping extends Component {

  static styles = theme => ({
  });

  handleValueChange = (event) => {
    const name = event.target.name

    const checkBoxes = [
      "anatomical.skull_stripping.methods.afni.enabled",
      "anatomical.skull_stripping.methods.bet.enabled",
      "anatomical.skull_stripping.enabled"
    ]

    if (!checkBoxes.includes(name)) {
      this.props.onChange([
        [name, event.target.value]
      ])

    } else {
      const changes = []
      const value = event.target.checked

      if (name == "anatomical.skull_stripping.enabled") {
        changes.push([name, !value])
        if (value) {
          changes.push(["anatomical.skull_stripping.methods.afni.enabled", false])
          changes.push(["anatomical.skull_stripping.methods.bet.enabled", false])
        }
      }

      const methods = [
        "anatomical.skull_stripping.methods.afni.enabled",
        "anatomical.skull_stripping.methods.bet.enabled"
      ]
      if (methods.includes(name)) {
        changes.push([name, value])
        if (value) {
          changes.push(["anatomical.skull_stripping.enabled", true])
        }
      }

      this.props.onChange(changes)
    }
  };

  render() {
    const { classes, configuration } = this.props

    return (
      <React.Fragment>
        <FormControl>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^already_skullstripped/}
              help={`If inputs are already skull stripped (i.e. the structural input data is brain-only) then you can turn on this option.`}
            >
              <FormControlLabelled label="Already skull-stripped">
                <Switch
                  name="anatomical.skull_stripping.enabled"
                  checked={!configuration.getIn("anatomical.skull_stripping.enabled".split("."))}
                  onChange={this.handleValueChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^skullstrip_option/}
              help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            >
              <FormControlLabel
                label="FSL BET"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.bet.enabled"
                    checked={configuration.getIn("anatomical.skull_stripping.methods.bet.enabled".split("."))}
                    onChange={this.handleValueChange}
                    color="primary"
                  />
                }
              />
              <FormControlLabel
                label="AFNI 3dSkullStrip"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.afni.enabled"
                    checked={configuration.getIn("anatomical.skull_stripping.methods.afni.enabled".split("."))}
                    onChange={this.handleValueChange}
                    color="primary"
                  />
                }
              />
            </Help>
          </FormGroup>
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(SkullStripping.styles)(SkullStripping);
