import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';


class ProjectPipelinesPage extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectPipelinesPage.styles)(ProjectPipelinesPage));
