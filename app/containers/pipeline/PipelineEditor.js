import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import Content from '../../components/Content';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../../components/Header';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {
  DatasetIcon,
  DownloadIcon,
  EditIcon,
  ExpandMoreIcon,
  HomeIcon,
  NavigateNextIcon,
  PipelineIcon,
  RevertIcon,
  SaveIcon,
  SubjectIcon,
} from 'components/icons';

import {
  GeneralPage,
  AnatomicalPage,
  FunctionalPage,
  LongitudinalPage,
  DerivativesPage,
  PipelinePart
} from 'containers/pipeline/parts'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch';

import Collapse from '@material-ui/core/Collapse';

class PipelineEditor extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    },
    tabWrap: {
      flexDirection: 'row'
    }
  });

  state = {
    tab: 'general',
  };

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  handleStateChange = (event) => {
    const name = event.target.name
    const value = event.target.checked

    const props = [
      [name, value]
    ]

    if (name == "functional.enabled") {
      this.setState({ tab: value ? 1 : 0 });
      props.push(["derivatives.enabled", value])
    }

    this.props.onChange(props)
  }

  render() {
    const { classes, onChange, configuration } = this.props
    const { tab } = this.state

    const disable = (event) => {
      event.stopPropagation()
    }

    return (
      <React.Fragment>
        <Tabs
          value={tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {
            configuration.keySeq().toJS().map((k) => (
              <Tab label={k.replace('_', ' ')} value={k} />
            ))
          }
        </Tabs>

        {
          configuration.entrySeq().map((entry) => {
          switch(entry[0]){
            case 'general':
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}><GeneralPage configuration={configuration} onChange={onChange} /></Collapse>  // TODO SSOT
              )
              break;
            case 'anatomical':
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}><AnatomicalPage configuration={configuration} onChange={onChange} /></Collapse>  // TODO SSOT
              )
            case 'functional':
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}><FunctionalPage configuration={configuration} onChange={onChange} /></Collapse>  // TODO SSOT
              )
            case 'derivatives':
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}><DerivativesPage configuration={configuration} onChange={onChange} /></Collapse>  // TODO SSOT
              )
            case 'longitudinal':
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}><LongitudinalPage configuration={configuration} onChange={onChange} /></Collapse>  // TODO SSOT
              )
            default:
              return (
                <Collapse key={entry[0]} in={tab === entry[0]}>
                  <PipelinePart configuration={entry[1]} onChange={onChange} />
                </Collapse>
              )
          }
        })
        }
      </React.Fragment>
    );
  }
}

export default withStyles(PipelineEditor.styles)(PipelineEditor);
