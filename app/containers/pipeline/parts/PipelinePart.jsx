import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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


class PipelineListPart extends Component {
  render() {
    const { classes, configuration, onChange, parents } = this.props;
      return (
        <></>
      )
  }
}


function formatLabel(label) {
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
          switch (entry[0].endsWith('roi_paths')) {
            case true:  // handle objects with custom keys
              return (
                <Grid container>
                  <Grid item sm={12}>
                    <Paper className={classes.paper}>
                      <Table className={classes.table}>
                        {/* <TableHead>
                          <TableRow>
                            <TableCell padding="checkbox">
                              <Help
                                type="pipeline"
                                regex={/^tsa_roi_paths/}
                                help={`Paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.`}
                              />
                            </TableCell>
                            <TableCell>ROI Image</TableCell>
                            <TableCell padding="checkbox">Average</TableCell>
                            <TableCell padding="checkbox">Voxel</TableCell>
                            <TableCell padding="checkbox">Spatial Regression</TableCell>
                            <TableCell padding="checkbox">Pearson correlation</TableCell>
                            <TableCell padding="checkbox">Partial correlation</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                          config.get('masks').size == 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: "center" }}>
                              Add new rows with the "+" below.
                            </TableCell>
                          </TableRow>
                          ) : (
                            config.get('masks').map((mask, i) => (
                          <TableRow key={i}>
                            <TableCell padding="checkbox">
                              <IconButton className={classes.button} onClick={() => this.removeMask(i)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth={true}
                                name={`derivatives.timeseries_extraction.masks.${i}.mask`}
                                onChange={onChange}
                                value={mask.get('mask')}
                                helperText=''
                                />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={`derivatives.timeseries_extraction.masks.${i}.average`}
                                onChange={onChange}
                                checked={mask.get('average')}
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={`derivatives.timeseries_extraction.masks.${i}.voxel`}
                                onChange={onChange}
                                checked={mask.get('voxel')}
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={`derivatives.timeseries_extraction.masks.${i}.spatial_regression`}
                                onChange={onChange}
                                checked={mask.get('spatial_regression')}
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={`derivatives.timeseries_extraction.masks.${i}.pearson_correlation`}
                                onChange={onChange}
                                checked={mask.get('pearson_correlation')}
                              />
                            </TableCell>
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={`derivatives.timeseries_extraction.masks.${i}.partial_correlation`}
                                onChange={onChange}
                                checked={mask.get('partial_correlation')}
                              />
                            </TableCell>
                          </TableRow>
                        )))}
                        </TableBody>
                        <TableFooter>
                          <TableRow >
                            <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                              <Fab aria-label="Add new ROI" onClick={this.addMask}>
                                <AddIcon />
                              </Fab>
                            </TableCell>
                          </TableRow>
                        </TableFooter> */}
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              )
            default: // all others
              switch (Immutable.Map.isMap(entry[1])) {
                case true:
                  return (
                    <ExpansionPanel expanded className={classes.fullWidth}>
                      <ExpansionPanelSummary disabled>
                        <Typography variant="h6" className={classes.sectionTitle}>
                          { formatLabel(entry[0]) }
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                      <Grid container>
                        { returnComponent(entry[1], classes, onChange, parents=[...parents.slice(0, level), entry[0]], level + 1) }
                      </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                case false:
                  const regex = new RegExp(`^\s*{entry[0]}`);
                  const label = formatLabel(entry[0]);
                  const name = [...parents, entry[0]].join('.');
                  switch (typeof(entry[1])) {
                    case 'boolean':
                      return (
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
                      console.log(typeof(entry[1]))
                      return entry[1]
                    // case 'array':
                    //   return (
                    //     <Grid item xs={12}>
                    //       <FormGroup row>
                    //         <Help
                    //           type="pipeline"
                    //           regex={regex}
                    //           help=""
                    //           fullWidth >
                    //           <PipelineListPart></PipelineListPart>
                    //         </Help>
                    //       </FormGroup>
                    //     </Grid>
                    //   )
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
