import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

class Derivatives extends Component {

  static styles = theme => ({
  });

  render() {
    return null
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(Derivatives.styles)(Derivatives)
);
