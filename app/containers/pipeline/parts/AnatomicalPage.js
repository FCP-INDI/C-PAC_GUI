import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';
import {
  SkullStripping,
  Registration,
  TissueSegmentation,
} from 'containers/pipeline/parts/anatomical'

import Help from 'components/Help'
import InitialPreprocessing from './anatomical/InitialPreprocessing';


class AnatomicalPage extends Component {

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
              Initial Preprocessing
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <InitialPreprocessing configuration={configuration} onChange={onChange} />
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
              Skull stripping
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <SkullStripping configuration={configuration} onChange={onChange} />
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
              Registration
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <Registration configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={configuration.getIn("anatomical.tissue_segmentation.enabled".split('.'))}>
          <ExpansionPanelSummary>
            <Switch
              name="anatomical.tissue_segmentation.enabled"
              checked={configuration.getIn("anatomical.tissue_segmentation.enabled".split("."))}
              onChange={onChange}
              color="primary"
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Tissue Segmentation
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <TissueSegmentation configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    )
  }
}

export default withStyles(AnatomicalPage.styles)(AnatomicalPage);
