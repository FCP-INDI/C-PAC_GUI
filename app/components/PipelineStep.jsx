/** A row to indicate a broad pipeline step on a pipeline card */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PipelineStepIcon } from './icons';

class PipelineStep extends Component {
  static propTypes = {
    /** Whether the step is On in the pipeline configuration */
    stepKey: PropTypes.bool.isRequired,
    /** Text to display for step */
    label: PropTypes.string,
    /** Inherited style */
    classes: PropTypes.object
  }

  render() {
    const { stepKey, label, classes } = this.props;
    const enabledStyle = {root: stepKey ? classes.featEnabled : classes.featDisabled};
    return (
      <ListItem key={`step-${label}`}>
        <ListItemIcon>
          <PipelineStepIcon classes={enabledStyle} />
        </ListItemIcon>
        <ListItemText classes={enabledStyle} primary={label} />
      </ListItem>
    );
  }
}

export default PipelineStep;
