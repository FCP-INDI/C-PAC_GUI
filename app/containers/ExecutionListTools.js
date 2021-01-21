import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from 'components/Tooltip'

import {
  AddIcon,
  NavigateNextIcon,
} from '../components/icons'
class ExecutionListTools extends Component {

  static styles = theme => ({
  })

  handleNew = (pipeline) => {
    this.props.history.push(`/executions/new`)
  }

  handleList = (pipeline) => {
    this.props.history.push(`/executions`)
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <Tooltip title="New execution">
          <IconButton onClick={() => this.handleNew()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Executions">
          <IconButton onClick={() => this.handleList()}>
            <NavigateNextIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default 
  withRouter(connect(mapStateToProps, mapDispatchToProps)
    (withStyles(ExecutionListTools.styles)
      (ExecutionListTools)))
