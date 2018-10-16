import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProjectCard from '../components/ProjectCard';

class Home extends Component {

  static styles = theme => ({
    header: {
      padding: '0 0 20px 0',
    },
    title: {
      marginBottom: 10
    },
    paper: {
      margin: 0,
      padding: 20
    }
  });

  render() {
    const { classes } = this.props

    return (
      <Grid container spacing={8} alignContent="center">
        <Grid item sm={6}>
          <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.header}>
              Recent projects
            </Typography>
            <Grid container spacing={8} alignContent="center">
              <Grid item>
                <ProjectCard id="abide" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              About C-PAC
            </Typography>
            <Typography paragraph>
              The Configurable Pipeline for the Analysis of Connectomes (C-PAC) is an
              open-source software pipeline for automated preprocessing and analysis
              of resting-state fMRI data.
            </Typography>
            <Typography paragraph>
              C-PAC builds upon a robust set of existing
              software packages including AFNI, FSL, and ANTS, and makes it easy for
              both novice users and experts to explore their data using a wide array
              of analytic tools.
            </Typography>
            <Typography paragraph>
              Users define analysis pipelines by specifying a
              combination of preprocessing options and analyses to be run on an
              arbitrary number of subjects. Results can then be compared across
              groups using the integrated group statistics feature.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
