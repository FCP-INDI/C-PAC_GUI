import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

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


class NuisanceRegression extends Component {

  static styles = theme => ({
  });

  renderRegressor(regressor, i) {
    const { classes, configuration, onChange } = this.props

    return (
      <TableRow key={i}>
        <TableCell padding="checkbox">
          <IconButton className={classes.button} onClick={() => this.removeFilter.bind(this)(i)}>
            <DeleteIcon />
          </IconButton>
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
    )
  }

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <TextField
            label="Lateral Ventricles Mask"
            name="functional.nuisance_regression.lateral_ventricles_mask"
            value={configuration.getIn(["functional", "nuisance_regression", "lateral_ventricles_mask"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="CompCor Components"
            name="functional.nuisance_regression.compcor_components"
            value={configuration.getIn(["functional", "nuisance_regression", "compcor_components"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <FormGroup row>
            <FormControlLabel
              label="Use Frinston's 24 motion regressors"
              control={
                <Switch
                  name="functional.nuisance_regression.friston_motion_regressors"
                  checked={configuration.getIn(["functional", "nuisance_regression", "friston_motion_regressors"])}
                  onChange={onChange}
                  color="primary"
                />
              }
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Motion Spike De-noising</FormLabel>
            <FormGroup row>
              <FormControlLabel
                label="No De-noising"
                control={
                  <Switch
                    name="functional.nuisance_regression.spike_denoising.no_denoising"
                    checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "no_denoising"])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="De-spiking"
                control={
                  <Switch
                    name="functional.nuisance_regression.spike_denoising.despiking"
                    checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "despiking"])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                label="Scrubbing"
                control={
                  <Switch
                    name="functional.nuisance_regression.spike_denoising.scrubbing"
                    checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "scrubbing"])}
                    onChange={onChange}
                    color="primary"
                  />
                }
              />
            </FormGroup>
          </FormGroup>

          <TextField
            select
            label="Framewise Displacement (FD) Calculation"
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField}
            name="functional.nuisance_regression.fd_calculation"
            value={configuration.getIn(["functional", "nuisance_regression", "fd_calculation"])}
            onChange={onChange}
            helperText=''
          >
            <MenuItem value={"jenkinson"}>Jenkinson</MenuItem>
            <MenuItem value={"power"}>Power</MenuItem>
          </TextField>

          <TextField
            label="Framewise Displacement (FD) Threshold"
            fullWidth={true} margin="normal" variant="outlined"
            name="functional.nuisance_regression.fd_threshold"
            value={configuration.getIn(["functional", "nuisance_regression", "fd_threshold"])}
            onChange={onChange}
            helperText=''
            InputProps={{
              endAdornment: <InputAdornment position="end">mm</InputAdornment>,
            }}
          />

          <TextField
            label="Preceding volumes to De-noise"
            name="functional.nuisance_regression.pre_volumes"
            value={configuration.getIn(["functional", "nuisance_regression", "pre_volumes"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Subsequent volumes to De-noise"
            name="functional.nuisance_regression.post_volumes"
            value={configuration.getIn(["functional", "nuisance_regression", "post_volumes"])}
            onChange={onChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { configuration.getIn(['functional', 'nuisance_regression', 'regressors']).map(this.renderRegressor.bind(this)) }
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
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NuisanceRegression.styles)(NuisanceRegression);
