import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';
import {
  Execution,
  TemplateCreation,
} from 'containers/pipeline/parts/longitudinal'

import Help from 'components/Help'

class LongitudinalPage extends Component {

  static styles = theme => ({
    sectionTitle: {
      paddingTop: 6,
      paddingLeft: 6,
    },
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <ExpansionPanel expanded>
          <ExpansionPanelSummary disabled>
            <Help
              help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Execution
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <Execution configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded>
          <ExpansionPanelSummary disabled>
            <Help
              help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Longitudinal Template Creation Settings
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TemplateCreation configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    )
  }
}

export default withStyles(LongitudinalPage.styles)(LongitudinalPage);