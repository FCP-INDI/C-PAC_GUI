import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'


class EPIRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props
        
    return (
      <Grid container>
        <Grid item sm={12}>         
          <Help
            type="pipeline"
            regex={/^template_epi/}
            help={`EPI template. Used as a reference image for functional registration.`}
            fullWidth
          >
            <TextField label="EPI Template"
              fullWidth margin="normal" variant="outlined"
              name="functional.epi_registration.template_epi"
              value={configuration.getIn(["functional", "epi_registration", "template_epi"])}
              onChange={onChange}
            />
          </Help>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(EPIRegistration.styles)(EPIRegistration);
