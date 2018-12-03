import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { configLoad } from '../actions/main'

import classNames from 'classnames';
import { withStyles, typography } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

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
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },

    header: {
      display: 'flex',
      flexShrink: 0,
    },
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },

    bread: {
      flexShrink: 0,
    },
    content: {
      overflow: 'auto',
      padding: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
    },

    icon: {
      marginRight: theme.spacing.unit,
    },
    singleIcon: {
      marginRight: 0,
    },

  });

  componentDidMount() {
    this.props.configLoad()
  }

  renderBreadcrumbs = () => {
    const { classes } = this.props

    if (!this.props.main || !this.props.main.get('config')) {
      return null
    }

    const config = this.props.main.get('config')

    let project = null
    let pipeline = null

    const place = this.props.location.pathname.substr(1).split('/')
    const crumbs = []
    for (let i = 0; i < place.length; i++) {
      // if (place[i] == "projects") {
      //   if (i + 1 < place.length) {
      //     project = config.projects[place[++i]]
      //   }

      //   crumbs.push(
      //     <NextIcon key={crumbs.length} />
      //   )
      //   crumbs.push(
      //     <Button key={crumbs.length} size="small" component={Link} to={`/projects/${project ? project.id : ''}`}>
      //       <ProjectIcon className={classes.icon} />
      //       { project ? project.name : "Projects" }
      //     </Button>
      //   )
      // }
      if (place[i] == "pipelines") {

        if (i + 1 < place.length) {
          pipeline = config.get('pipelines').find((p) => p.get('id') == place[++i])
        }

        crumbs.push(
          <NextIcon key={crumbs.length} />
        )
        crumbs.push(
          <Button key={crumbs.length} size="small" component={Link} to={`/pipelines/${ pipeline ? pipeline.get('id') : '' }`}>
            <PipelineIcon className={classes.icon} />
            { pipeline ? pipeline.get('name') : "Pipelines" }
          </Button>
        )
      }
    }

    return (
      <AppBar position="static" color="default" className={classes.bread}>
        <Toolbar>
          <Button size="small" component={Link} to={`/`}>
            <HomeIcon className={classes.icon} />
            Home
          </Button>
          { crumbs }
        </Toolbar>
      </AppBar>
    )
  };

  render() {
    const { classes, theme, main } = this.props

    return (
      <div className={classes.app}>
        <header id="root-header" className={classes.header}>
          <Link to={`/`}>
            <img src={Logo} />
          </Link>
        </header>

        <div className={classes.root}>

          { this.renderBreadcrumbs() }

          <main className={classes.content}>
            { main.has('config') ? this.props.children : "Loading..." }
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
