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
import { filter } from 'bluebird-lst';


class TemporalFiltering extends Component {

  static styles = theme => ({
    paper: { flexGrow: 1, padding: theme.spacing.unit, marginBottom: theme.spacing.unit * 2 },
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

  renderFilter(filter, i) {
    const { classes, configuration, onChange } = this.props

    return (
      <TableRow key={i}>
        <TableCell padding="checkbox">
          <IconButton className={classes.button} onClick={() => this.removeFilter.bind(this)(i)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <TextField
            fullWidth={true}
            name={`functional.temporal_filtering.filters.${i}.low`}
            value={configuration.getIn(["functional", "temporal_filtering", "filters", i, "low"])}
            onChange={onChange}
            helperText=''
            />
        </TableCell>
        <TableCell padding="checkbox">
          <TextField
            fullWidth={true}
            name={`functional.temporal_filtering.filters.${i}.high`}
            value={configuration.getIn(["functional", "temporal_filtering", "filters", i, "high"])}
            onChange={onChange}
            helperText=''
            />
        </TableCell>
      </TableRow>
    )
  }

  addFilter() {
    const { classes, configuration, onChange } = this.props

    const filters = configuration.getIn(['functional', 'temporal_filtering', 'filters']).push({
      low: 0.0, high: 0.0
    })

    onChange([
      [['functional', 'temporal_filtering', 'filters'], filters]
    ])
  }

  removeFilter(i) {
    const { classes, configuration, onChange } = this.props

    const filters = configuration.getIn(['functional', 'temporal_filtering', 'filters']).delete(i)

    onChange([
      [['functional', 'temporal_filtering', 'filters'], filters]
    ])

  }

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Low-frequency cutoff</TableCell>
                  <TableCell>High-frequency cutoff</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { configuration.getIn(['functional', 'temporal_filtering', 'filters']).map(this.renderFilter.bind(this)) }
              </TableBody>
              <TableFooter>
                <TableRow >
                  <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                    <Button onClick={this.addFilter.bind(this)} variant="fab" mini aria-label="Add new ROI">
                      <AddIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemporalFiltering.styles)(TemporalFiltering);
