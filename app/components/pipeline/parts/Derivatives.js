import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Switch from '@material-ui/core/Switch';

import {
  ALFF,
  NetworkCentrality,
  RegionalHomogeneity,
  SeedBasedCorrelation,
  TimeSeriesExtraction,
  VHMC
} from './derivatives'

class Derivatives extends Component {
  static styles = theme => ({
    divider: {
      margin: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
    sectionTitle: {
      paddingTop: 10
    },
  });

  handleSection = (section) => (event) => {
    return false
    // @TODO open on click at title
    // this.props.onChange(null, {
    //   [section]:
    // })
  };

  renderSection(title, name, value, component) {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <ExpansionPanel expanded={value} onChange={this.handleSection(name)}>
        <ExpansionPanelSummary>
          <Switch
            name={name}
            checked={value}
            onChange={onValueChange}
            color="primary"
          />
          <Typography variant="h6" className={classes.sectionTitle}>
            { title }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {
            React.createElement(component, {
              configuration,
              onChange,
              onValueChange
            })
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <React.Fragment>

        {
          this.renderSection(
            "Time Series Extraction",
            "derivatives.timeseries_extraction.enabled",
            configuration.derivatives.timeseries_extraction.enabled,
            TimeSeriesExtraction
          )
        }

        {
          this.renderSection(
            "Seed-based Correlation",
            "derivatives.sca.enabled",
            configuration.derivatives.sca.enabled,
            SeedBasedCorrelation
          )
        }

        {
          this.renderSection(
            "ALFF / f-ALFF",
            "derivatives.alff.enabled",
            configuration.derivatives.alff.enabled,
            ALFF
          )
        }

        {
          this.renderSection(
            "Network Centrality",
            "derivatives.network_centrality.enabled",
            configuration.derivatives.network_centrality.enabled,
            NetworkCentrality
          )
        }

        {
          this.renderSection(
            "Voxel-Mirrored Homotopic Connectivity (VMHC)",
            "derivatives.vhmc.enabled",
            configuration.derivatives.vhmc.enabled,
            VHMC
          )
        }

        {
          this.renderSection(
            "Regional Homogeneity",
            "derivatives.reho.enabled",
            configuration.derivatives.reho.enabled,
            RegionalHomogeneity
          )
        }

      </React.Fragment>
    )
  }
}

export default withStyles(Derivatives.styles)(Derivatives);
