// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import Content from '../components/Content';
import ProjectCard from '../components/ProjectCard';

type Props = {};

class ProjectsPage extends Component<Props> {
  props: Props;

  static styles = theme => ({
    paper: {
      margin: 0,
      padding: 20
    },
    header: {
      marginBottom: 10
    }
  });

  render() {
    const { classes, main } = this.props;

    return (
      <Content>
        <Typography className={classes.header} variant="headline">Projects</Typography>
        <Grid container spacing={8} alignContent="center">
          <Grid item>
            <ProjectCard id="abide" />
          </Grid>
          <Grid item>
            <ProjectCard id="adhd" />
          </Grid>
        </Grid>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectsPage.styles)(ProjectsPage));
