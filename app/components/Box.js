import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


class Box extends Component {

  static styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    header: {
      height: ({ inner }) => inner ? null : 88,
      padding: ({ inner }) => inner ? 10 : 20,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      background: ({ inner }) => inner ? theme.palette.primary.light : theme.palette.primary.main,
    },
    headerText: {
      color: theme.palette.grey[800],
      padding: `0 ${theme.spacing(2)}px`,
      flexGrow: 1
    },
    headerAvatar: {
      background: theme.palette.common.white,
      color: theme.palette.grey[700],
    },
    headerTools: {

    },
    content: {
      padding: 20,
      flexGrow: 1
    }
  })

  render() {
    const { classes, className, avatar, title, tools, inner } = this.props
    let { headerVariant } = this.props

    if (!headerVariant) {
      headerVariant = inner ? 'h6' : 'h5'
    }

    return (
      <div className={clsx(classes.root, className)}>
        <Paper elevation={1}>
          <div className={classes.header}>
            {
              avatar ?
              <Avatar className={classes.headerAvatar}>
                { avatar }
              </Avatar>:
              null
            }
            {
              title ?
              <Typography variant={headerVariant} className={classes.headerText}>{ title }</Typography> :
              null
            }
            {
              tools ?
              <div className={classes.headerTools}>{ tools }</div> :
              null
            }
          </div>
        </Paper>
        <Paper className={classes.content} elevation={1}>
          { this.props.children }
        </Paper>
      </div>
    )
  }
}

export default withStyles(Box.styles)(Box)
