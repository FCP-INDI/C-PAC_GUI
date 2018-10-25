import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProjectCard from '../components/ProjectCard';
import PipelineCard from '../components/PipelineCard';
import DatasetCard from '../components/DatasetCard';


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
      padding: 20,
      flexGrow: 1,
    },
    cell: {
      display: 'flex',
    },
  });

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <Grid container spacing={8} alignContent="center">
        <Grid item sm={6} className={classes.cell}>
          <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.header}>
              Recent projects
            </Typography>
            <Grid container spacing={8} alignContent="center">
              {
                projects && projects.map((project) => (
                  <Grid item key={project.id}>
                    <ProjectCard id={project.id} />
                  </Grid>
                ))
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={6} className={classes.cell}>
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
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.header}>
              Explore
            </Typography>
            <Grid container spacing={8} alignContent="center">
              <Grid item sm={6} className={classes.cell}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" className={classes.title}>
                    Datasets
                  </Typography>
                  <Grid container spacing={8} alignContent="center">
                    {
                      datasets && datasets.map((dataset) => (
                        <Grid item key={dataset.id}>
                          <DatasetCard id={dataset.id} />
                        </Grid>
                      ))
                    }
                  </Grid>
                </Paper>
              </Grid>
              <Grid item sm={6} className={classes.cell}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" className={classes.title}>
                    Pipelines
                  </Typography>
                  <Grid container spacing={8} alignContent="center">
                    {
                      pipelines && pipelines.map((pipeline) => (
                        <Grid item key={pipeline.id}>
                          <PipelineCard id={pipeline.id} />
                        </Grid>
                      ))
                    }
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: ((state.main.config || {}).projects) || [],
  pipelines: ((state.main.config || {}).pipelines) || [],
  datasets: ((state.main.config || {}).datasets) || [],
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
