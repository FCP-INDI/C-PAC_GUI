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

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import {
  PipelineIcon,
  AddIcon,
  HelpIcon,
  UploadIcon,
} from '../components/icons'

import {
} from '../actions/pipeline'

class GroupAnalysisList extends Component {

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
    const { classes } = this.props

    return (
      <React.Fragment>
        <Dialog
          open={this.state.openDeleteConfirm}
          onClose={this.handleClose}
        >
          <DialogTitle>Are you sure to delete this group analysis?</DialogTitle>
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
              <Grid key={pipeline.get('id')}>
                <PipelineCard onDelete={this.handleClickOpen} onDuplicate={this.handleDuplicate} pipeline={pipeline} />
              </Grid>
            ))
          }
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  // pipelines: state.main.getIn(['config', 'pipelines']),
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(GroupAnalysisList.styles)(GroupAnalysisList))
