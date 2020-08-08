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
import Tooltip from 'components/Tooltip'

import {
  EnvironmentIcon,
  PipelineIcon,
  PipelineStepIcon,
  PipelineExecutionTimeIcon,
  ExecutionIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon,
  DeleteIcon,
  DuplicateIcon,
} from './icons'


class PipelineCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
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
    const { classes, pipeline } = this.props

    let versionId = '0'
    const versions = pipeline.get('versions')
    if (!versions.has("0")) {
      versionId = `${versions.keySeq().map(i => +i).max()}`
    }

    const version = versions.get(versionId)

    const functional = version.getIn(['configuration', 'functional', 'enabled'])

    let derivatives = version.getIn(['configuration', 'derivatives', 'enabled'])
    if (derivatives) {
      derivatives = version.getIn(['configuration', 'derivatives']).reduce(
        (total, value) => {
          // Ignore root flag 'enabled' under derivatives
          if (value.get) {
            return total + (value.get('enabled') ? 1 : 0)
          }
          return total
        },
        0
      )

      derivatives = derivatives ? derivatives : false
    } else {
      derivatives = 0
    }

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <PipelineIcon />
            </Avatar>
          }
          title={pipeline.get('name')}
          subheader={`C-PAC ${version.get('version')}`}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <PipelineStepIcon />
              </ListItemIcon>
              <ListItemText primary={`Anatomical`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PipelineStepIcon classes={{
                  root: functional ? classes.featEnabled : classes.featDisabled
                }} />
              </ListItemIcon>
              <ListItemText classes={{
                  root: functional ? classes.featEnabled : classes.featDisabled
                }}  primary={`Functional`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PipelineStepIcon classes={{
                root: derivatives ? classes.featEnabled : classes.featDisabled
              }}  />
              </ListItemIcon>
              <ListItemText classes={{
                root: derivatives ? classes.featEnabled : classes.featDisabled
              }}  primary={`${derivatives} derivative${derivatives != 1 ? 's' : ''}`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Duplicate">
            <IconButton onClick={() => this.props.onDuplicate(pipeline.get('id'))}>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>

          { pipeline.get('id') != 'default' ?
            <Tooltip title="Delete">
              <IconButton onClick={() => this.props.onDelete(pipeline.get('id'))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            : null
          }

          <Tooltip title="Edit">
            <IconButton className={classes.expand} onClick={() => this.handleOpen(pipeline.get('id'))}>
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(withStyles(PipelineCard.styles)(PipelineCard))
