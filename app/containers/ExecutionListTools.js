import React, { Component, forwardRef } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import {
  AddIcon,
} from '../components/icons'
class DatasetListTools extends Component {

  static styles = theme => ({
  })

  render() {
    const { classes } = this.props

    return (
      <>
        <Tooltip title="New execution">
          <Link to={`/executions/new`} component={forwardRef(({ children, href }, forwardedRef) => <IconButton ref={forwardedRef} href={href} children={children} />)}>
            <AddIcon />
          </Link>
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
    (withStyles(DatasetListTools.styles)
      (DatasetListTools)))
