import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';


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
        background: '#f6e187',
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
    const { classes, children, variant = 'headline' } = this.props;

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
