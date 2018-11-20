import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProjectCard from '../components/ProjectCard';
import PipelineCard from '../components/PipelineCard';
import DatasetCard from '../components/DatasetCard';

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import Box from '../components/Box'

import {
  PipelineIcon,
  AddIcon,
} from '../components/icons';

class HomePage extends Component {

  static styles = theme => ({
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
      flexDirection: 'column',
      flexGrow: 1
    },
    expand: {
      flexGrow: 1
    }
  });

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    const tools = (
      <React.Fragment>
        <IconButton>
          <AddIcon />
        </IconButton>
      </React.Fragment>
    )

    return (
      <Grid container spacing={8}>
        <Grid item md={8} sm={12} className={classes.cell}>
          <Box title="Pipelines"
              avatar={<PipelineIcon />}
              tools={tools}
              className={classes.expand}>
            <Grid container spacing={8}>
              {
                pipelines && pipelines.map((pipeline) => (
                  <Grid item key={pipeline.id}>
                    <PipelineCard pipeline={pipeline} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4} sm={12} className={classes.cell}>
          <Box title="About C-PAC" className={classes.expand}>
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
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  pipelines: ((state.main.config || {}).pipelines) || [],
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage)))
