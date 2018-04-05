// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import Home from '../components/Home';
import EnvironmentSelector from '../components/EnvironmentSelector';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  static styles = theme => ({
    paper: {
      margin: 10,
      padding: 10
    }
  });

  render() {
    const { classes, main } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <EnvironmentSelector />
        </Paper>
        {
          !!main.environment
          ? (
            <Paper className={classes.paper}>
              <Home />
            </Paper>
          )
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})
  
const mapDispatchToProps = {
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage));
