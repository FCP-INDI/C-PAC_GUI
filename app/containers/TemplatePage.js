// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

type Props = {};

class TemplatePage extends Component<Props> {
  props: Props;

  static styles = theme => ({
  });

  render() {
    const { classes } = this.props;

    return (null);
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(TemplatePage.styles)(TemplatePage));
