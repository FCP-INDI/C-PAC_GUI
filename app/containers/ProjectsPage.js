import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'

import Header, { HeaderText, HeaderAvatar } from '../components/Header';
import Content from '../components/Content';
import ProjectCard from '../components/ProjectCard';
import {
  PipelineIcon,
} from '../components/icons';

class ProjectsPage extends Component {

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
      <div>
        <Header>
          <HeaderAvatar><PipelineIcon /></HeaderAvatar>
          <HeaderText>
            Projects
          </HeaderText>
        </Header>
        <Content>
          <Grid container spacing={8} alignContent="center">
            <Grid item>
              <ProjectCard id="abide" />
            </Grid>
          </Grid>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectsPage.styles)(ProjectsPage));
