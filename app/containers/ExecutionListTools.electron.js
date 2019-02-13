import electron from 'electron'
import fs from 'fs'

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


class ExecutionListTools extends Component {

  static styles = theme => ({
  })

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <React.Fragment>
        <Tooltip title="Execute a pipeline">
          <IconButton onClick={() => { return }}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(ExecutionListTools.styles)(ExecutionListTools)))
