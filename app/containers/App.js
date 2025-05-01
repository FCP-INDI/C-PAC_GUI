import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { configLoad } from '../actions/main';

import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';

import { ThemeProvider, withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import MathJax from 'react-mathjax';
import {
  HomeIcon,
  DeleteIcon,
  NextIcon,
  PipelineIcon,
  FeedbackIcon,
} from 'components/icons';

import Logo from 'resources/logo.png';
import ItWentWrong from 'containers/ItWentWrong';
import theme from '../theme';
import '../app.global.css';

let ErrorBoundary = ({ children }) => children;
if (process.env.NODE_ENV === 'production') {
  Bugsnag.start({
    apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  });
  ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
}

const App = ({ classes, main, configLoad, children }) => {
  const [feedback, setFeedback] = useState(false);
  const location = useLocation();

  useEffect(() => {
    configLoad();
  }, [configLoad]);

  const handleWipe = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleFeedbackOpen = () => {
    setFeedback(true);
  };

  const handleFeedbackClose = () => {
    setFeedback(false);
  };

  const renderBreadcrumbs = () => {
    if (!main || !main.get('config')) {
      return null;
    }

    const config = main.get('config');
    let pipeline = null;
    const place = location.pathname.substr(1).split('/');
    const crumbs = [];

    for (let i = 0; i < place.length; i++) {
      if (place[i] === 'pipelines') {
        if (i + 1 < place.length) {
          pipeline = config.get('pipelines').find((p) => p.get('id') === place[++i]);
        }

        crumbs.push(<NextIcon key={crumbs.length} />);
        crumbs.push(
          <Button key={crumbs.length} size="small">
            <PipelineIcon className={classes.icon} />
            {pipeline ? pipeline.get('name') : 'Pipelines'}
          </Button>
        );
      }
    }

    return (
      <AppBar position="static" color="default" className={classes.bread}>
        <Toolbar>
          <Link to={`/`}>
            <Button size="small">
              <HomeIcon className={classes.icon} />
              Home
            </Button>
          </Link>
          {crumbs}
          <div className={classes.crumbs}></div>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <MathJax.Provider>
      <div className={classes.app}>
        <header id="root-header" className={classes.header}>
          <Link to={`/`}>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className={classes.headerFiller}></div>
          {process.env.NODE_ENV === 'development' && (
            <Button onClick={handleWipe}>
              <DeleteIcon />
            </Button>
          )}
          <Button onClick={handleFeedbackOpen}>
            <FeedbackIcon />
          </Button>
          <Modal open={feedback} onClose={handleFeedbackClose}>
            <div className={classes.feedback}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf4nQovBTrPnJ7yx5fCI47MKHIaxsOq149KS1rlg8WG066zbQ/viewform?embedded=true"
                width="640"
                height="610"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="Feedback Form"
              >
                Loading...
              </iframe>
            </div>
          </Modal>
        </header>

        <div className={classes.root}>
          {renderBreadcrumbs()}
          <main className={classes.content}>
            <ErrorBoundary FallbackComponent={ItWentWrong}>
              {main.has('config') ? children : 'Loading...'}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </MathJax.Provider>
  );
};

const styles = (theme) => ({
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
  feedback: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const mapStateToProps = (state) => ({
  main: state.main,
});

const mapDispatchToProps = {
  configLoad,
};

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, { withTheme: true })(App)
);

const Shell = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AppConnected>{children}</AppConnected>
  </ThemeProvider>
);

export default Shell;