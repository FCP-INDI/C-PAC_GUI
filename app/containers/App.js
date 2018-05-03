// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { configLoad } from '../actions/main'
import { Link } from 'react-router-dom'


import classNames from 'classnames';
import { withStyles, typography } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FolderIcon from 'material-ui-icons/Folder';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import DeveloperBoardIcon from 'material-ui-icons/DeveloperBoard';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import PlayCircleFilledIcon from 'material-ui-icons/PlayCircleFilled';
import { Paper } from 'material-ui';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  static styles = (theme, drawerWidth=240) => ({
    menuButton: {
      // marginLeft: 12,
      // marginRight: 36,
    },
    root: {
      display: 'flex'
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 9,
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing.unit * 7,
      },
    },
    project: {
      backgroundColor: '#EEE',
      paddingBottom: theme.spacing.unit * 2,
    },
    projectItems: {
      marginLeft: theme.spacing.unit
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
    }
  });

  componentDidMount() {
    this.props.configLoad()
  }

  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { project, config: { environments = [] } = {} } = this.props.main
    const { classes, theme } = this.props

    console.log(project)

    return (
      <div>
        <header>
          <Link to={`/`}>
            <img src="../resources/logo.png" />
          </Link>
        </header>

        <div className={classes.root}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              ),
            }}
            open={this.state.open}
          >

            <List>
              <ListItem button onClick={this.handleDrawerToggle}>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
              </ListItem>
            </List>

            <Divider />

            <List>
              <ListItem button component={Link} to={`/projects`}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>

              <ListItem button component={Link} to={`/environments`}>
                <ListItemIcon>
                  <DeveloperBoardIcon />
                </ListItemIcon>
                <ListItemText primary="Environments" />
              </ListItem>
            </List>

            <Divider />

            { project ? (

            <List className={classes.project}>
              <ListItem>
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary="ABIDE" />
              </ListItem>

              <Paper className={classes.projectItems}>
                <ListItem button component={Link} to={``}>
                  <ListItemIcon>
                    <AccessibilityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subjects" />
                </ListItem>

                <ListItem button component={Link} to={``}>
                  <ListItemIcon>
                    <DeveloperBoardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pipelines" />
                </ListItem>

                <ListItem button component={Link} to={``}>
                  <ListItemIcon>
                    <PlayCircleFilledIcon />
                  </ListItemIcon>
                  <ListItemText primary="Runs" />
                </ListItem>
              </Paper>
            </List>
            ) : null }

          </Drawer>

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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(App.styles, { withTheme: true })(App))