// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Home from '../components/Home';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage));
