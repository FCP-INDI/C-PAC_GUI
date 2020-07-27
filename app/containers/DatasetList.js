import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import DatasetCard from '../components/DatasetCard'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {
  DatasetIcon,
  PipelineIcon,
  AddIcon,
  HelpIcon,
  UploadIcon,
} from '../components/icons'

class DatasetList extends Component {

  static styles = theme => ({
  })

  state = {
  }

  render() {
    const { classes, datasets } = this.props

    return (
      <>
        <Grid container>
          {
            datasets && datasets.map((dataset) => (
              <Grid item key={dataset.get('id')}>
                <DatasetCard dataset={dataset} />
              </Grid>
            ))
          }
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  datasets: state.dataset.getIn(['datasets']),
})

const mapDispatchToProps = {
}

export default
  withRouter(connect(mapStateToProps, mapDispatchToProps)
    (withStyles(DatasetList.styles)
      (DatasetList)))
