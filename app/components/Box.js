import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


class Box extends Component {

  static styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: 20,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      background: theme.palette.primary.main,
    },
    headerText: {
      padding: `0 ${theme.spacing.unit * 2}px`,
      flexGrow: 1
    },
    headerAvatar: {
      background: "#FFF",
      color: "#666"
    },
    headerTools: {

    },
    content: {
      padding: 20,
      flexGrow: 1
    }
  });

  render() {
    const { classes, className, avatar, title, tools, headerVariant = 'h5' } = this.props;

    return (
      <div className={classnames(classes.root, className)}>
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
    );
  }
}

export default withStyles(Box.styles)(Box)
