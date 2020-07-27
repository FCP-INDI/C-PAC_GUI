import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

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
  DerivativesPage,
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
    tab: 0,
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
      <>
        <Tabs
          value={tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="General" />
          <Tab label="Anatomical" />
          { configuration.getIn(["anatomical", "enabled"]) ?
          <Tab label={(
            <>
              <Switch
                name="functional.enabled"
                checked={configuration.getIn(["functional", "enabled"])}
                onClick={disable}
                onChange={this.handleStateChange}
                color="primary"
              />
              Functional
            </>
          )} classes={{
            wrapper: classes.tabWrap
          }} />
          : null }
          { configuration.getIn(["derivatives", "enabled"]) ?
          <Tab label="Derivatives" />
          : null }
        </Tabs>

        <Collapse in={tab === 0}><GeneralPage configuration={configuration} onChange={onChange} /></Collapse>
        <Collapse in={tab === 1}><AnatomicalPage configuration={configuration} onChange={onChange} /></Collapse>
        <Collapse in={tab === 2}><FunctionalPage configuration={configuration} onChange={onChange} /></Collapse>
        <Collapse in={tab === 3}><DerivativesPage configuration={configuration} onChange={onChange} /></Collapse>
      </>
    );
  }
}

export default withStyles(PipelineEditor.styles)(PipelineEditor);
