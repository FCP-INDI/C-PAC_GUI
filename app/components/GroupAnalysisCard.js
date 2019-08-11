import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import {
  GroupIcon,
  NavigateNextIcon,
  DuplicateIcon,
} from './icons'


class GroupAnalysisCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
    },
    expand: {
      marginLeft: 'auto',
    },
    action: {
    },
    avatar: {
    },
    info: {
      padding: 0
    },

    featDisabled: { opacity: 0.5 },
    featEnabled: { opacity: 1.0 },
  })

  handleOpen = (pipeline) => {
    this.props.history.push(`/pipelines/${pipeline}`)
  }

  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <GroupIcon />
            </Avatar>
          }
          title={'FEAT'}
          subheader={`C-PAC ${version.get('version')}`}
        />
        <CardContent className={classes.info}>
        </CardContent>
        <CardActions className={classes.actions}>
          <Tooltip title="Duplicate">
            <IconButton>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(withStyles(GroupAnalysisCard.styles)(GroupAnalysisCard))
