import React, { Component, PureComponent } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

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

import FormControlLabelled from 'components/FormControlLabelled';
import Help from 'components/Help';
import Immutable from 'immutable';
import OnOffSwitch from 'components/OnOffSwitch';

import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DuplicateIcon
} from 'components/icons';

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


class PipelinePart extends PureComponent {

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
                  <RoiPaths key={entry[0]} configKey={entry[0]} config={entry[1]} onChange={onChange} validOptions={["Avg", "Voxel", "SpatialReg", "PearsonCorr", "PartialCorr"]}/>
                )
              case "sca_roi_paths":
                return (
                  <RoiPaths key={entry[0]} configKey={entry[0]} config={entry[1]} onChange={onChange} validOptions={["Avg", "DualReg", "MultReg"]}/>
                )
              default: // all others
                if (Immutable.List.isList(entry[1])) {
                  const regex = new RegExp(`^\s*{entry[0]}`);
                  const label = formatLabel(entry[0]);
                  const name = [...parents, entry[0]].join('.');
                  return (
                    <Grid key={entry[0]} item xs={12} className={classes.fullWidth}>
                    <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={regex}
                      help=""
                    >
                      <FormLabel>{label}</FormLabel>
                    </Help>
                    <List className={classes.fullWidth}>
                    {entry[1].map((item, i) => {
                      if (!Immutable.Map.isMap(item)){
                        switch (typeof(item)){
                          case "boolean": // list of On/Off switches
                            return (
                              <ListItem button key={i}>
                                <OnOffSwitch
                                  {...{label, onChange}}
                                  key={`${entry[0]}-${i}`}
                                  regex={null}
                                  checked={item}
                                />
                              </ListItem>
                            )
                          case "number": // handled same as string
                          case "string":
                            return (<ListItem button key={i}>
                            <ListItemText primary={item} />
                            {/* <ListItemText primary={item} className={classes.fullWidth} style={{ padding: '0 115px 0 0'}} /> */}
                            <ListItemSecondaryAction>
                              <IconButton onClick={((regi) => () => this.handleEdit(regi))(i)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={((regi) => () => this.handleDuplicate(regi))(i)}>
                                <DuplicateIcon />
                              </IconButton>
                              <IconButton onClick={((regi) => () => this.handleDelete(regi))(i)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>)
                          default:
                            console.warn(`UNHANDLED TYPE: ${typeof(item)}: ${parents}: ${$entry[0]}: ${item}`)
                            return('!!!UNHANDLED TYPE!!!')
                        }
                      } else {
                        <Grid container>
                          <PipelinePart configuration={item} classes={classes} onChange={onChange} parents={[...parents.slice(0, level), entry[0]]} level={level + 1} />
                        </Grid>
                      }
                    })}
                    <Divider />
                    <ListItem style={{ padding: 10 }}>
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => this.handleNew()}>
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    </List>
                    </FormGroup>
                    </Grid>
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
        return (
          <></>
        )
    }
  }
}

export default withStyles(PipelinePart.styles)(PipelinePart);
