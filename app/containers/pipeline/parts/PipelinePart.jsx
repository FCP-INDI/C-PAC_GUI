import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'
import Immutable from 'immutable';

import RoiPaths from './RoiPaths';

class PipelineListPart extends Component {
  render() {
    const { classes, configuration, onChange, parents } = this.props;
      return (
        <></>
      )
  }
}

export const formatLabel = (label) => {
  const specialCasings = {
    afni: "AFNI",
    ants: "ANTs",
    freesurfer: "FreeSurfer",
    fsl: "FSL",
    aroma: "AROMA",
    bet: "BET",
    dir: "Directory",
    epi: "EPI",
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


function returnComponent(obj, classes={}, onChange=undefined, parents=[], level=1) {
  switch (Immutable.Map.isMap(obj)) {
    case true:
      return (
        <>
        { obj.entrySeq().map((entry) => {
          switch (entry[0]) { // handle objects with custom keys
            case "tse_roi_paths":
              return (
                <RoiPaths key={entry[0]} configKey={entry[0]} config={entry[1]} onChange={onChange} validOptions={["Avg", "Voxel", "SpatialReg", "PearsonCorr", "PartialCorr"]}/>
              )
            case "sca_roi_paths":
              return (
                <RoiPaths key={entry[0]} configKey={entry[0]} config={entry[1]} onChange={onChange} validOptions={["Avg", "DualReg", "MultReg"]}/>
              )
            default: // all others
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
                        { returnComponent(entry[1], classes, onChange, parents=[...parents.slice(0, level), entry[0]], level + 1) }
                      </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )
                case false:
                  const regex = new RegExp(`^\s*{entry[0]}`);
                  const label = formatLabel(entry[0]);
                  const name = [...parents, entry[0]].join('.');
                  switch (typeof(entry[1])) {
                    case 'boolean':
                      return (
                        <Grid key={entry[0]} item xs={12}>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              regex={regex}
                              help=""
                            >
                              <FormControlLabelled label={label}>
                                <Switch
                                  name={name}
                                  checked={entry[1]}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>
                        </Grid>
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
                              <TextField
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
                              <TextField
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
                      // console.log(typeof(entry[1]))
                      return entry[1]
                  }
                default:
                  return (
                    <>{ entry[1] }</>
                  )
              }
          }
        } ) }
        </>
      )
    default:
      return (
        <></>
      )
  }
}


class PipelinePart extends Component {

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
    const { classes, configuration, onChange, parents } = this.props;

    return (
      <React.Fragment>
        { returnComponent(configuration, classes, onChange, parents) }
      </React.Fragment>
    )
  }
}

export default withStyles(PipelinePart.styles)(PipelinePart);
