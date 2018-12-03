import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  pipelineVersionDirtyUpdate,
  pipelineVersionDirtySave,
  pipelineNameUpdate,
  pipelineDuplicate,
} from '../actions/pipeline'

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
import Tooltip from '@material-ui/core/Tooltip'

import getter from 'lodash.get';
import setter from 'lodash.set';

import { fromJS } from 'immutable';

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
    const versions = pipeline.get('versions')

    let dirty = false
    let version = null

    // @TODO move to saga or reducer

    if (versions.has("0")) {
      dirty = true
      version = "0"
    } else {
      version = versions.keySeq().max()
    }

    this.state = {
      dirty,
      version,
      configuration: pipeline.getIn(['versions', version, 'configuration'])
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.pipeline.get('versions').keySeq().equals(this.props.pipeline.get('versions').keySeq())) {
      const pipeline = nextProps.pipeline
      const versions = pipeline.get('versions')

      let dirty = false
      let version = null

      if (versions.has("0")) {
        dirty = true
        version = "0"
      } else {
        version = versions.keySeq().max()
      }

      this.setState({
        dirty,
        version,
        configuration: pipeline.getIn(['versions', version, 'configuration'])
      });
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

    this.props.pipelineVersionDirtyUpdate(
      this.props.pipeline,
      configuration
    )

    this.setState({ configuration, dirty: true, version: "0" })

  }

  handleSave = (name, value) => {
    this.props.pipelineVersionDirtySave(this.props.pipeline.get('id'))
  };

  handleDuplicate = () => {
    this.props.pipelineDuplicate(this.props.pipeline.get('id'))
  }

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
    this.props.pipelineNameUpdate(this.props.pipeline.get('id'), name)
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
          defaultValue={pipeline.get('name')}
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
      >{ pipeline.get('name') + (this.state.dirty ? " *" : "") }</div>
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
        <Tooltip title="Duplicate">
          <IconButton onClick={this.handleDuplicate}>
            <DuplicateIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download config file">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Save">
          <IconButton onClick={this.handleSave}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
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
    pipeline: state.main.getIn(['config', 'pipelines']).find((p) => p.get('id') == pipeline),
  }
}

const mapDispatchToProps = {
  pipelineVersionDirtyUpdate,
  pipelineVersionDirtySave,
  pipelineNameUpdate,
  pipelineDuplicate,
}

const areStatesEqual = (next, prev) => {
  // TODO review
  return false
}

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(withStyles(PipelinePage.styles)(PipelinePage));
