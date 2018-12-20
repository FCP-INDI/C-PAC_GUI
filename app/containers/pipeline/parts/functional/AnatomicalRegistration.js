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

import Collapse from '@material-ui/core/Collapse';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'


class AnatomicalRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^skullstrip_option/}
              help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            >
              <FormControlLabelled label="Using BB Registration">
                <Switch
                  name="functional.anatomical_registration.bb_registration"
                  checked={configuration.getIn(["functional", "anatomical_registration", "bb_registration"])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <Collapse in={configuration.getIn(["functional", "anatomical_registration", "bb_registration"])}>
            <Help
              type="pipeline"
              regex={/^skullstrip_option/}
              help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
              fullWidth
            >
              <TextField label="BB Registration Scheduler"
                          fullWidth margin="normal" variant="outlined"
                          name="functional.anatomical_registration.bb_registration_scheduler"
                          value={configuration.getIn(["functional", "anatomical_registration", "bb_registration_scheduler"])}
                          onChange={onChange}
                          helperText=''
                          />
            </Help>
          </Collapse>

          <Help
            type="pipeline"
            regex={/^skullstrip_option/}
            help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
            fullWidth
          >
            <TextField
              select
              label="Use as registration input"
              fullWidth margin="normal" variant="outlined"
              className={classes.textField} onChange={onChange}
              name="functional.anatomical_registration.registration_input"
              value={configuration.getIn(["functional", "anatomical_registration", "registration_input"])}
              helperText=''
            >
              <MenuItem value={"mean"}>Mean Functional</MenuItem>
              <MenuItem value={"selected"}>Selected Functional Volume</MenuItem>
            </TextField>
          </Help>

          <Collapse in={configuration.getIn(["functional", "anatomical_registration", "registration_input"]) == 'selected'}>
            <Help
              type="pipeline"
              regex={/^skullstrip_option/}
              help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
              fullWidth
            >
              <TextField
                label="Functional Volume" onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                name="functional.anatomical_registration.functional_volume"
                value={configuration.getIn(["functional", "anatomical_registration", "functional_volume"])}
                helperText=''
                />
            </Help>
          </Collapse>

          <FormGroup>
            <FormLabel>Functional Masking</FormLabel>
            <FormControl>
              <FormGroup row>
                <Help
                  type="pipeline"
                  regex={/^skullstrip_option/}
                  help={`Choice of using AFNI or FSL-BET to perform SkullStripping`}
                >
                  <FormControlLabelled label="FSL BET">
                    <Switch
                      name="functional.anatomical_registration.functional_masking.bet"
                      checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "bet"])}
                      onChange={onChange}
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
                  <FormControlLabelled label="AFNI 3dSkullStrip">
                    <Switch
                      name="functional.anatomical_registration.functional_masking.afni"
                      checked={configuration.getIn(["functional", "anatomical_registration", "functional_masking", "afni"])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </Help>
              </FormGroup>
            </FormControl>
          </FormGroup>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(AnatomicalRegistration.styles)(AnatomicalRegistration);
