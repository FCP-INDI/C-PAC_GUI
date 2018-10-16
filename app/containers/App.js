import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { configLoad } from '../actions/main'

import classNames from 'classnames';
import { withStyles, typography } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Paper } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Slide from '@material-ui/core/Slide';

import {
  HomeIcon,
  NextIcon,
  PipelineIcon,
  SubjectIcon,
  RunIcon,
  EnvironmentIcon,
  ProjectIcon,
  ProjectOpenIcon,
} from '../components/icons';

import Logo from '../resources/logo.png'


class App extends React.Component {

  static styles = (theme) => ({
    app: {
      position: 'relative',
      height: '100vh'
    },
    header: {

    },
    root: {
      position: 'relative',
      height: '100vh'
    },

    content: {
      overflow: 'auto',
      padding: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.default,
    }
  });

  componentDidMount() {
    this.props.configLoad()
  }

  renderBreadcrumbs = () => {

    if (!this.props.main || !this.props.main.config) {
      return null
    }

    const config = this.props.main.config

    let project = null
    let pipeline = null

    const place = this.props.location.pathname.substr(1).split('/')
    const crumbs = []
    for (let i = 0; i < place.length; i++) {
      if (place[i] == "projects") {
        if (i + 1 < place.length) {
          project = config.projects[place[++i]]
        }

        crumbs.push(
          <IconButton aria-label="Project" key="project">
            <ProjectIcon /> { project ? project.name : null }
          </IconButton>
        )
      }
      if (place[i] == "pipelines") {
        if (i + 1 < place.length) {
          pipeline = project.pipelines.find((p) => p.id == place[++i])
        }

        crumbs.push(
          <IconButton aria-label="Pipeline" key="pipeline">
            <PipelineIcon /> { pipeline ? pipeline.name : null }
          </IconButton>
        )
      }
    }

    return (
        <AppBar position="static" color="default">
        <Toolbar>
          <IconButton aria-label="Home">
            <HomeIcon /> Home
          </IconButton>
          { crumbs }
        </Toolbar>
      </AppBar>
    )
  };

  render() {
    const { project, config: { environments = [] } = {} } = this.props.main
    const { classes, theme } = this.props

    return (
      <div className={classes.app}>
        <header id="root-header" className={classes.header}>
          <Link to={`/`}>
            <img src={Logo} />
          </Link>
        </header>

        <div className={classes.root}>

          {this.renderBreadcrumbs()}

          <main className={classes.content}>
            {
              environments.length === 0 ?
              null :
              this.props.children
            }
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
  configLoad,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  withStyles(App.styles, { withTheme: true })(App)))
