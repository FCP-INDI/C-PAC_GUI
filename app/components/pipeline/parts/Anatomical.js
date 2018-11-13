import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import {
  SkullStripping,
  Registration,
} from './anatomical'

class Anatomical extends Component {

  static styles = theme => ({
    divider: {
      margin: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    }
  });

  constructor(props) {
    super(props)
    this.state = { configuration: props.configuration }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.configuration.anatomical
  }

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <Typography variant="h6">
          Skull stripping
        </Typography>
        <SkullStripping configuration={configuration} onChange={onChange} />
        <Typography variant="h6">
          Registration
        </Typography>
        <Registration configuration={configuration} onChange={onChange} />
      </React.Fragment>
    )
  }
}

export default withStyles(Anatomical.styles)(Anatomical);
