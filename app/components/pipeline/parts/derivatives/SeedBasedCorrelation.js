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


class SeedBasedCorrelation extends Component {

  static styles = theme => ({
    paper: { flexGrow: 1, padding: theme.spacing.unit, marginBottom: theme.spacing.unit * 2 },
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

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
                  <TableCell>Roi Image</TableCell>
                  <TableCell padding="checkbox">Average</TableCell>
                  <TableCell padding="checkbox">Dual Reg</TableCell>
                  <TableCell padding="checkbox">Multi Reg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell padding="checkbox">
                    <IconButton className={classes.button} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth={true}
                      name=""
                      value={'seed.nii.gz'}
                      helperText=''
                      />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={true}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={true}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={true}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow >
                  <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                    <Button  variant="fab" mini aria-label="Add new ROI">
                      <AddIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>

          <FormControlLabel
            label="Normalize time series (dual regression)"
            control={
              <Switch
                name="anatomical.skull_stripping.methods.bet.enabled"
                checked={true}
                onChange={this.handleChange}
                color="primary"
              />
            }
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(SeedBasedCorrelation.styles)(SeedBasedCorrelation);
