import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'


class Aroma extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(Aroma.styles)(Aroma);
