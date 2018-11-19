import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';

import Content from '../Content';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../Header';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import {
  HomeIcon,
  PipelineIcon,
  SubjectIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
} from '../icons';

import {
  Anatomical,
  Functional,
  Derivatives,
} from './parts'


class PipelineEditor extends Component {

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    }
  });

  state = {
    tab: 2,
  };

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    const { classes, onChange, configuration } = this.props
    const { tab } = this.state

    return (
      <React.Fragment>
        <Tabs
          value={tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Anatomical" />
          <Tab label="Functional" />
          <Tab label="Derivatives" />
        </Tabs>

        <Paper className={classes.content} elevation={0}>
          { tab === 0 && <Anatomical configuration={configuration} onChange={onChange} /> }
          { tab === 1 && <Functional configuration={configuration} onChange={onChange} /> }
          { tab === 2 && <Derivatives configuration={configuration} onChange={onChange} /> }
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(PipelineEditor.styles)(PipelineEditor);
