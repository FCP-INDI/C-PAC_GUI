import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from 'components/Tooltip'

import {
  AddIcon,
  UploadIcon,
} from '../components/icons'

// import {
//   pipelineDuplicate,
//   pipelineImport,
// } from '../actions/pipeline'

class DatasetListTools extends Component {

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
      width: theme.spacing(50),
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2),
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

  handleSelectDataset = (e) => {
    // var files = e.target.files
    // for (var i = 0, f; f = files[i]; i++) {
    //   var reader = new FileReader();
    //   reader.onload = ((theFile) => (e) => {
    //     this.props.pipelineImport(e.target.result)
    //   })(f)
    //   reader.readAsText(f)
    // }
    // e.target.value = ""
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <input type="file" id="dataset-upload" onChange={this.handleSelectDataset} style={{
          opacity: 0,
          position: 'absolute',
          zIndex: -1,
        }} />
        <Tooltip title="Create new dataset">
          <IconButton onClick={() => this.props.datasetDuplicate()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Upload a dataset">
          <IconButton component="label" htmlFor="dataset-upload">
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
  // pipelineDuplicate,
  // pipelineImport,
}

export default 
  withRouter(connect(mapStateToProps, mapDispatchToProps)
    (withStyles(DatasetListTools.styles)
      (DatasetListTools)))
