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

import { Map, fromJS } from 'immutable';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon,
  DuplicateIcon,
} from '../components/icons';


class PipelinePage extends Component {

  static styles = theme => ({
  });

  constructor(props) {
    super(props)
    const pipeline = this.props.pipeline
    this.state = {
      configuration: fromJS(pipeline.versions[pipeline.last_version].configuration)
    }
  }

  handleChange = (values) => {
    let configuration = this.state.configuration

    if (values.target) {
      const name = values.target.name
      const value = values.target.type && values.target.type == "checkbox" ?
                      values.target.checked :
                      values.target.value

      return this.handleChange([[name, value]])
    }

    for (let [key, value] of values) {
      if (typeof key == "string") {
        key = key.split('.')
      }
      configuration = configuration.setIn(key, value)
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
        <IconButton>
          <DuplicateIcon />
        </IconButton>
        <IconButton>
          <DownloadIcon />
        </IconButton>
        <IconButton>
          <SaveIcon />
        </IconButton>
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
