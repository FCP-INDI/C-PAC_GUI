// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

class Home extends Component {

  static styles = theme => ({
  });

  render() {
    return (
      <div>
        <Link to={`/environments`}>Environments</Link>
        <Link to={`/projects`}>Projects</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
