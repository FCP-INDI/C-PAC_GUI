import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
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
        <Accordion expanded>
          <AccordionSummary disabled>
            <Help
              help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Initial Preprocessing
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <InitialPreprocessing configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded>
          <AccordionSummary disabled>
            <Help
              help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Skull stripping
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <SkullStripping configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded>
          <AccordionSummary disabled>
            <Help
              help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Registration
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Registration configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={configuration.getIn("anatomical.tissue_segmentation.enabled".split('.'))}>
          <AccordionSummary>
            <Switch
              name="anatomical.tissue_segmentation.enabled"
              checked={configuration.getIn("anatomical.tissue_segmentation.enabled".split("."))}
              onChange={onChange}
              color="primary"
            />
            <Typography variant="h6" className={classes.sectionTitle}>
              Tissue Segmentation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <TissueSegmentation configuration={configuration} onChange={onChange} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    )
  }
}

export default withStyles(AnatomicalPage.styles)(AnatomicalPage);
