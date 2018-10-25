import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Content from '../components/Content';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon
} from '../components/icons';


class ProjectPipelinePage extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    }
  });

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, project, pipeline } = this.props
    const { value } = this.state

    if (!project) {
      // @TODO ASH create a 404 page/component
      return "404"
    }

    if (!pipeline) {
      // @TODO ASH create a 404 page/component
      return "404"
    }

    return (
      <div>
        <Header>
          <HeaderAvatar>
            <PipelineIcon />
          </HeaderAvatar>
          <HeaderText>
            { pipeline.name }
          </HeaderText>
          <HeaderTools>
            <DownloadIcon />
          </HeaderTools>
        </Header>
        <Content>

        </Content>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { project, pipeline } } } = props
  const projectConfig = state.main.config.projects[project]
  return {
    project: projectConfig,
    pipeline: projectConfig ? projectConfig.pipelines.find((p) => p.id == pipeline) : undefined
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectPipelinePage.styles)(ProjectPipelinePage));
