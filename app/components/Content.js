import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

class Content extends Component {
  static styles = theme => ({
    paper: {
      margin: '0 0 90px 0',
      padding: 20,
    }
  });

  render() {

    const { flex = false } = this.props

    return (
      <Paper className={this.props.classes.paper} style={{ display: flex ? 'flex' : null }} elevation={1}>
        { this.props.children }
      </Paper>
    );
  }
}

export default withStyles(Content.styles)(Content);
