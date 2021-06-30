import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { PipelineStepIcon } from './icons';

import { withRouter } from 'react-router-dom';

class PipelineStep extends Component {
  render() {
    const { stepKey, label, classes } = this.props;
    const enabledStyle = {root: stepKey ? classes.featEnabled : classes.featDisabled}
    return (
      <ListItem key={`step-${label}`}>
        <ListItemIcon>
          <PipelineStepIcon classes={enabledStyle} />
        </ListItemIcon>
        <ListItemText classes={enabledStyle} primary={label} />
      </ListItem>
    )
  }
}

export default withRouter(PipelineStep);