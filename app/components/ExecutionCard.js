import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import blue from '@material-ui/core/colors/blue'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import {
  ExecutionIcon,
  NavigateNextIcon,
  SchedulerStatusIcon,
  ExecutionCurrentStatusIcon,
} from './icons'

import format from '../utils/format'

class ExecutionCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    expand: {
      marginLeft: 'auto',
    },
    avatar: {
    },
    info: {
      padding: 0
    }
  })

  handleOpen = (dataset) => {
    this.props.history.push(`/executions/${dataset}`)
  }

  render() {
    const { classes, raised = false, execution } = this.props

    const labels = {
      running: 'Running',
      success: 'Success',
      failure: 'Failure',
      [null]: 'Unknown',
      [undefined]: 'Unknown',
      unknown: 'Unknown'
    }

    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <ExecutionCurrentStatusIcon status={execution.get('status')} />
            </Avatar>
          }
          title={execution.get('note')}
          subheader={`Start at ${format(execution.get('start'))}`}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <SchedulerStatusIcon />
              </ListItemIcon>
              <ListItemText primary={`${labels[execution.get('status')]}`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={classes.expand} onClick={() => this.handleOpen(execution.get('id'))}>
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default 
  withRouter(
    withStyles(ExecutionCard.styles)
      (ExecutionCard))
