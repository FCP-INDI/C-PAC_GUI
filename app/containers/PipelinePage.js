import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  pipelineConfigUpdate,
  pipelineNameUpdate,
} from '../actions/main'

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
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'

import getter from 'lodash.get';
import setter from 'lodash.set';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon
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

  handleTitleHover = () => {
    this.setState(this.toggleTitleHoverState);
  }

  handleTitleClick = () => {
    this.setState({
      isTitleEditing: true
    });
  }

  handleTitleSaveClick = () => {
    const name = this.title.value
    this.props.pipelineNameUpdate(this.props.pipeline.id, name)
    this.setState({
      isTitleEditing: false
    });
  }

  toggleTitleHoverState(state) {
    return {
      isTitleHovering: !state.isTitleHovering,
    };
  }

  renderTitle(pipeline) {
    return this.state.isTitleEditing ? (
      <React.Fragment>
        <TextField
          label="Pipeline Name"
          defaultValue={pipeline.name}
          inputRef={(input) => { this.title = input; }}
          margin="none" variant="outlined"
          helperText=''
          style={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
        <IconButton onClick={this.handleTitleSaveClick}>
          <SaveIcon />
        </IconButton>
      </React.Fragment>
    ) : (
      <div
        onMouseEnter={this.handleTitleHover}
        onMouseLeave={this.handleTitleHover}
        onClick={this.handleTitleClick}
        style={{
          cursor: 'pointer',
          padding: '12.5px 0' // esoteric number
        }}
      >{ pipeline.name }</div>
    )
  }

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
      <Box title={this.renderTitle(pipeline)}
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
  pipelineNameUpdate,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(PipelinePage.styles)(PipelinePage));
