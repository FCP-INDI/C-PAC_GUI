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
      <Grid container>
        <Grid item lg={8} xs={12}>
          <FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="Already skull stripped"
                control={
                  <Switch
                    name="anatomical.skull_stripping.enabled"
                    checked={!configuration.getIn("anatomical.skull_stripping.enabled".split("."))}
                    onChange={this.handleValueChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
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
            </FormGroup>
          </FormGroup>
        </Grid>
        <Grid item lg={4} style={{ padding: 16 }}>
          <Typography paragraph>Skull-stripping is the removal of skull and other non-brain tissue like dura and eyes from anatomical images, which could otherwise complicate co-registration and normalization steps.</Typography>
          <Typography paragraph>C-PAC provides options for configuring skull-stripping - users can select:</Typography>
          <Typography component="ul">
            <li>AFNI’s 3dSkullStrip</li>
            <li>FSL’s BET, and can configure further parameters for each of these tools.</li>
            <li>Providing their own brain mask for extraction</li>
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(SkullStripping.styles)(SkullStripping);
