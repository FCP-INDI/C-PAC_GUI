import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


class TimeSeriesExtraction extends Component {

  static styles = theme => ({
    paper: { flexGrow: 1, padding: theme.spacing.unit, marginBottom: theme.spacing.unit * 2 },
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

  handleAdd = (event) => {

    const { configuration, onChange } = this.props

    const next = configuration.derivatives.timeseries_extraction.masks.length

    onChange(`derivatives.timeseries_extraction.masks[${next}]`,{
      mask: '',
      average: false,
      voxel: false,
      spatial_regression: false,
      dual_regression: false,
      pearson_correlation: false,
      partial_correlation: false,
    })
  }

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    // "derivatives.timeseries_extraction.masks[0].enabled",
    // configuration.derivatives.timeseries_extraction.masks,

    const config = configuration.derivatives.timeseries_extraction

    return (
      <Grid container>
        <Grid item sm={12}>

          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Roi Image</TableCell>
                  <TableCell padding="checkbox">Average</TableCell>
                  <TableCell padding="checkbox">Voxel</TableCell>
                  <TableCell padding="checkbox">Spatial Regression</TableCell>
                  <TableCell padding="checkbox">Pearson correlation</TableCell>
                  <TableCell padding="checkbox">Partial correlation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                config.masks.map((mask, i) => (
                <TableRow key={i}>
                  <TableCell padding="checkbox">
                    <IconButton className={classes.button} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth={true}
                      name={`derivatives.timeseries_extraction.masks[${i}].mask`}
                      onChange={onValueChange}
                      value={mask.mask}
                      helperText=''
                      />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.timeseries_extraction.masks[${i}].average`}
                      onChange={onValueChange}
                      checked={mask.average}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.timeseries_extraction.masks[${i}].voxel`}
                      onChange={onValueChange}
                      checked={mask.voxel}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.timeseries_extraction.masks[${i}].spatial_regression`}
                      onChange={onValueChange}
                      checked={mask.spatial_regression}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.timeseries_extraction.masks[${i}].pearson_correlation`}
                      onChange={onValueChange}
                      checked={mask.pearson_correlation}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.timeseries_extraction.masks[${i}].partial_correlation`}
                      onChange={onValueChange}
                      checked={mask.partial_correlation}
                    />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow >
                  <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                    <Button  variant="fab" mini aria-label="Add new ROI" onClick={this.handleAdd}>
                      <AddIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>

          <FormControl component="fieldset">
            <FormLabel component="legend">Outputs</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="CSV"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.bet.enabled"
                    checked={true}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="Numpy"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.afni.enabled"
                    checked={false}
                    onChange={this.handleChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TimeSeriesExtraction.styles)(TimeSeriesExtraction);
