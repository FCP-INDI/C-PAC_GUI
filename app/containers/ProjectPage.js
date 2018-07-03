import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import Content from '../components/Content';
import Header, { HeaderText, HeaderAvatar } from '../components/Header';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon
} from '../components/icons';

class ProjectPage extends Component {

  static styles = theme => ({
    project: {
      display: 'flex',
    },
    pipelines: {
      flex: 1
    },
    subjects: {
      flex: 1
    },
    actions: {
      justifyContent: 'flex-end'
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      // backgroundColor: red[500],
    },
  });

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, project } = this.props;

    return (
      <div>
        <Header>
          <HeaderAvatar>{project.name[0]}</HeaderAvatar>
          <HeaderText>
            { project.name }
          </HeaderText>
        </Header>
        <Content>
          <Grid className={classes.project} container spacing={8} alignContent="center">
            <Grid item sm={6} className={classes.pipelines}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      <SubjectIcon />
                    </Avatar>
                  }
                  // action={
                  //   <IconButton>
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title="Subjects"
                  // subheader="September 14, 2016"
                />
                <CardContent>
                  <Typography component="p">
                    Nº of subjects: { project.summary.subjects }
                  </Typography>
                  <Typography component="p">
                    <strong>&lt; Summary info here &gt;</strong>
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <IconButton component={Link} to={`/projects/${project.id}/subjects`}>
                    <NavigateNextIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph variant="body2">
                      Info:
                    </Typography>
                    <Typography paragraph>
                      yada yada
                      <strong>&lt; more info here &gt;</strong>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item sm={6} className={classes.subjects}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      <PipelineIcon />
                    </Avatar>
                  }
                  title="Pipelines"
                />
                <CardContent>
                  <Typography component="p">
                    Number of steps
                  </Typography>
                  <Typography component="p">
                    Estimated time
                  </Typography>
                  <Typography component="p">
                    Generated Derivatives
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton component={Link} to={`/projects/${project.id}/pipelines`}>
                    <NavigateNextIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { project } } } = props
  return { project: state.main.config.projects[project] }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectPage.styles)(ProjectPage));
