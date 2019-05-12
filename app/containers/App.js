import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { configLoad, settingsUpdate } from '../actions/main'

import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'

import classNames from 'classnames';
import { withStyles, typography } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Paper, Modal, Dialog } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';

import Help from 'components/Help'
import ItWentWrong from 'containers/ItWentWrong'

import {
  HomeIcon,
  NextIcon,
  PipelineIcon,
  SubjectIcon,
  RunIcon,
  EnvironmentIcon,
  ProjectIcon,
  ProjectOpenIcon,
  AdvancedConfigIcon,
  FeedbackIcon,
} from 'components/icons';

import Logo from 'resources/logo.png'


const bugsnagClient = bugsnag('ed924a7990f8305f7bb59bc050b92239')
bugsnagClient.use(bugsnagReact, React)

const ErrorBoundary = bugsnagClient.getPlugin('react')


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
    headerFiller: {
      flexGrow: 1,
    },
    root: {
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },

    bread: {
      flexShrink: 0,
    },
    crumbs: {
      flexGrow: 1,
    },
    content: {
      overflow: 'auto',
      padding: theme.spacing.unit,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing.unit * 3,
      },
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
    },

    icon: {
      marginRight: theme.spacing.unit,
    },
    singleIcon: {
      marginRight: 0,
    },
    feedback: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  })

  state = {
    feedback: false
  }

  componentDidMount() {
    this.props.configLoad()
  }

  handleSettingsAdvanced = (e) => {
    this.props.settingsUpdate(
      this.props.main.getIn(['config', 'settings']).set('advanced', e.target.checked)
    )
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
        // component={Link} to={`/pipelines/${ pipeline ? pipeline.get('id') : '' }`}
        crumbs.push(
          <Button key={crumbs.length} size="small">
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
          <div className={classes.crumbs}>
          </div>
          <AdvancedConfigIcon color={ config.getIn(['settings', 'advanced']) ? "secondary": "disabled" } />
          <Switch
            checked={config.getIn(['settings', 'advanced'])}
            onChange={this.handleSettingsAdvanced}
            color="primary"
          />
          <Help help={`Enable advanced options.`} style={{ padding: 0 }} />
        </Toolbar>
      </AppBar>
    )
  };

  handleFeedbackOpen = () => {
    this.setState({ feedback: true })
  }

  handleFeedbackClose = () => {
    this.setState({ feedback: false })
  }

  render() {
    const { classes, theme, main } = this.props

    return (
      <div className={classes.app}>
        <header id="root-header" className={classes.header}>
          <Link to={`/`}>
            <img src={Logo} />
          </Link>
          <div className={classes.headerFiller}></div>
          <Button onClick={this.handleFeedbackOpen}><FeedbackIcon /></Button>
          <Modal open={this.state.feedback} onClose={this.handleFeedbackClose}>
            <div className={classes.feedback}>
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf4nQovBTrPnJ7yx5fCI47MKHIaxsOq149KS1rlg8WG066zbQ/viewform?embedded=true" width="640" height="610" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
            </div>
          </Modal>
        </header>

        <div className={classes.root}>
          { this.renderBreadcrumbs() }
          <main className={classes.content}>
            <ErrorBoundary FallbackComponent={ItWentWrong}>
              { main.has('config') ? this.props.children : "Loading..." }
            </ErrorBoundary>
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
  settingsUpdate,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  withStyles(App.styles, { withTheme: true })(App)))
