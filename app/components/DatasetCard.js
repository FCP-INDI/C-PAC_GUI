import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import clsx from 'clsx'
import { withStyles } from '@material-ui/core'

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
  DatasetIcon,
  FormatIcon,
  ParticipantIcon,
  PipelineIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon
} from './icons'

class DatasetCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
      paddingLeft: 20,
    },
    expand: {
      marginLeft: 'auto',
    },
    avatar: {
      backgroundColor: blue[500],
    },
    info: {
      padding: 0
    }
  })

  handleOpen = (dataset) => {
    this.props.history.push(`/datasets/${dataset}`)
  }

  render() {
    const { classes, raised = false, dataset } = this.props

    const labels = {
      bids: 'BIDS',
      custom: 'Custom'
    }

    const version = dataset.get('versions').keySeq().max()
    const configuration = dataset.getIn(['versions', version, 'configuration'])

    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar aria-label={dataset.get('name')} className={classes.avatar}><DatasetIcon /></Avatar>
          }
          title={dataset.get('name')}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <FormatIcon />
              </ListItemIcon>
              <ListItemText primary={`${labels[configuration.getIn(['format'])]}`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions}>
          <IconButton className={classes.expand} onClick={() => this.handleOpen(dataset.get('id'))}>
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(withStyles(DatasetCard.styles)(DatasetCard))
