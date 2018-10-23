import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


class Header extends Component {

  static styles = theme => {
    return {
      root: {
        padding: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'left',
        background: '#ade3da',
      },
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={this.props.classes.paper} elevation={1}>
        <div className={classes.root}>
          { this.props.children }
        </div>
      </Paper>
    );
  }
}

export default withStyles(Header.styles)(Header)


class HeaderText extends Component {

  static styles = theme => ({
    root: {
      padding: `0 ${theme.spacing.unit * 2}px`
    },
  });

  render() {
    const { classes, children, variant = 'h5' } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant={variant}>
          { children }
        </Typography>
      </div>
    );
  }
}
const HeaderTextStyled = withStyles(HeaderText.styles)(HeaderText)
export { HeaderTextStyled as HeaderText }


class HeaderAvatar extends Component {

  static styles = theme => ({
    root: {
      background: "#FFF",
      color: "#666"
    },
  });

  render() {
    const { classes, children } = this.props;

    return (
      <Avatar className={classes.root}>
        { children }
      </Avatar>
    );
  }
}

const HeaderAvatarStyled = withStyles(HeaderAvatar.styles)(HeaderAvatar)
export { HeaderAvatarStyled as HeaderAvatar }


class HeaderTools extends Component {

  static styles = theme => ({
    root: {
      padding: `0 ${theme.spacing.unit * 2}px`
    },
  });

  render() {
    const { classes, children, variant = 'h5' } = this.props;

    return (
      <div className={classes.root}>
        { children }
      </div>
    );
  }
}
const HeaderToolsStyled = withStyles(HeaderTools.styles)(HeaderTools)
export { HeaderToolsStyled as HeaderTools }
