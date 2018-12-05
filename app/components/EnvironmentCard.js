import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import { withStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import Collapse from '@material-ui/core/Collapse';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import { CircularProgress } from '@material-ui/core';

import {
  PipelineIcon,
  RemoveIcon,

  EnvAwsIcon,
  EnvLocalIcon,
  EnvApiIcon,
  EnvSshIcon,
  EnvDockerIcon,
} from '../components/icons';

class EnvironmentCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 300,
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
    details: {
      padding: 10
    }
  });

  static types = {
    local: { name: 'Local', icon: EnvLocalIcon },
    docker: { name: 'Docker', icon: EnvDockerIcon },
    ssh: { name: 'SSH', icon: EnvSshIcon },
    server: { name: 'CPAC API', icon: EnvApiIcon },
    aws: { name: 'AWS', icon: EnvAwsIcon },
  }

  state = { expanded: false, details: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClickButton = () => {
    this.setState({
      details: true,
    });
  };

  handleClose = () => {
    this.setState({
      details: false,
    });
  };

  render() {
    const { classes, name, type } = this.props;

    const {
      details,
    } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label={EnvironmentCard.types[type].name} className={classes.avatar}>
              { React.createElement(EnvironmentCard.types[type].icon) }
            </Avatar>
          }
          title={name}
          subheader={EnvironmentCard.types[type].name}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <Popover
            open={details}
            anchorEl={this.anchorEl}
            anchorReference={'anchorEl'}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            classes={{
              paper: classes.details
            }}
          >
            <List>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={70}
                />
                <ListItemText primary="Pipeline test" secondary="ABIDE" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={50}
                />
                <ListItemText primary="Pipeline VMHC" secondary="ADHD" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={70}
                />
                <ListItemText primary="Pipeline low pass filter" secondary="ABIDE" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={50}
                />
                <ListItemText primary="Pipeline only anat" secondary="ADHD" />
              </ListItem>
            </List>
          </Popover>
          <IconButton
            onClick={this.handleClickButton}
            buttonRef={node => { this.anchorEl = node; }}
            aria-label="4 Pipelines Running"
          >
            <Badge badgeContent={4} color="primary">
              <PipelineIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="Remove" className={classes.expand}>
            <RemoveIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(EnvironmentCard.styles)(EnvironmentCard));
