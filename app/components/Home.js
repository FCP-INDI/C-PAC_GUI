// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import { environmentServerStart } from '../actions/main'

type Props = {};

class Home extends Component<Props> {
  props: Props;

  static styles = theme => ({
  });

  render() {
    return (
      <div>
        <button onClick={() => this.props.environmentServerStart(this.props.environment.id)}>Run!</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  environment: state.main.environment,
})
  
const mapDispatchToProps = {
  environmentServerStart
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
