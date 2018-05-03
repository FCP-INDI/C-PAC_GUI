import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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


export default withStyles(HeaderText.styles)(HeaderText)
