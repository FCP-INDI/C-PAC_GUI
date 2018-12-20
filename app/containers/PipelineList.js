import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import PipelineCard from '../components/PipelineCard'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

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

class PipelineList extends Component {

  static styles = theme => ({
  })

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <Grid container spacing={8}>
        {
          pipelines && pipelines.map((pipeline) => (
            <Grid item key={pipeline.get('id')}>
              <PipelineCard pipeline={pipeline} />
            </Grid>
          ))
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelineList.styles)(PipelineList)))
