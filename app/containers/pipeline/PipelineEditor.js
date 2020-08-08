import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { withStyles } from '@material-ui/core/styles';

import Content from '../../components/Content';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabScrollButton from '@material-ui/core/TabScrollButton';
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
} from 'components/icons';

import { formatLabel, PipelinePart } from 'containers/pipeline/parts';
import { cardSteps } from 'components/PipelineCard';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Switch from '@material-ui/core/Switch';

import Collapse from '@material-ui/core/Collapse';

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
<<<<<<< HEAD
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
=======
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
>>>>>>> dcb2f54 (cleaning and code styling)
      </>
    );
  }
}

export default withStyles(PipelineEditor.styles)(PipelineEditor);
