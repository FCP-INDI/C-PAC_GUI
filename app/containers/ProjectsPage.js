// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import ProjectCard from '../components/ProjectCard';

type Props = {};

class ProjectsPage extends Component<Props> {
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
      <div>
      <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.header} variant="headline">Projects</Typography>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <ProjectCard name="ABIDE" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard name="ADHD" />
          </Grid>
        </Grid>
      </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectsPage.styles)(ProjectsPage));
