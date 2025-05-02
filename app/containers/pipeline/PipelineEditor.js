import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { withStyles } from '@mui/styles';

import Content from 'components/Content';
import Header, { HeaderText, HeaderAvatar, HeaderTools } from 'components/Header';

import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabScrollButton from '@mui/material/TabScrollButton';
import Paper from '@mui/material/Paper';

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

import PipelinePart, { formatLabel } from 'containers/pipeline/parts/PipelinePart';
import { cardSteps } from 'components/PipelineCard';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch';

import Collapse from '@mui/material/Collapse';

/** An interactive component to view/edit a pipeline configuration. */
class PipelineEditor extends Component {
  static propTypes = {
    /** Inherited style. */
    classes: PropTypes.object.isRequired,
    /** Immutable Map of configuration to render. */
    configuration: PropTypes.instanceOf(Immutable.Map).isRequired,
    /** Functions to handle changes to this component. */
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    /** Validation schema */
    schema: PropTypes.object.isRequired,
    /** Is this a default pipeline that should not be editable? */
    isDefault: PropTypes.bool
  }

  static defaultProps = {
    isDefault: false
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: [...props.configuration.keySeq()][0],
    };
  }

  static styles = theme => ({
    content: {
      padding: 20,
      marginTop: 20,
    },
    tabWrap: {
      flexDirection: 'row'
    }
  });

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  handleStateChange = (event) => {
    const name = event.target.name
    const value = event.target.checked

    const props = [
      [name, value]
    ]

    // @TODO: Restore toggles on tabs
    // if (name == "functional.enabled") {
    //   this.setState({ tab: value ? 1 : 0 });
    //   props.push(["derivatives.enabled", value])
    // }

    this.props.onChange(props)
  }


  render() {
    const { classes, configuration, isDefault, onChange, schema } = this.props;
    const { tab } = this.state;

    // Set the sequence of tabs to display.
    const tabSequence = Array.from(new Set([
      'pipeline_setup', // general setup first
      ...cardSteps, // the steps shown on the cards
      ...configuration.keySeq().toJS() // all the rest of the steps
    ]));

    const disable = (event) => {
      event.stopPropagation()
    }
    const entry = configuration.getIn([tab]);

    return (
      <>
        <Tabs
          value={tab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {
            tabSequence.map((k) => (
              <Tab label={formatLabel(k)} value={k} key={`tabtab-${k}`} />
            ))
          }
        </Tabs>
        <Collapse key={`${tab}-collapse`} in={true}>
          <PipelinePart
            { ...{ isDefault, onChange, schema } }
            configuration={entry}
            parents={[tab]}
            level={1}
          />
        </Collapse>
      </>
    );
  }
}

export default withStyles(PipelineEditor.styles)(PipelineEditor);
