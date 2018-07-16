import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

import Home from '../components/Home';

class HomePage extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes } = this.props;

    return (<Home />);
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage)))
