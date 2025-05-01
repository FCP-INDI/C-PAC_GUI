import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  pipelineConfigUpdate,
  pipelineNameUpdate,
} from '../actions/main'

import { withStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import DatasetSettingsEditor from '../components/dataset/DatasetSettingsEditor';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../components/Header';
import Content from '../components/Content';
import Box from '../components/Box';
import NotFound from 'components/404';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'

import {
  DatasetIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
  DownloadIcon,
  SaveIcon,
  RevertIcon,
  EditIcon
} from '../components/icons';


class DatasetPage extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    }
  });

  constructor(props) {
    super(props)
    const { dataset } = useParams();
    this.state = {
      settings: dataset.settings
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
    this.props.pipelineConfigUpdate(this.props.dataset.id, name, value)
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
    this.props.pipelineNameUpdate(this.props.dataset.id, name)
    this.setState({
      isTitleEditing: false
    });
  }

  toggleTitleHoverState(state) {
    return {
      isTitleHovering: !state.isTitleHovering,
    };
  }

  renderTitle(dataset) {
    return this.state.isTitleEditing ? (
      <React.Fragment>
        <TextField
          label="Dataset Name"
          defaultValue={dataset.name}
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
      >{ dataset.name }</div>
    )
  }

  render() {
    const { classes, dataset } = this.props

    if (!dataset) {
      return <NotFound />
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
      <Box title={this.renderTitle(dataset)}
           avatar={<DatasetIcon />}
           tools={tools}>
        {
          this.state.settings ?
          <DatasetSettingsEditor settings={this.state.settings} onChange={this.handleChange} onSave={this.handleSave} />:
          null
        }
      </Box>
    );
  }
}

const mapStateToProps = (state, props) => {

  return {
    dataset: state.main.config.datasets.find((p) => p.id == dataset)
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(DatasetPage.styles)(DatasetPage)
);
