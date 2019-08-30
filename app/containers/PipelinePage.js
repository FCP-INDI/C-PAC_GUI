import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  pipelineVersionDirtyUpdate,
  pipelineVersionDirtySave,
  pipelineVersionDirtyRevert,
  pipelineNameUpdate,
  pipelineDownload,
} from 'actions/pipeline'

import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import PipelineEditor from 'containers/pipeline/PipelineEditor';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from 'components/Header';
import Content from 'components/Content';
import Box from 'components/Box';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Drawer from '@material-ui/core/Drawer';

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
} from 'components/icons';

import cpac from '@internal/c-pac'


class PipelinePage extends Component {

  static styles = theme => ({
    warning: {
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }
  });

  constructor(props) {
    super(props)

    const pipeline = this.props.pipeline

    if (!pipeline) {
      return
    }

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
      default: pipeline.get('id') === 'default',
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
    if (this.state.default) {
      return
    }

    let configuration = this.state.configuration

    if (values.target) {
      const name = values.target.name
      const value = values.target.type && values.target.type == "checkbox" ?
                      values.target.checked :
                      values.target.value

      return this.handleChange([[name, fromJS(value)]])
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

  handleSave = () => {
    this.props.pipelineVersionDirtySave(this.props.pipeline.get('id'))
  };

  handleRevert = () => {
    this.props.pipelineVersionDirtyRevert(this.props.pipeline.get('id'))
  };

  handleDownload = () => {
    const pipeline = this.props.pipeline
    const versions = pipeline.get('versions')
    let version = null
    if (versions.has("0")) {
      version = "0"
    } else {
      version = versions.keySeq().max()
    }

    var blob = new Blob(
      [cpac.pipeline.dump(pipeline.toJS(), version)],
      { type: "text/yaml;charset=utf-8" }
    );

    var anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.download = pipeline.get('name') + '.yml'
    anchor.click();
  }

  handleTitleClick = () => {
    if (this.state.default) {
      return
    }
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

  handleTitleHover = () => {
    this.setState(this.toggleTitleHoverState);
  }

  toggleTitleHoverState(state) {
    if (this.state.default) {
      return
    }
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
          onKeyPress={(e) => e.key == 'Enter' ? this.handleTitleSaveClick() : null}
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
          cursor: this.state.default ? '' : 'pointer',
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
        <Tooltip title="Download config file">
          <IconButton onClick={this.handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={this.state.default ? "You cannot change the default template!" : "Save"}>
          <span>
            <IconButton disabled={this.state.default} onClick={this.handleSave}>
              <SaveIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Revert">
          <span>
            <IconButton disabled={!this.state.dirty} onClick={this.handleRevert}>
              <RevertIcon />
            </IconButton>
          </span>
        </Tooltip>
      </React.Fragment>
    )

    return (
      <Box title={this.renderTitle(pipeline)}
           avatar={<PipelineIcon />}
           tools={tools}>
        {
          this.state.configuration ?
          (
            <React.Fragment>
            { this.state.default ?
              <div className={classes.warning}>
                You cannot change the default template! Please, duplicate it to create your own pipeline.
              </div>
              : null }
              <PipelineEditor default={this.state.default} configuration={this.state.configuration} onChange={this.handleChange} onSave={this.handleSave} />
            </React.Fragment>
          )
          :
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
  pipelineVersionDirtyRevert,
  pipelineNameUpdate,
  pipelineDownload,
}

const areStatesEqual = (next, prev) => {
  // TODO review
  return false
}

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(withStyles(PipelinePage.styles)(PipelinePage));
