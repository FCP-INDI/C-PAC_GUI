import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'


import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'

import classNames from 'clsx'
import { withStyles, typography } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Paper, Modal, Dialog } from '@material-ui/core'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import Slide from '@material-ui/core/Slide'
import Switch from '@material-ui/core/Switch'

import Help from 'components/Help'
import ItWentWrong from 'containers/ItWentWrong'
import CpacpySchedulersWidget from 'containers/CpacpySchedulersWidget'

import CpacpySchedulerSelector from 'containers/cpacpy/SchedulerSelector'

import { configLoad } from '../actions/main'
import { selectCurrentScheduler } from '../actions/cpacpy'

import theme from '../theme'
import '../app.global.css'

import { MuiThemeProvider } from '@material-ui/core/styles'
import MathJax from 'react-mathjax'

import {
  HomeIcon,
  DeleteIcon,
  NextIcon,
  PipelineIcon,
  ExecutionIcon,
  EnvironmentIcon,
  ProjectIcon,
  ProjectOpenIcon,
  AdvancedConfigIcon,
  FeedbackIcon,
} from 'components/icons';

import Logo from 'resources/logo.png'


let ErrorBoundary = ({ children }) => children
if (process.env.NODE_ENV === 'production') {
  const bugsnagClient = bugsnag('ed924a7990f8305f7bb59bc050b92239')
  bugsnagClient.use(bugsnagReact, React)
  ErrorBoundary = bugsnagClient.getPlugin('react')
}


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
      flexGrow: 0,
    },
    crumbs: {
      flexGrow: 1,
    },
    content: {
      overflow: 'auto',
      padding: theme.spacing(),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
    },

    icon: {
      marginRight: theme.spacing(),
    },
    singleIcon: {
      marginRight: 0,
    },
    feedback: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    selectorButton: {
      padding: theme.spacing(2),
    },
  })

  static mapDispatchToProps = {
    configLoad,
    selectCurrentScheduler,
  }
  
  static mapStateToProps = (state) => ({
    configLoaded: !!(state.main && state.main.get('config')),
  })

  state = {
    feedback: false
  }
  
  constructor(props) {
    super(props);
    this.app = React.createRef()
  }

  componentDidMount() {
    this.props.configLoad()
  }
  
  handleWipe = (e) => {
    localStorage.clear()
    window.location.href = '/'
  }

  handleScheduler = (scheduler) => {
    this.props.selectCurrentScheduler(scheduler)
  }

  renderBreadcrumbs = () => {
    const { classes, configLoaded } = this.props

    if (!configLoaded) {
      return null
    }

    const crumbs = []
    // const place = this.props.location.pathname.substr(1).split('/')
    // for (let i = 0; i < place.length; i++) {
    //   if (place[i] == "pipelines") {

    //     if (i + 1 < place.length) {
    //       pipeline = config.get('pipelines').find((p) => p.get('id') == place[++i])
    //     }

    //     crumbs.push(
    //       <NextIcon key={crumbs.length} />
    //     )
    //     crumbs.push(
    //       <Button key={crumbs.length} size="small">
    //         <PipelineIcon className={classes.icon} />
    //         { pipeline ? pipeline.get('name') : "Pipelines" }
    //       </Button>
    //     )
    //   }
    // }

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
          <CpacpySchedulerSelector
            buttonProps={{
              variant: 'contained',
              className: classes.selectorButton,
            }}
            onSelect={this.handleScheduler}
          />

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
    const { classes, theme, main, forwardedRef, configLoaded } = this.props

    const node = this.app.current
    if (node) {
      node.scrollTop = 0
      node.scrollLeft = 0
    }

    return (
      <MathJax.Provider>
        <div className={classes.app}>
          <header id="root-header" className={classes.header}>
            <Link to={`/`}>
              <img src={Logo} />
            </Link>
            <div className={classes.headerFiller}></div>
            {
              process.env.NODE_ENV === 'development' ? 
              <Button onClick={this.handleWipe}><DeleteIcon /></Button> :
              null
            }
            <Button onClick={this.handleFeedbackOpen}><FeedbackIcon /></Button>
            <Modal open={this.state.feedback} onClose={this.handleFeedbackClose}>
              <div className={classes.feedback}>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf4nQovBTrPnJ7yx5fCI47MKHIaxsOq149KS1rlg8WG066zbQ/viewform?embedded=true" width="640" height="610" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
              </div>
            </Modal>
          </header>

          <div className={classes.root}>
            { this.renderBreadcrumbs() }
            <main className={classes.content} ref={this.app}>
              <ErrorBoundary FallbackComponent={ItWentWrong}>
                { configLoaded ? this.props.children : "Loading..." }
              </ErrorBoundary>
            </main>
          </div>
        </div>
      </MathJax.Provider>
    );
  }
}

const AppConnected = 
  connect(App.mapStateToProps, App.mapDispatchToProps)(
    withStyles(App.styles, { withTheme: true })(
      App
    )
  )

class Shell extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppConnected {...this.props} />
      </MuiThemeProvider>
    )
  }
}

export default withRouter(Shell)