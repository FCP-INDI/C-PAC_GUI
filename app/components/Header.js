import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
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
