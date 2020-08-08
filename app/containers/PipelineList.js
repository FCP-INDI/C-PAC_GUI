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

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {
  PipelineIcon,
  AddIcon,
  HelpIcon,
  UploadIcon,
} from '../components/icons'

import {
  pipelineDuplicate,
  pipelineImport,
  pipelineDelete,
} from '../actions/pipeline'

class PipelineList extends Component {

  static styles = theme => ({
  })

  state = {
    openDeleteConfirm: false,
    pipelineToDelete: null,
  };

  handleClickOpen = (pipeline) => {
    this.setState({ openDeleteConfirm: true, pipelineToDelete: pipeline })
  }

  handleClose = () => {
    this.setState({ openDeleteConfirm: false, pipelineToDelete: null })
  }

  handleDeleteClose = () => {
    if (this.state.pipelineToDelete) {
      this.props.pipelineDelete(this.state.pipelineToDelete)
    }
    this.handleClose()
  }

  handleDuplicate = (pipeline) => {
    this.props.pipelineDuplicate(pipeline)
  }

  render() {
    const { classes, pipelines } = this.props

    return (
      <>
        <Dialog
          open={this.state.openDeleteConfirm}
          onClose={this.handleClose}
        >
          <DialogTitle>Are you sure to delete this pipeline?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This operation is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteClose} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container>
          {
            pipelines && pipelines.map((pipeline) => (
              <Grid item key={pipeline.get('id')}>
                <PipelineCard onDelete={this.handleClickOpen} onDuplicate={this.handleDuplicate} pipeline={pipeline} />
              </Grid>
            ))
          }
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  pipelines: state.main.getIn(['config', 'pipelines']),
})

const mapDispatchToProps = {
  pipelineDuplicate,
  pipelineImport,
  pipelineDelete,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelineList.styles)(PipelineList)))
