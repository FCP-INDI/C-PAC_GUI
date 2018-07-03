import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import Content from '../components/Content';
import Header, { HeaderText, HeaderAvatar } from '../components/Header';
import RunCard from '../components/RunCard';


class ProjectRunsPage extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, project, config } = this.props;

    return (
      <div>
        <Header>
          <HeaderAvatar>{project.name[0]}</HeaderAvatar>
          <HeaderText>
            Runs
          </HeaderText>
        </Header>
        <Content>
          <Grid container spacing={8} alignContent="center">
            {project.runs.map((run) => (
              <Grid item key={run.id}>
                <RunCard project={project} run={run} />
              </Grid>
            ))}
          </Grid>
        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { project } } } = props
  return { project: state.main.config.projects[project], config: state.main.config }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectRunsPage.styles)(ProjectRunsPage));
