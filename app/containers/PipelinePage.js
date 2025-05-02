import React, { Component, use } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import memoizeOne from 'memoize-one';

import {
  pipelineVersionDirtyUpdate,
  pipelineVersionDirtySave,
  pipelineVersionDirtyRevert,
  pipelineNameUpdate,
  pipelineDownload,
} from 'actions/pipeline'

import { withStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import PipelineEditor from './pipeline/PipelineEditor';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from 'components/Header';
import Content from 'components/Content';
import Box from 'components/Box';
import NotFound from 'components/404';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Drawer from '@mui/material/Drawer';

import { fromJS, isImmutable } from 'immutable';

import {
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon,
} from '../components/icons';

import withRouter from '../components/withRouter';

import cpac from '@internal/c-pac';


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

    const { pipeline } = props;
    let dirty = false
    let version = null
    let isDefault = false
    let configuration = null
    let isTitleEditing = false
    if (pipeline) {

      const versions = pipeline.get('versions')

      // @TODO move to saga or reducer

      if (versions.has("0")) {
        dirty = true
        version = "0"
      } else {
        version = versions.keySeq().max()
      }
      isDefault = isADefault(pipeline.get('id'))
      configuration = pipeline.getIn(['versions', version, 'configuration'])
    }

    this.state = {
      dirty,
      version,
      isDefault: isDefault,
      configuration: configuration,
      isTitleEditing: isTitleEditing,
    }
  }

  componentDidUpdate(nextProps) {
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
        version
      });
    }
  }

  changedValue = (key, value) => {
    if (typeof key == "string") {
      key = key.split('.')
    }
    let configuration = this.state.configuration;

    // Toggle both if there are two entries in a Boolean list
    if (Array.isArray(key)) {
      const indexInList = key[key.length - 1];
      if (
        typeof(value) === 'boolean' &&
        !isNaN(indexInList) &&  // make sure the index is a number
        !(indexInList % 1)
      ) {  // make sure the index is an integer
          const listKey = key.slice(0, key.length - 1);
          let newList = configuration.getIn(listKey).toJS();
          if (newList.length == 2) {
            key = listKey;
            value = newList.map((item) => !item);
          }
        }
    }

    configuration = configuration.setIn(key, isImmutable(value) ? value : fromJS(value));

    this.props.pipelineVersionDirtyUpdate(
      this.props.pipeline,
      configuration
    )

    this.setState({ configuration, dirty: true, version: "0" })
    return(configuration)
  }

  handleChangedValue = memoizeOne(this.changedValue);

  handleChange = (values) => {
    if (this.state.isDefault) {
      return
    }

    if (values.target) {
      const name = values.target.name;
      const value = values.target.type && values.target.type == "checkbox" ?
                      values.target.checked :
                      values.target.value;
      return this.handleChangedValue(name, fromJS(value));
    }

  }

  handleSave = () => {
    this.props.pipelineVersionDirtySave(this.props.pipeline.get('id'))
  };

  handleRevert = () => {
    this.props.pipelineVersionDirtyRevert(this.props.pipeline.get('id'));
  };

  handleDownload = () => {
    const pipeline = this.props.pipeline;
    const configuration = this.state.configuration;
    const pipelineName = pipeline.get('name');
    const versions = pipeline.get('versions');
    let version = null
    if (versions.has("0")) {
      version = "0"
    } else {
      version = versions.keySeq().max()
    }
    const cpacVersion = pipeline.getIn(['versions', version, 'version']);

    var blob = new Blob(
      [cpac.pipeline.dump(
        configuration.toJS(), pipelineName, version, cpacVersion
      )],
      { type: "text/yaml;charset=utf-8" }
    );

    var anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.download = pipelineName + '.yml'
    anchor.click();
  }

  handleTitleClick = () => {
    if (this.state.isDefault) {
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
    if (this.state.isDefault) {
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
          cursor: this.state.isDefault ? '' : 'pointer',
        }}
      >
        {
          pipeline.get('name') // TODO: fix dirty/save/revert + (this.state.dirty ? " *" : "")
        }
      </div>
    )
  }

  render() {
    const { classes, pipeline, schema } = this.props;

    if (!pipeline) {
      return <NotFound />
    }

    const tools = (
      <React.Fragment>
        <Tooltip title="Download config file">
          <IconButton onClick={this.handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        {/* TODO: fix dirty/save/revert <Tooltip title={this.state.default ? "You cannot change the default template!" : "Save"}>
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
        </Tooltip> */}
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
            { this.state.isDefault ?
              <div className={classes.warning}>
                You cannot change the default template! Please, duplicate it to create your own pipeline.
              </div>
              : null }
              <PipelineEditor { ...{schema} } isDefault={this.state.isDefault} configuration={this.state.configuration} onChange={this.handleChange} onSave={this.handleSave} />
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
  const { pipeline } = props.params;

  return {
    pipeline: state.main.getIn(['config', 'pipelines']).find((p) => p.get('id') == pipeline),
    schema: state.main.getIn(['config', 'schema', 'pipeline'])
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

/**
 * Checks if a given pipeline ID is for a default pipeline.
 * @param {string} pipelineID
 * @returns {boolean}
 */
export const isADefault = (pipelineId) => {
  return pipelineId.slice(0, 7) === 'default';
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(withStyles(PipelinePage.styles)(PipelinePage)));
