import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pipelineConfigUpdate } from '../actions/main'

import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import PipelineEditor from '../components/pipeline/PipelineEditor';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header';
import Content from '../components/Content';
import Box from '../components/Box';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import getter from 'lodash.get';
import setter from 'lodash.set';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon
} from '../components/icons';


class PipelinePage extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    }
  });

  constructor(props) {
    super(props)
    const pipeline = this.props.pipeline
    this.state = {
      configuration: pipeline.versions[pipeline.last_version].configuration
    }
  }

  handleChange = (name, value) => {
    let configuration = this.state.configuration

    if (!name) {
      for (let newName in value) {
        setter(configuration, newName, value[newName]);
      }
    } else {
      setter(configuration, name, value);
    }

    this.setState({ configuration })
  }

  handleSave = (name, value) => {
    this.props.pipelineConfigUpdate(this.props.pipeline.id, name, value)
  };

  render() {
    const { classes, pipeline } = this.props

    if (!pipeline) {
      // @TODO ASH create a 404 page/component
      return "404"
    }

    const tools = (
      <React.Fragment>
        <Button size="small">
          <DownloadIcon />
        </Button>
        <Button size="small">
          <SaveIcon />
        </Button>
        <Button size="small">
          <RevertIcon />
        </Button>
      </React.Fragment>
    )

    return (
      <Box title={pipeline.name}
           avatar={<PipelineIcon />}
           tools={tools}>
        {
          this.state.configuration ?
          <PipelineEditor configuration={this.state.configuration} onChange={this.handleChange} onSave={this.handleSave} />:
          null
        }
      </Box>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { pipeline } } } = props

  return {
    pipeline: state.main.config.pipelines.find((p) => p.id == pipeline)
  }
}

const mapDispatchToProps = {
  pipelineConfigUpdate,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelinePage.styles)(PipelinePage));
