import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'

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
import { fromJS } from 'immutable';

import FormControlLabelled from 'components/FormControlLabelled'
import Help from 'components/Help'

import {
  AddIcon,
  DeleteIcon
} from '../../../../components/icons';

class NuisanceRegression extends Component {

  static styles = theme => ({
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

  addRegressor = (event) => {
    const { configuration, onChange } = this.props
    const next = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).size

    onChange([
      [
        `functional.nuisance_regression.regressors.${next}`,
        fromJS({
          gray_matter: false,
          white_matter: false,
          cerebrospinal_fluid: false,
          compcor: false,
          global: false,
          principal_component: false,
          motion: false,
          linear: false,
          quadratic: false,
        })
      ]
    ])
  }

  removeRegressor(i) {
    const { classes, configuration, onChange } = this.props
    const regressor = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).delete(i)

    onChange([
      [['functional', 'nuisance_regression', 'regressors'], regressor]
    ])

  }

  renderRegressor(regressor, i) {
    const { classes, configuration, onChange } = this.props

    return (
      <TableRow key={i}>
        <TableCell padding="checkbox">
          <IconButton className={classes.button} onClick={() => this.removeRegressor.bind(this)(i)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.gray_matter`}
            onChange={onChange}
            checked={regressor.get('gray_matter')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.white_matter`}
            onChange={onChange}
            checked={regressor.get('white_matter')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.cerebrospinal_fluid`}
            onChange={onChange}
            checked={regressor.get('cerebrospinal_fluid')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.compcor`}
            onChange={onChange}
            checked={regressor.get('compcor')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.global`}
            onChange={onChange}
            checked={regressor.get('global')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.principal_component`}
            onChange={onChange}
            checked={regressor.get('principal_component')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.motion`}
            onChange={onChange}
            checked={regressor.get('motion')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.linear`}
            onChange={onChange}
            checked={regressor.get('linear')}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            name={`functional.nuisance_regression.regressors.${i}.quadratic`}
            onChange={onChange}
            checked={regressor.get('quadratic')}
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
          <Help
            type="pipeline"
            regex={/^lateral_ventricles_mask/}
            help={`Standard Lateral Ventricles Binary Mask.`}
            fullWidth
          >
            <TextField
              label="Lateral Ventricles Mask"
              name="functional.nuisance_regression.lateral_ventricles_mask"
              value={configuration.getIn(["functional", "nuisance_regression", "lateral_ventricles_mask"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^nComponents/}
            help={`Number of Principle Components to calculate when running CompCor. We recommend 5 or 6.`}
            fullWidth
          >
            <TextField
              label="CompCor Components"
              name="functional.nuisance_regression.compcor_components"
              value={configuration.getIn(["functional", "nuisance_regression", "compcor_components"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              helperText=''
            />
          </Help>


          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^runFristonModel/}
              help={`Use the Friston 24-Parameter Model during volume realignment. If this option is turned off, only 6 parameters will be used.`}
            >
              <FormControlLabelled
                label="Use Friston's 24 motion regressors">
                <Switch
                  name="functional.nuisance_regression.friston_motion_regressors"
                  checked={configuration.getIn(["functional", "nuisance_regression", "friston_motion_regressors"])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          <Grid container>
            <Grid item xs={6}>
              <FormGroup>
                <FormLabel>
                  <Help
                    type="pipeline"
                    regex={/^runMotionSpike/}
                    help={`Remove or regress out volumes exhibiting excessive motion. Each of these options are mutually exclusive, and selecting more than one will create a new pipeline fork for each option. For example, de-spiking and scrubbing will not run within the same pipeline strategy.`}
                  />
                  Motion Spike De-noising
                </FormLabel>
                <FormGroup row>
                  <FormControlLabelled
                    label="No De-noising">
                    <Switch
                      name="functional.nuisance_regression.spike_denoising.no_denoising"
                      checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "no_denoising"])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled
                    label="De-spiking">
                    <Switch
                      name="functional.nuisance_regression.spike_denoising.despiking"
                      checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "despiking"])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled
                    label="Scrubbing">
                    <Switch
                      name="functional.nuisance_regression.spike_denoising.scrubbing"
                      checked={configuration.getIn(["functional", "nuisance_regression", "spike_denoising", "scrubbing"])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <Help
                type="pipeline"
                regex={/^fdCalc/}
                help={`Choose which Framewise Displacement (FD) calculation to apply the threshold to during de-spiking or scrubbing.`}
                fullWidth
              >
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
              </Help>
              <Help
                type="pipeline"
                regex={/^spikeThreshold/}
                help={`Specify the maximum acceptable Framewise Displacement (FD) in millimeters. Any volume exhibiting FD greater than the value will be regressed out or scrubbed.`}
                fullWidth
              >
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
              </Help>
            </Grid>
            <Grid item xs={6}>
              <Help
                type="pipeline"
                regex={/^numRemovePrecedingFrames/}
                help={`Number of volumes to de-spike or scrub preceding a volume with excessive FD.`}
                fullWidth
              >
                <TextField
                  label="Preceding volumes to De-noise"
                  name="functional.nuisance_regression.pre_volumes"
                  value={configuration.getIn(["functional", "nuisance_regression", "pre_volumes"])}
                  onChange={onChange}
                  fullWidth={true} margin="normal" variant="outlined"
                  helperText=''
                />
              </Help>
            </Grid>
            <Grid item xs={6}>
              <Help
                type="pipeline"
                regex={/^numRemoveSubsequentFrames/}
                help={`Number of volumes to de-spike or scrub subsequent to a volume with excessive FD.`}
                fullWidth
              >
                <TextField
                  label="Subsequent volumes to De-noise"
                  name="functional.nuisance_regression.post_volumes"
                  value={configuration.getIn(["functional", "nuisance_regression", "post_volumes"])}
                  onChange={onChange}
                  fullWidth={true} margin="normal" variant="outlined"
                  helperText=''
                />
              </Help>
            </Grid>
          </Grid>

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Help
                    type="pipeline"
                    regex={/^Regressors/}
                    help={`Select which nuisance signal corrections to apply.`}
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  Grey Matter
                </TableCell>
                <TableCell padding="checkbox">
                  White Matter
                </TableCell>
                <TableCell padding="checkbox">
                  Cerebrospinal Fluid
                </TableCell>
                <TableCell padding="checkbox">
                  Compcor
                </TableCell>
                <TableCell padding="checkbox">
                  Global Signal
                </TableCell>
                <TableCell padding="checkbox">
                  Principal Component
                </TableCell>
                <TableCell padding="checkbox">
                  Motion
                </TableCell>
                <TableCell padding="checkbox">
                  Linear
                </TableCell>
                <TableCell padding="checkbox">
                  Quadratic
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { configuration.getIn(['functional', 'nuisance_regression', 'regressors']).map(this.renderRegressor.bind(this)) }
            </TableBody>
            <TableFooter>
              <TableRow >
                <TableCell padding="checkbox" colSpan={10} className={classes.footer}>
                  <Button onClick={this.addRegressor.bind(this)} variant="fab" mini>
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
