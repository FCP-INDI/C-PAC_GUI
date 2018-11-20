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
import { fromJS } from 'immutable';


class SeedBasedCorrelation extends Component {

  static styles = theme => ({
    paper: { flexGrow: 1, padding: theme.spacing.unit, marginBottom: theme.spacing.unit * 2 },
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

  addMask = (event) => {
    const { configuration, onChange } = this.props
    const next = configuration.getIn(['derivatives', 'sca', 'masks']).size

    onChange([
      [
        `derivatives.sca.masks.${next}`,
        fromJS({
          mask: '',
          average: false,
          dual_regression: false,
          multiple_regression: false,
        })
      ]
    ])
  }

  removeMask = (i) => {
    const { classes, configuration, onChange } = this.props
    const masks = configuration.getIn(['derivatives', 'sca', 'masks']).delete(i)
    onChange([[['derivatives', 'sca', 'masks'], masks]])
  }

  render() {
    const { classes, configuration, onChange } = this.props

    const config = configuration.getIn(['derivatives', 'sca'])

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
                      name={`derivatives.sca.masks.${i}.mask`}
                      onChange={onChange}
                      value={mask.get('mask')}
                      helperText=''
                      />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.sca.masks.${i}.average`}
                      onChange={onChange}
                      checked={mask.get('average')}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.sca.masks.${i}.dual_regression`}
                      onChange={onChange}
                      checked={mask.get('dual_regression')}
                    />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={`derivatives.sca.masks.${i}.multiple_regression`}
                      onChange={onChange}
                      checked={mask.get('multiple_regression')}
                    />
                  </TableCell>
                </TableRow>
              )))}
              </TableBody>
              <TableFooter>
                <TableRow >
                  <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                    <Button onClick={this.addMask} variant="fab" mini aria-label="Add new ROI">
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
                name="derivatives.sca.normalize"
                checked={config.get('normalize')}
                onChange={onChange}
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
