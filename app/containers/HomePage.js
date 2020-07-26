import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'

<<<<<<< HEAD
// import GroupAnalysisList from 'containers/GroupAnalysisList'
=======
>>>>>>> f2a1340 (theo data-config generation! and some other stuff)

import DatasetList from 'containers/DatasetList'
import PipelineList from 'containers/PipelineList'
import PipelineListTools from 'containers/PipelineListTools.platform'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import Box from 'components/Box'

import {
  PipelineIcon,
  DatasetIcon,
  GroupIcon,
  ExecutionIcon,
  HelpIcon,
} from 'components/icons'

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
  })

  handleOpen = () => {
    this.props.history.push(`/executions/`)
  }

  render() {
    const { classes, pipelines } = this.props

    return (
      <Grid container>
        <Grid item md={8} sm={12} className={classes.cell}>
          <Grid container>
            <Grid item xs={12} className={classes.cell}>
              <Box title="Pipelines"
                  avatar={<PipelineIcon />}
                  tools={<PipelineListTools />}
                  className={classes.expand}>
                <PipelineList />
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.cell}>
              <Box title="Datasets"
                  avatar={<DatasetIcon />}
                  className={classes.expand}>
                <DatasetList />
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.cell}>
              <Box title="Executions"
                  avatar={<ExecutionIcon />}
                  className={classes.expand}>

                <a onClick={this.handleOpen}>Executions</a>

              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} sm={12} className={classes.cell}>
          <Box title="About C-PAC"
               avatar={<HelpIcon />}
               className={classes.expand}>
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
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage)))
