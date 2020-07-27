import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

class Content extends Component {
  static styles = theme => ({
    paper: {
      padding: 20,
    }
  })

  render() {

    const { flex = false } = this.props

    return (
      <Paper className={this.props.classes.paper} style={{ display: flex ? 'flex' : null }} elevation={1}>
        { this.props.children }
      </Paper>
    )
  }
}

export default withStyles(Content.styles)(Content)
