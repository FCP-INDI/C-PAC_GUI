// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import blue from 'material-ui/colors/blue';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import DeviceHub from 'material-ui-icons/DeviceHub';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import LaunchIcon from 'material-ui-icons/Launch';

type Props = {};

class ProjectCard extends Component<Props> {

  static styles = theme => ({
    card: {
    },
    actions: {
      display: 'flex',
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
  });

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label={this.props.name} className={classes.avatar}>{this.props.name[0]}</Avatar>
          }
          title={this.props.name}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem>
              <ListItemIcon>
                <DeviceHub />
              </ListItemIcon>
              <ListItemText primary="4 pipelines" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="1350 subjects" />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Open project" className={classes.expand}>
            <LaunchIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectCard.styles)(ProjectCard));