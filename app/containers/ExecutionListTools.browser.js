import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

class ExecutionListTools extends Component {

  static styles = theme => ({
  })

  render() {
    return (null)
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(ExecutionListTools.styles)(ExecutionListTools)))
