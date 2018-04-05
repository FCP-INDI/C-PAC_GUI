// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Home from '../components/Home';
import EnvironmentCard from '../components/EnvironmentCard';

type Props = {};

class EnvironmentsPage extends Component<Props> {
  props: Props;

  static styles = theme => ({
    paper: {
      margin: 10,
      padding: 20
    },
    header: {
      marginBottom: 10
    }
  });

  render() {
    const { classes, main } = this.props;

    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography className={classes.header} variant="headline">Environments</Typography>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <EnvironmentCard />
          </Grid>
          <Grid item xs={4}>
            <EnvironmentCard />
          </Grid>
          <Grid item xs={4}>
            <EnvironmentCard />
          </Grid>
          <Grid item xs={4}>
            <EnvironmentCard />
          </Grid>
          <Grid item xs={4}>
            <EnvironmentCard />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(EnvironmentsPage.styles)(EnvironmentsPage));
