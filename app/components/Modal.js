import React, { Component } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'
import { default as MuiModal } from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Box from 'components/Box'


class Modal extends Component {

  static styles = theme => ({
    paper: {
      position: 'absolute',
      width: '80vw',
      maxHeight: '90vh',
      [theme.breakpoints.down('sm')]: {
        width: '95vw',
        maxHeight: '100vh',
      },
      padding: theme.spacing(1),
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      display: 'flex',
      '& > *': {
        flexGrow: 1,
      }
    },
    content: {
      overflow: 'auto'
    }
  });

  render() {
    const { classes, open, onClose, title, avatar, children, style, inner=false } = this.props

    return (
      <MuiModal
        disableAutoFocus
        disableEnforceFocus
        open={open}
        onClose={onClose}
      >
        <Paper className={classes.paper} style={style}>
          <Box
            title={title}
            avatar={avatar}
            inner={inner}
            classes={{
              content: classes.content
            }}
          >
            { children }
          </Box>
        </Paper>
      </MuiModal>
    )
  }
}

export default 
  withStyles(Modal.styles)(
    Modal
  )
