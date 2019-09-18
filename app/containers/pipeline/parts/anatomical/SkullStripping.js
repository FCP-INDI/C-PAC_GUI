import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography, Collapse } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'
import IconButton from '@material-ui/core/IconButton'

import {
  SettingsIcon,
} from 'components/icons';

class SkullStripping extends Component {

  static styles = theme => ({
  });

  state = {
    betOptions: false,
    afniOptions: false,
  }

  handleValueChange = (event) => {
    const name = event.target.name

    const checkBoxes = [
      "anatomical.skull_stripping.methods.afni.enabled",
      "anatomical.skull_stripping.methods.bet.enabled",
      "anatomical.skull_stripping.enabled"
    ]

    if (!checkBoxes.includes(name)) {
      this.props.onChange([
        [name, event.target.value]
      ])

    } else {
      const changes = []
      const value = event.target.checked

      if (name == "anatomical.skull_stripping.enabled") {
        changes.push([name, !value])
        if (value) {
          changes.push(["anatomical.skull_stripping.methods.afni.enabled", false])
          changes.push(["anatomical.skull_stripping.methods.bet.enabled", false])
        }
      }

      const methods = [
        "anatomical.skull_stripping.methods.afni.enabled",
        "anatomical.skull_stripping.methods.bet.enabled"
      ]
      if (methods.includes(name)) {
        changes.push([name, value])
        if (value) {
          changes.push(["anatomical.skull_stripping.enabled", true])
        }
      }

      this.props.onChange(changes)
    }
  };

  handleOpenAfni = () => {
    this.setState({ afniOptions: true })
  }
  
  handleOpenBet = () => {
    this.setState({ betOptions: true })
  }
  
  handleCloseAfni = () => {
    this.setState({ afniOptions: false })
  }
  
  handleCloseBet = () => {
    this.setState({ betOptions: false })
  }

  render() {
    const { classes, configuration, advanced, onChange } = this.props

    return (
      <React.Fragment>
        <Dialog
          open={this.state.betOptions && configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'enabled'])}
          onClose={this.handleCloseBet}
          fullWidth={true}
        >
          <DialogTitle>{`FSL BET Options`}</DialogTitle>
          <DialogContent>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_frac/}
                help={`Set the threshold value controling the brain vs non-brain voxels.`}
                fullWidth
              >
                <TextField
                  label="Threshold" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.bet.configuration.threshold"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'threshold'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_radius/}
                help={`Head radius.`}
                fullWidth
              >
                <TextField
                  label="Radius" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.bet.configuration.radius"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'radius'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_vertical_gradient/}
                help={`Vertical gradient in fractional intensity threshold, ranged between -1 and 1.`}
                fullWidth
              >
                <TextField
                  label="Vertical Gradient" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.bet.configuration.vertical_gradient"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'vertical_gradient'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_threshold/}
                help={`Apply thresholding to segmented brain image and mask.`}
              >
                <FormControlLabel
                  label="Apply threshold"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.apply_threshold"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'apply_threshold'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_mask_boolean/}
                help={`Mask created along with skull stripping.`}
              >
                <FormControlLabel
                  label="Mask"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.mask"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'mask'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_mesh_boolean/}
                help={`Mesh created along with skull stripping.`}
              >
                <FormControlLabel
                  label="Mesh"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.mesh"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'mesh'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_skull/}
                help={`Create a skull image.`}
              >
                <FormControlLabel
                  label="Skull"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.skull"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'skull'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_surfaces/}
                help={`Gets additional skull and scalp surfaces by running bet2 and betsurf.`}
              >
                <FormControlLabel
                  label="Surfaces"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.surfaces"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'surfaces'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_outline/}
                help={`Create a surface outline image.`}
              >
                <FormControlLabel
                  label="Surfaces outline"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.surface_outline"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'surface_outline'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_padding/}
                help={`Add padding to the end of the image, improving BET.`}
              >
                <FormControlLabel
                  label="Padding"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.padding"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'padding'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_reduce_bias/}
                help={`Reduce bias and cleanup neck.`}
              >
                <FormControlLabel
                  label="Reduce bias"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.reduce_bias"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'reduce_bias'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_remove_eyes/}
                help={`Eyes and optic nerve cleanup.`}
              >
                <FormControlLabel
                  label="Remove eyes"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.remove_eyes"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'remove_eyes'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^bet_robust/}
                help={`Robust brain center estimation.`}
              >
                <FormControlLabel
                  label="Robust brain center"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.bet.configuration.robust_brain_center"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'configuration', 'robust_brain_center'])}
                      onChange={this.handleValueChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.afniOptions && configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'enabled'])}
          onClose={this.handleCloseAfni}
          fullWidth={true}
        >
          <DialogTitle>{`3dSkullStrip Options`}</DialogTitle>
          <DialogContent>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_fac/}
                help={`Multiply input dataset if range of values is too small.`}
                fullWidth
              >
                <TextField
                  label="Multiplier" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.multiplier"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'multiplier'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_n_iterations/}
                help={`Set the number of iterations. The number of iterations should depend upon the density of your mesh.`}
                fullWidth
              >
                <TextField
                  label="Iterations" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.iterations"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'iterations'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_fill_hole/}
                help={`Give the maximum number of pixels on either side of the hole that can be filled.`}
                fullWidth
              >
                <TextField
                  label="Fill Hole" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.fill_hole"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'fill_hole'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_NN_smooth/}
                help={`Perform nearest neighbor coordinate interpolation every few iterations.`}
                fullWidth
              >
                <TextField
                  label="Nearest Neighbors Smooth Iteration" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.nearest_neighbors_smooth"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'nearest_neighbors_smooth'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_smooth_final/}
                help={`Perform final surface smoothing after all iterations.`}
                fullWidth
              >
                <TextField
                  label="Final Smooth Iteration" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.final_smooth"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'final_smooth'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_exp_frac/}
                help={`Speed of expansion.`}
                fullWidth
              >
                <TextField
                  label="Fractional Expansion" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.fractional_expansion"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'fractional_expansion'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_perc_int/}
                help={`Percentage of segments allowed to intersect surface. It is typically a number between 0 and 0.1, but can include negative values (which implies no testing for intersection).`}
                fullWidth
              >
                <TextField
                  label="Intersection Ratio" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.intersections.ratio"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'intersections', 'ratio'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_max_inter_iter/}
                help={`Number of iterations to remove intersection problems. With each iteration, the program automatically increases the amount of smoothing to get rid of intersections.`}
                fullWidth
              >
                <TextField
                  label="Intersection Remotion Iterations" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.intersections.iterations"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'intersections', 'iterations'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_blur_fwhm/}
                help={` Blur dataset after spatial normalization. Recommended when you have lots of CSF in brain and when you have protruding gyri (finger like). If so, recommended value range is 2-4. Otherwise, leave at 0.`}
                fullWidth
              >
                <TextField
                  label="Blur FWHM" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.blur_fwhm"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'blur_fwhm'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_shrink_factor/}
                help={`Set the threshold value controlling the brain vs non-brain voxels.`}
                fullWidth
              >
                <TextField
                  label="Shrink factor threshold" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.shrink_factor.threshold"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'shrink_factor', 'threshold'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_shrink_factor_bot_lim/}
                help={`The shrink factor bottom limit sets the lower threshold when varying the shrink factor.`}
                fullWidth
              >
                <TextField
                  label="Shrink factor bottom limit" fullWidth margin="normal" variant="outlined"
                  name="anatomical.skull_stripping.methods.afni.configuration.shrink_factor.bottom_limit"
                  value={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'shrink_factor', 'bottom_limit'])}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_var_shrink_fac/}
                help={`Vary the shrink factor at every iteration of the algorithm. This prevents the likelihood of surface getting stuck in large pools of CSF before reaching the outer surface of the brain.`}
              >
                <FormControlLabel
                  label="Shrink factor vary"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.shrink_factor.vary"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'shrink_factor', 'vary'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_avoid_eyes/}
                help={`Avoid eyes while skull stripping.`}
              >
                <FormControlLabel
                  label="Avoid eyes"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.avoid_eyes"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'avoid_eyes'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_avoid_vent/}
                help={`Avoids ventricles while skull-stripping.`}
              >
                <FormControlLabel
                  label="Avoid ventricles"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.avoid_ventricles"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'avoid_ventricles'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_use_edge/}
                help={`Use edge detection to reduce leakage into meninges and eyes.`}
              >
                <FormControlLabel
                  label="Use edge"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.use_edge"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'use_edge'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_use_skull/}
                help={`Use outer skull to limit expansion of surface into the skull in case of very strong shading artifacts. Use this only if you have leakage into the skull.`}
              >
                <FormControlLabel
                  label="Use skull"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.use_skull"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'use_skull'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_pushout/}
                help={`While expanding, consider the voxels above and not only the voxels below.`}
              >
                <FormControlLabel
                  label="Pushout"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.pushout"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'pushout'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_touchup/}
                help={`Perform touchup operations at the end to include areas not covered by surface expansion.`}
              >
                <FormControlLabel
                  label="Touchup"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.touchup"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'touchup'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^skullstrip_push_to_edge/}
                help={`Perform aggressive push to edge. This might cause leakage.`}
              >
                <FormControlLabel
                  label="Push to edge"
                  control={
                    <Switch
                      name="anatomical.skull_stripping.methods.afni.configuration.push_to_edge"
                      checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'configuration', 'push_to_edge'])}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                />
              </Help>
            </FormGroup>
          </DialogContent>
        </Dialog>
        <FormControl fullWidth>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^already_skullstripped/}
              help={`If inputs are already skull stripped (i.e. the structural input data is brain-only) then you can turn on this option.`}
            >
              <FormControlLabelled label="Already skull-stripped">
                <Switch
                  name="anatomical.skull_stripping.enabled"
                  checked={!configuration.getIn("anatomical.skull_stripping.enabled".split("."))}
                  onChange={this.handleValueChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^skullstrip_option/}
              help={`Choice of using AFNI or FSL-BET to perform SkullStripping.`}
            >
              <FormControlLabel
                label="FSL BET"
                control={
                  <Switch
                    name="anatomical.skull_stripping.methods.bet.enabled"
                    checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'enabled'])}
                    onChange={this.handleValueChange}
                    color="primary"
                  />
                }
              />
              { configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'bet', 'enabled']) ?
                <IconButton
                  onClick={() => this.handleOpenBet()}>
                  <SettingsIcon />
                </IconButton>
              : null }

              <FormControlLabel
                label="AFNI 3dSkullStrip"
                control={
                  <Switch
                  name="anatomical.skull_stripping.methods.afni.enabled"
                  checked={configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'enabled'])}
                  onChange={this.handleValueChange}
                  color="primary"
                  />
                }
              />
              { configuration.getIn(['anatomical', 'skull_stripping', 'methods', 'afni', 'enabled']) ?
                <IconButton
                  onClick={() => this.handleOpenAfni()}>
                  <SettingsIcon />
                </IconButton>
              : null }
            </Help>
          </FormGroup>
        </FormControl>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(SkullStripping.styles)(SkullStripping));
