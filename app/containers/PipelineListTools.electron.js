import electron from 'electron'
import fs from 'fs'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@mui/styles'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import PipelineCard from '../components/PipelineCard'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  pipelineDuplicate,
  pipelineImport,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelineListTools.styles)(PipelineListTools))
