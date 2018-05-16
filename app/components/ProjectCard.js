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
import blue from 'material-ui/colors/blue'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'

import {
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
    const { classes, raised = false, projects: { [this.props.id]: project } } = this.props

    return (
      <Card className={classes.card} raised={raised}>
        <CardHeader
          avatar={
            <Avatar aria-label={project.name} className={classes.avatar}>{project.name[0]}</Avatar>
          }
          title={project.name}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <PipelineIcon />
              </ListItemIcon>
              <ListItemText primary={`${project.summary.pipelines} pipelines`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary={`${project.summary.subjects} subjects`} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {/* <SettingsIcon /> */}
          <IconButton className={classes.expand} onClick={() => this.handleOpen(project.id)}>
            {/* <LaunchIcon /> */}
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.main.config.projects,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(withStyles(ProjectCard.styles)(ProjectCard))
)
