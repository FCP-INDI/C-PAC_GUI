import { remote } from 'electron'
import fs from 'fs'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import ProjectCard from '../components/ProjectCard'
import PipelineCard from '../components/PipelineCard'
import DatasetCard from '../components/DatasetCard'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import Box from '../components/Box'

import {
  PipelineIcon,
  AddIcon,
  HelpIcon,
  UploadIcon,
} from '../components/icons'

import {
  pipelineDuplicate,
  pipelineImport,
} from '../actions/pipeline'


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

  pipelineUpload() {
    const pipelineConfigs = remote.dialog.showOpenDialog({
      properties: [
        'openFile',
        'multiSelections'
      ]
    })

    if (!pipelineConfigs){
      return
    }

    for (const pipelineConfig of pipelineConfigs) {
      fs.readFile(pipelineConfig, 'utf-8', (err, data) => {
        if(err){
            return
        }

        this.props.pipelineImport(data)
      })
    }
  }

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    const tools = (
      <React.Fragment>
        <Tooltip title="Create new pipeline">
          <IconButton onClick={() => this.props.pipelineDuplicate()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Upload a pipeline">
          <IconButton onClick={() => this.pipelineUpload()}>
            <UploadIcon />
          </IconButton>
        </Tooltip>
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
                  <Grid item key={pipeline.get('id')}>
                    <PipelineCard pipeline={pipeline} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
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
  pipelines: state.main.getIn(['config', 'pipelines']),
})

const mapDispatchToProps = {
  pipelineDuplicate,
  pipelineImport,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage)))
