import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';


class TemplatePage extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes } = this.props;

    return (null);
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(TemplatePage.styles)(
        TemplatePage
    )
);
