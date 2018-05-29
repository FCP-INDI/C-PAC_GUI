// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import ProjectCard from '../components/ProjectCard';

class Home extends Component {

  static styles = theme => ({
    header: {
      padding: '0 0 20px 0',
    },
    paper: {
      margin: 0,
      padding: 20
    }
  });

  render() {
    return (
      <div>
        <Paper className={this.props.classes.paper}>
          <Typography variant='headline' className={this.props.classes.header}>
            Recent projects
          </Typography>
          <Grid container spacing={8} alignContent="center">
            <Grid item>
              <ProjectCard id="abide" />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Home.styles)(Home));
