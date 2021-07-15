import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import PipelineTextField from 'components/TextField';

import CpacList from 'components/List';
import Help from 'components/Help';
import OnOffSwitch from 'components/OnOffSwitch';
import RoiPaths from 'components/RoiPaths';

export const formatLabel = (label) => {
  const specialCasings = {
    afni: "AFNI",
    ants: "ANTs",
    freesurfer: "FreeSurfer",
    fsl: "FSL",
    acpc: "ACPC",
    aroma: "AROMA",
    bet: "BET",
    dir: "Directory",
    epi: "EPI",
    nlmf: "NLMF",
    roi: "Region of Interest",
    tse: "Timeseries Extraction",
  };  // words with special casing or adjusted spelling
  const keepLower = ["at", "of", "per", "to"]  // words to not capitalize
  let labelParts = label.split("_");
  return labelParts.map(part => {
    if (part == part.toUpperCase() || keepLower.includes(part)) {
      return part;  // keep all uppercase uppercase
    }
    if (Object.keys(specialCasings).includes(part)) {
      return specialCasings[part];
    }
    return part.charAt(0).toUpperCase() + part.slice(1,)
  }).join(" ");
}

/**
 * Recursive component to convert YAML structure to GUI.
 */
class PipelinePart extends PureComponent {
  static propTypes = {
    /** Inherited style. */
    classes: PropTypes.object.isRequired,
    /** Current-depth Immutable Map to render. */
    configuration: PropTypes.instanceOf(Immutable.Map).isRequired,
    /** Function to handle changes to this component. */
    onChange: PropTypes.func.isRequired,
    /** Sequence of keys from the top of the overall pipeline configuration to this Map. */
    parents: PropTypes.array.isRequired,
    /** Current depth level (integer). */
    level: PropTypes.number.isRequired
  }

  static styles = theme => ({
    fullWidth: {
      width: "100%",
    },
    sectionTitle: {
      paddingTop: 6,
      paddingLeft: 6,
    },
  });

  render() {
    const { classes, configuration, onChange, parents, level } = this.props;

    switch (Immutable.Map.isMap(configuration)) {
      case true:
        return (
          <>
          { configuration.entrySeq().map((entry) => {
            switch (entry[0]) { // handle objects with custom keys
              case "tse_roi_paths":
                return (
                  <RoiPaths key={entry[0]} configKey={entry[0]} parents={parents} config={entry[1]} onChange={onChange} validOptions={["Avg", "Voxel", "SpatialReg", "PearsonCorr", "PartialCorr"]}/>
                )
              case "sca_roi_paths":
                return (
                  <RoiPaths key={entry[0]} configKey={entry[0]} parents={parents} config={entry[1]} onChange={onChange} validOptions={["Avg", "DualReg", "MultReg"]}/>
                )
              default: // all others
                if (Immutable.List.isList(entry[1])) {
                  return (
                    <CpacList { ...{
                        entry, classes, configuration, level, parents, onChange
                      } }
                      key={`list-${entry[0]}`}
                    />
                  )
                } else {
                  switch (Immutable.Map.isMap(entry[1])) {
                    case true:
                      return (
                        <Accordion key={entry[0]} expanded className={classes.fullWidth}>
                          <AccordionSummary disabled>
                            <Typography variant="h6" className={classes.sectionTitle}>
                              { formatLabel(entry[0]) }
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                          <Grid container>
                            <PipelinePart configuration={entry[1]} classes={classes} onChange={onChange} parents={[...parents.slice(0, level), entry[0]]} level={level + 1} />
                          </Grid>
                          </AccordionDetails>
                        </Accordion>
                      )
                    case false:
                      const regex = new RegExp(`^\s*{entry[0]}`);
                      const label = formatLabel(entry[0]);
                      const name = [...parents.slice(0, level), entry[0]].join('.');
                      switch (typeof(entry[1])) {
                        case 'boolean':
                          return (
                            <OnOffSwitch
                              {...{regex, label, name, onChange}}
                              key={entry[0]}
                              checked={entry[1]}
                            />
                          )
                        case 'string':
                          return (
                            <Grid key={entry[0]} item xs={12}>
                              <FormGroup row>
                                <Help
                                  type="pipeline"
                                  regex={regex}
                                  help=""
                                  fullWidth >
                                  <PipelineTextField
                                    label={label} fullWidth margin="normal" variant="outlined"
                                    name={name}
                                    value={entry[1]}
                                    onChange={onChange}
                                  />
                                </Help>
                              </FormGroup>
                            </Grid>
                          )
                        case 'number':
                          return (
                            <Grid key={entry[0]} item xs={12}>
                              <FormGroup row>
                                <Help
                                  type="pipeline"
                                  regex={regex}
                                  help=""
                                  fullWidth >
                                  <PipelineTextField
                                    label={label} fullWidth margin="normal" variant="outlined"
                                    name={name}
                                    type='number'
                                    value={entry[1]}
                                    onChange={onChange}
                                  />
                                </Help>
                              </FormGroup>
                            </Grid>
                          )
                        default:
                          return entry[1]
                      }
                    default:
                      return (
                        <>{ entry[1] }</>
                      )
                  }
                }
            }
          } ) }
          </>
        )
      default:
        switch (parents[0]) {
          case 'FROM':
            return (
              <PipelineTextField
                fullWidth margin="normal" variant="outlined"
                name={parents.join('.')}
                value={configuration}
                onChange={onChange}
                helperText={'name of a preconfig or in-container path to a custom pipeline config file'}
              />
            )
          default:
            return <></>
        }
    }
  }
}

export default withStyles(PipelinePart.styles)(PipelinePart);
