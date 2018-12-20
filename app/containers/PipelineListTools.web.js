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

class PipelineListTools extends Component {

  static styles = theme => ({
    title: {
      marginBottom: 10
    },
    paper: {
      margin: 0,
      padding: 20,
      flexGrow: 1,
    },
    upload: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 2,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    },
    uploadArea: {
      border: '3px dashed ' + theme.palette.primary.main,
      borderRadius: 10,
    },
    uploadAreaPicker: {
      cursor: 'pointer',
      padding: '40px 20px',
      display: 'block',
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

  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <React.Fragment>
        <input type="file" id="pipeline" style={{display: 'none'}} onChange={this.handleSelectPipeline} />
        <Tooltip title="Create new pipeline">
          <IconButton onClick={() => this.props.pipelineDuplicate()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Upload a pipeline">
          <IconButton htmlFor="pipeline" component="label">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelineListTools.styles)(PipelineListTools)))
