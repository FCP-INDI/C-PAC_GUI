import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import classnames from 'classnames'
import { withStyles } from '@material-ui/core'

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
import blue from '@material-ui/core/colors/blue'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import {
  ProjectIcon,
  PipelineIcon,
  SubjectIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon
} from './icons';

class ProjectCard extends Component {

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

  handleOpen = (project) => {
    this.props.history.push(`/projects/${project}`)
  }

  render() {
    const { classes, raised = false, project } = this.props

    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar aria-label={project.name} className={classes.avatar}><ProjectIcon /></Avatar>
          }
          title={project.name}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <PipelineIcon />
              </ListItemIcon>
              <ListItemText primary={`0 pipelines`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary={`0 subjects`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classes.expand} onClick={() => this.handleOpen(project.id)}>
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(withStyles(ProjectCard.styles)(ProjectCard))
