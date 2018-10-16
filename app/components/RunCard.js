import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';

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
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import yellow from '@material-ui/core/colors/yellow'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import Tooltip from '@material-ui/core/Tooltip'

import {
  EnvironmentIcon,
  PipelineIcon,
  SubjectIcon,
  RunIcon,
  RunPausedIcon,
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
      minWidth: 400,
      maxWidth: 400
    },
    alert: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      margin: 10,
      backgroundColor: yellow[200]
    },
    actions: {
      display: 'flex',
      paddingLeft: 20,
      justifyContent: 'flex-end'
    },
    action: {
    },
    avatar: {
    },
    info: {
      padding: 0
    }
  })

  render() {
    const { classes, raised = false, project, run } = this.props

    const subjects = project.subjects.subsets.find((ss) => ss.id == run.subjects.id)

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
            <Avatar className={classes.avatar} style={{
              backgroundColor: run.status == 'success' ? green[500] : grey[500],
            }}>
              { run.status == 'success' ? <RunIcon /> : <RunPausedIcon /> }
            </Avatar>
          }
          title={`Run at ${new Date(run.summary.time.start).toLocaleString()}`}
        />
        <CardContent className={classes.info}>

          { run.status == 'paused' ?
          <Paper className={classes.alert} elevation={1}>
            <Typography variant="h6" component="h3">
              This pipeline is currently paused
            </Typography>
            <Typography component="p">
              Please verify the outputs for quality control and press Continue to resume the operations.
            </Typography>
          </Paper> : null }

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
              <ListItemText primary={`Ned @ CMI`} secondary={`CPAC API`} />
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
              <ListItemText primary={`Pipeline low pass filter`} secondary={`34 steps`} />
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
              <ListItemText primary={subjects.description} secondary={`${subjects.subjects.length} from subset`} />
              <ListItemSecondaryAction>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>

          <Tooltip title="Open Outputs" placement="top">
            <IconButton className={classes.action}>
              <BrainIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Open Logs" placement="top">
            <IconButton className={classes.action}>
              <LogIcon />
            </IconButton>
          </Tooltip>
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
