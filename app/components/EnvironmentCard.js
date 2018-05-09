import React, { Component } from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import Popover from 'material-ui/Popover';
import Collapse from 'material-ui/transitions/Collapse';
import blue from 'material-ui/colors/blue';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';

import {
  PipelineIcon,
  RemoveIcon
} from '../components/icons';

class EnvironmentCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 200,
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
    const { classes } = this.props;

    const {
      details,
    } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Docker" className={classes.avatar}>D</Avatar>
          }
          title="My Docker Environment"
          subheader="Docker"
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
                <ListItemText primary="Pipeline test_pipeline.yaml" secondary="ABIDE" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={50}
                />
                <ListItemText primary="Pipeline test_pipeline.yaml" secondary="ADHD" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={70}
                />
                <ListItemText primary="Pipeline test_pipeline.yaml" secondary="ABIDE" />
              </ListItem>
              <ListItem dense button>
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={50}
                />
                <ListItemText primary="Pipeline test_pipeline.yaml" secondary="ADHD" />
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
