import electron from 'electron'
import fs from 'fs'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import PipelineCard from '../components/PipelineCard'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from 'components/Tooltip'

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

class PipelineListTools extends Component {

  static styles = theme => ({
  })

  importPipeline = () => {
    const configs = electron.remote.dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'YAML configs', extensions: ['yml', 'yaml'] },
      ]
    })
    if (!configs) {
      return
    }
    for (let f of configs) {
      const content = fs.readFileSync(f, 'utf-8')
      this.props.pipelineImport(content)
    }
  }

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <>
        <Tooltip title="Create new pipeline">
          <IconButton onClick={() => this.props.pipelineDuplicate()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Upload a pipeline">
          <IconButton onClick={() => this.importPipeline()}>
            <UploadIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  pipelineDuplicate,
  pipelineImport,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelineListTools.styles)(PipelineListTools)))
