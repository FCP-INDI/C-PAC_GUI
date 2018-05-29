import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import classnames from 'classnames'
import { withStyles } from 'material-ui/styles'

import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import green from 'material-ui/colors/green'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'

import {
  EnvironmentIcon,
  PipelineIcon,
  SubjectIcon,
  RunIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon,
  TimerIcon,
  LogIcon,
  BrainIcon
} from './icons';

class RunCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
      paddingLeft: 20,
      justifyContent: 'flex-end'
    },
    action: {
    },
    avatar: {
      backgroundColor: green[500],
    },
    info: {
      padding: 0
    }
  })

  render() {
    const { classes, raised = false, project, run } = this.props

    var sec_num = run.summary.time.total
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)

    if (hours   < 10) { hours   = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    const time = hours + ':' + minutes + ':' + seconds


    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <RunIcon />
            </Avatar>
          }
          title={`Run at ${new Date(run.summary.time.start).toLocaleString()}`}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <TimerIcon />
              </ListItemIcon>
              <ListItemText primary={`${time}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EnvironmentIcon />
              </ListItemIcon>
              <ListItemText primary={`Docker @ Dozer`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PipelineIcon />
              </ListItemIcon>
              <ListItemText primary={`Pipeline`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary={`364 from subset`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton title="Outputs" className={classes.action}>
            <BrainIcon />
          </IconButton>
          <IconButton title="Logs" className={classes.action}>
            <LogIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(RunCard.styles)(RunCard))
)
