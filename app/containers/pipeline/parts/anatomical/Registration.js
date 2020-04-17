import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import {
  SettingsIcon,
} from 'components/icons';


class Registration extends Component {

  static styles = theme => ({
  });

  state = {
    antsParaOptions: false,
  }

  handleOpen = () => {
    this.setState({ antsParaOptions: true })
  }

  handleClose = () => {
    this.setState({ antsParaOptions: false })
  }

  render() {
    // const { classes, configuration, onChange } = this.props
    const { classes, configuration, advanced, onChange } = this.props

    const resolution = configuration.getIn("anatomical.registration.resolution".split("."))

    return (
      <React.Fragment>
        <Help
          type="pipeline"
          regex={/^resolution_for_anat/}
          help={`The resolution to which anatomical images should be transformed during registration. This is the resolution at which processed anatomical files will be output.
          Optional input types: 1 one integer or float number indicating 3 same dimensions, e.g. 3 or 2.5; 2 three different integers or float numbers connected by 'x', e.g. 3x2.67x2.67. `}
          fullWidth
        >
          <InputLabel>Resolution</InputLabel>
          {
          
            resolution.size !== undefined ?

            <Grid container>
              <Grid item xs={4}>
                <TextField
                  name="anatomical.registration.resolution.0"
                  value={resolution.get(0)}
                  onChange={onChange}
                  fullWidth margin="normal" variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="anatomical.registration.resolution.1"
                  value={resolution.get(1)}
                  onChange={onChange}
                  fullWidth margin="normal" variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="anatomical.registration.resolution.2"
                  value={resolution.get(2)}
                  onChange={onChange}
                  fullWidth margin="normal" variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>

            :
            
            <TextField label="Resolution"
              name="anatomical.registration.resolution"
              value={resolution}
              onChange={function(event) {
                if (event.target.value.includes("x")) {
                  let values = event.target.value.replace(/[^0-9\.x]/, '').split("x").filter(Boolean).map(parseFloat)
                  values = [...values, ...values, ...values].slice(0, 3)
                  onChange(
                    [[['anatomical', 'registration', 'resolution'], values]]
                  )
                } else {
                  onChange(event)
                }
              }}
              fullWidth margin="normal" variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
              }}
            />
          }
        </Help>

        <FormGroup>
          <FormLabel>
            <Help
              help={`Templates to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
            />
            Templates
          </FormLabel>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^template_brain_only_for_anat/}
              help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
              fullWidth
            >
              <TextField label="Brain" fullWidth margin="normal" variant="outlined"
                        name="anatomical.registration.brain_template"
                        value={configuration.getIn("anatomical.registration.brain_template".split("."))}
                        onChange={onChange}
              />
            </Help>
          </FormGroup>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^template_skull_for_anat/}
              help={`Template to be used during registration. It is not necessary to change this path unless you intend to use a non-standard template.`}
              fullWidth
            >
              <TextField label="Skull" fullWidth margin="normal" variant="outlined"
                          name="anatomical.registration.skull_template"
                          value={configuration.getIn("anatomical.registration.skull_template".split("."))}
                          onChange={onChange} />
            </Help>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <FormLabel>
            <Help
              type="pipeline"
              regex={/^regOption/}
              help={`Use either ANTS or FSL (FLIRT and FNIRT) as your anatomical registration method.`}
            />
            Methods
          </FormLabel>

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabelled label="ANTS">
                  <Switch
                    name="anatomical.registration.methods.ants.enabled"
                    checked={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="FSL FLIRT/FNIRT">
                  <Switch
                    name="anatomical.registration.methods.fsl.enabled"
                    checked={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Specific options for fine tuning the ANTS registration.`}
                    />
                    ANTS options
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^regWithSkull/}
                      help={`Register skull-on anatomical image to template. Calculating the transform with skull-stripped images is reported to be better, but it requires very high-quality skull-stripping. If skull-stripping is imprecise, registration with skull is preferred. This option only affects ANTS due to the fact that FNIRT already uses skull-on images for calculating warps.`}
                    >
                      <FormControlLabelled label="ANTS Skull-on Transform">
                        <Switch
                          name="anatomical.registration.methods.ants.configuration.skull_on"
                          checked={configuration.getIn("anatomical.registration.methods.ants.configuration.skull_on".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^use_lesion_mask/}
                      help={`Use lesion mask for better registration, when available.`}
                    >
                      <FormControlLabelled label="Use lesion mask when available">
                        <Switch
                          name="anatomical.registration.methods.ants.configuration.lesion_mask"
                          checked={configuration.getIn("anatomical.registration.methods.ants.configuration.lesion_mask".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>

                  <Grid item xs={8}>
                    <Help
                        type="pipeline"
                        regex={/^anatRegANTSinterpolation/}
                        help={`We provide a choice of interpolation options (Linear, LanczosWindowedSinc, or BSpline), set LanczosWindowedSinc as the default.`}
                        fullWidth
                      >
                        <TextField
                          select
                          label="Interpolation Option for ANTS"
                          fullWidth margin="normal" variant="outlined"
                          className={classes.textField} onChange={onChange}
                          name="anatomical.registration.methods.ants.interpolation"
                          value={configuration.getIn("anatomical.registration.methods.ants.interpolation".split("."))}
                          helperText=''
                        >
                          <MenuItem value={"linear"}>Linear</MenuItem>
                          <MenuItem value={"sinc"}>LanczosWindowedSinc</MenuItem>
                          <MenuItem value={"spline"}>BSpline</MenuItem>
                        </TextField>
                      </Help>
                    </Grid>

                  <FormLabel>
                    ANTs Registration Parameters
                    {/* add icon button to set ants parameters */}
                    {configuration.getIn(['anatomical', 'registration', 'methods', 'ants', 'enabled']) ?
                      <IconButton
                        onClick={() => this.handleOpen()}>
                        <SettingsIcon />
                      </IconButton>
                      : null}
                      <Help
                        type="pipeline"
                        regex={/^ANTs_para_T1_registration/}
                        help={`Please specify ANTs parameters,if run anatomical to T1 Template Registration with ANTs. `}
                        fullWidth
                      ></Help>
                  </FormLabel>

                  {/* ants_para expanding */}
                  <Dialog
                    open={this.state.antsParaOptions && configuration.getIn(['anatomical', 'registration', 'methods', 'ants', 'enabled'])}
                    onClose={this.handleClose}
                    fullWidth={true}
                  >
                    <DialogTitle>{`ANTs Registration Parameters Options`}</DialogTitle>
                    <DialogContent>

                    {/* collapse-output-transforms */}
                    <FormGroup row>
                      <Help
                        type="pipeline"
                        help={`--collapse-output-transforms (1)/0
                            Collapse output transforms. Specifically, enabling this option combines all 
                            adjacent transforms wherepossible. All adjacent linear transforms are written to 
                            disk in the forman itk affine transform (called xxxGenericAffine.mat). 
                            Similarly, all adjacent displacement field transforms are combined when written 
                            to disk (e.g. xxxWarp.nii.gz and xxxInverseWarp.nii.gz (if available)).Also, an 
                            output composite transform including the collapsed transforms is written to the 
                            disk (called outputCollapsed(Inverse)Composite). `}
                        fullWidth
                      >
                        <TextField label="collapse-output-transforms"
                          fullWidth margin="normal" variant="outlined"
                          name="anatomical.registration.methods.ants.ANTs_para_T1_registration.collapse_output_transforms"
                          value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.collapse_output_transforms".split("."))}
                          onChange={onChange}
                        />
                      </Help>
                    </FormGroup>

                    {/* dimensionality */}
                    <FormGroup row>
                      <Help
                        type="pipeline"
                        help={`--dimensionality 2/3/4
                            This option forces the image to be treated as a specified-dimensional image. If 
                            not specified, we try to infer the dimensionality from the input image. `}
                        fullWidth
                      >
                        <TextField label="dimensionality"
                          fullWidth margin="normal" variant="outlined"
                          name="anatomical.registration.methods.ants.ANTs_para_T1_registration.dimensionality"
                          value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.dimensionality".split("."))}
                          onChange={onChange}
                        />
                      </Help>
                    </FormGroup>

                    {/* initial-fixed-transform */}
                    <FormGroup row>
                      <Help
                        type="pipeline"
                        help={` --initial-fixed-transform [fixedImage,movingImage,initializationFeature]
                            Specify the initial fixed transform(s) which get immediately incorporated into 
                            the composite transform. The order of the transforms is stack-esque in that the 
                            last transform specified on the command line is the first to be applied. In 
                            addition to initialization with ITK transforms, the user can perform an initial 
                            translation alignment by specifying the fixed and moving images and selecting an 
                            initialization feature. These features include using the geometric center of the 
                            images (=0), the image intensities (=1), or the origin of the images (=2). `}
                        fullWidth
                      >
                        <TextField label="initial-moving-transform  initializationFeature"
                          fullWidth margin="normal" variant="outlined"
                          name="anatomical.registration.methods.ants.ANTs_para_T1_registration.initial_moving_transform.initializationFeature"
                          value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.initial_moving_transform.initializationFeature".split("."))}
                          onChange={onChange}
                        />
                      </Help>
                    </FormGroup>

                    {/* expand transform Rigid. TODO: make transforms(Rigid,Affine,SyN) for loop */}
                    <FormGroup>
                      <FormGroup row>
                        <FormControlLabelled label="Transform Rigid">
                          <Switch
                            name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.enabled"
                            checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>

                      <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.enabled".split("."))}>
                        {/* gradientStep */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --transform Rigid[gradientStep]
                                Several transform options are available. The gradientStep or learningRate 
                                characterizes the gradient descent optimization and is scaled appropriately for 
                                each transform using the shift scales estimator. Subsequent parameters are 
                                transform-specific and can be determined from the usage. `}
                              fullWidth
                            />
                          Rigid gradientStep
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets 0.1 as Rigid gradientStep default value.`}
                              fullWidth
                            >
                              <TextField label="gradientStep"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.gradientStep"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.gradientStep".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* metric */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` Available image metrics provided by CPAC are CC (ANTS neighborhood cross correlation) and MI (Mutual information).`}
                              fullWidth
                            />
                        Metric
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric MI: Mutual information
                                  MI[fixedImage,movingImage,metricWeight,numberOfBins,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric MI">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set 32 as numberOfBins default value.`}
                                fullWidth
                              >
                                <TextField label="MI numberOfBins"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.numberOfBins".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>


                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`CPAC provides a choice of samplingStrategy (None,Regular, or Random), set Regular as the default.`}
                                fullWidth
                              >
                                <TextField
                                  select
                                  label="MI samplingStrategy"
                                  fullWidth margin="normal" variant="outlined"
                                  className={classes.textField} onChange={onChange}
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.samplingStrategy".split("."))}
                                  helperText=''
                                >
                                  <MenuItem value={"None"}>None</MenuItem>
                                  <MenuItem value={"Regular"}>Regular</MenuItem>
                                  <MenuItem value={"Random"}>Random</MenuItem>
                                </TextField>
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`samplingPercentage defines the fraction of points to select from the domain.`}
                                fullWidth
                              >
                                <TextField label="MI samplingPercentage"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.MI.samplingPercentage".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>

                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric CC: ANTS neighborhood cross correlation
                                    CC[fixedImage,movingImage,metricWeight,radius,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric CC">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.Rigid.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set '4' as CC radius default value.`}
                                fullWidth
                              >
                                <TextField label="CC radius"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.radius"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.metric.type.CC.radius".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>
                        </FormGroup>

                        {/* convergence */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --convergence MxNxO
                                    [MxNxO,<convergenceThreshold=1e-6>,<convergenceWindowSize=10>]
                                    Convergence is determined from the number of iterations per level and is 
                                    determined by fitting a line to the normalized energy profile of the last N 
                                    iterations (where N is specified by the window size) and determining the slope 
                                    which is then compared with the convergence threshold.`}
                              fullWidth
                            />
                          Convergence
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '1000x500x250x100' as convergence iteration default value.`}
                              fullWidth
                            >
                              <TextField label="convergence iteration"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.iteration"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.iteration".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '1e-08' as convergence Threshold default value.`}
                              fullWidth
                            >
                              <TextField label="convergence Threshold"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.convergenceThreshold"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.convergenceThreshold".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '10' as convergence WindowSize default value.`}
                              fullWidth
                            >
                              <TextField label="convergence WindowSize"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.convergenceWindowSize"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.convergence.convergenceWindowSize".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* smoothing-sigmas */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --smoothing-sigmas MxNxO...
                                    Specify the sigma of gaussian smoothing at each level. Units are given in terms 
                                    of voxels ('vox') or physical spacing ('mm'). Example usage is '4x2x1mm' and 
                                    '4x2x1vox' where no units implies voxel spacing. `}
                              fullWidth
                            />
                          Smoothing sigmas
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '3.0x2.0x1.0x0.0' as smoothing sigmas default value.`}
                              fullWidth
                            >
                              <TextField label="smoothing sigmas"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.smoothing_sigmas"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.smoothing_sigmas".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* shrink_factors */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --shrink-factors MxNxO...
                                    Specify the shrink factor for the virtual domain (typically the fixed image) at 
                                    each level. `}
                              fullWidth
                            />
                          Shrink factors
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '8x4x2x1' as shrink factors default value.`}
                              fullWidth
                            >
                              <TextField label="shrink factors"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.shrink_factors"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.shrink_factors".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* use_histogram_matching */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --use-histogram-matching 
                                    Histogram match the images before registration. `}
                              fullWidth
                            />
                          Use histogram matching
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC default is True.`}
                              fullWidth
                            >
                              <TextField
                                select
                                label="use histogram matching"
                                fullWidth margin="normal" variant="outlined"
                                className={classes.textField} onChange={onChange}
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.use_histogram_matching"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Rigid.use_histogram_matching".split("."))}
                                helperText=''
                              >
                                <MenuItem value={"true"}>True</MenuItem>
                                <MenuItem value={"false"}>False</MenuItem>
                              </TextField>
                            </Help>
                          </FormGroup>
                        </FormGroup>
                      </Collapse>
                    </FormGroup>

                    {/* expand transform Affine. TODO: make transforms(Rigid,Affine,SyN) for loop */}
                    <FormGroup>
                      <FormGroup row>
                        <FormControlLabelled label="Transform Affine">
                          <Switch
                            name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.enabled"
                            checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>

                      <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.enabled".split("."))}>
                        {/* gradientStep */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --transform Affine[gradientStep]
                                Several transform options are available. The gradientStep or learningRate 
                                characterizes the gradient descent optimization and is scaled appropriately for 
                                each transform using the shift scales estimator. Subsequent parameters are 
                                transform-specific and can be determined from the usage. `}
                              fullWidth
                            />
                          Affine gradientStep
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets 0.1 as Affine gradientStep default value.`}
                              fullWidth
                            >
                              <TextField label="gradientStep"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.gradientStep"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.gradientStep".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* metric */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` Available image metrics provided by CPAC are CC (ANTS neighborhood cross correlation) and MI (Mutual information).`}
                              fullWidth
                            />
                        Metric
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric MI: Mutual information
                                  MI[fixedImage,movingImage,metricWeight,numberOfBins,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric MI">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set 32 as numberOfBins default value.`}
                                fullWidth
                              >
                                <TextField label="MI numberOfBins"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.numberOfBins".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>


                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`CPAC provides a choice of samplingStrategy (None,Regular, or Random), set Regular as the default.`}
                                fullWidth
                              >
                                <TextField
                                  select
                                  label="MI samplingStrategy"
                                  fullWidth margin="normal" variant="outlined"
                                  className={classes.textField} onChange={onChange}
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.samplingStrategy".split("."))}
                                  helperText=''
                                >
                                  <MenuItem value={"None"}>None</MenuItem>
                                  <MenuItem value={"Regular"}>Regular</MenuItem>
                                  <MenuItem value={"Random"}>Random</MenuItem>
                                </TextField>
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`samplingPercentage defines the fraction of points to select from the domain.`}
                                fullWidth
                              >
                                <TextField label="MI samplingPercentage"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.MI.samplingPercentage".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>

                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric CC: ANTS neighborhood cross correlation
                                    CC[fixedImage,movingImage,metricWeight,radius,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric CC">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.Affine.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set '4' as CC radius default value.`}
                                fullWidth
                              >
                                <TextField label="CC radius"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.radius"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.metric.type.CC.radius".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>
                        </FormGroup>

                        {/* convergence */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --convergence MxNxO
                                    [MxNxO,<convergenceThreshold=1e-6>,<convergenceWindowSize=10>]
                                    Convergence is determined from the number of iterations per level and is 
                                    determined by fitting a line to the normalized energy profile of the last N 
                                    iterations (where N is specified by the window size) and determining the slope 
                                    which is then compared with the convergence threshold.`}
                              fullWidth
                            />
                          Convergence
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '1000x500x250x100' as convergence iteration default value.`}
                              fullWidth
                            >
                              <TextField label="convergence iteration"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.iteration"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.iteration".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '1e-08' as convergence Threshold default value.`}
                              fullWidth
                            >
                              <TextField label="convergence Threshold"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.convergenceThreshold"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.convergenceThreshold".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '10' as convergence WindowSize default value.`}
                              fullWidth
                            >
                              <TextField label="convergence WindowSize"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.convergenceWindowSize"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.convergence.convergenceWindowSize".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* smoothing-sigmas */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --smoothing-sigmas MxNxO...
                                    Specify the sigma of gaussian smoothing at each level. Units are given in terms 
                                    of voxels ('vox') or physical spacing ('mm'). Example usage is '4x2x1mm' and 
                                    '4x2x1vox' where no units implies voxel spacing. `}
                              fullWidth
                            />
                          Smoothing sigmas
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '3.0x2.0x1.0x0.0' as smoothing sigmas default value.`}
                              fullWidth
                            >
                              <TextField label="smoothing sigmas"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.smoothing_sigmas"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.smoothing_sigmas".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* shrink_factors */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --shrink-factors MxNxO...
                                    Specify the shrink factor for the virtual domain (typically the fixed image) at 
                                    each level. `}
                              fullWidth
                            />
                          Shrink factors
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '8x4x2x1' as shrink factors default value.`}
                              fullWidth
                            >
                              <TextField label="shrink factors"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.shrink_factors"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.shrink_factors".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* use_histogram_matching */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --use-histogram-matching 
                                    Histogram match the images before registration. `}
                              fullWidth
                            />
                          Use histogram matching
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC default is True.`}
                              fullWidth
                            >
                              <TextField
                                select
                                label="use histogram matching"
                                fullWidth margin="normal" variant="outlined"
                                className={classes.textField} onChange={onChange}
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.use_histogram_matching"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.Affine.use_histogram_matching".split("."))}
                                helperText=''
                              >
                                <MenuItem value={"true"}>True</MenuItem>
                                <MenuItem value={"false"}>False</MenuItem>
                              </TextField>
                            </Help>
                          </FormGroup>
                        </FormGroup>
                      </Collapse>
                    </FormGroup>

                    {/* expand transform SyN. TODO: make transforms(Rigid,Affine,SyN) for loop */}
                    <FormGroup>
                      <FormGroup row>
                        <FormControlLabelled label="Transform SyN">
                          <Switch
                            name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.enabled"
                            checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>

                      <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.enabled".split("."))}>
                        {/* gradientStep */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --transform SyN[gradientStep,<updateFieldVarianceInVoxelSpace=3>,<totalFieldVarianceInVoxelSpace=0>]
                                Several transform options are available. The gradientStep or learningRate 
                                characterizes the gradient descent optimization and is scaled appropriately for 
                                each transform using the shift scales estimator. Subsequent parameters are 
                                transform-specific and can be determined from the usage.`}
                              fullWidth
                            />
                          SyN parameters
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets 0.1 as SyN gradientStep default value.`}
                              fullWidth
                            >
                              <TextField label="gradientStep"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.gradientStep"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.gradientStep".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets 3.0 as SyN updateFieldVarianceInVoxelSpace default value.`}
                              fullWidth
                            >
                              <TextField label="updateFieldVarianceInVoxelSpace"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.updateFieldVarianceInVoxelSpace"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.updateFieldVarianceInVoxelSpace".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets 0.0 as SyN totalFieldVarianceInVoxelSpace default value.`}
                              fullWidth
                            >
                              <TextField label="totalFieldVarianceInVoxelSpace"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.totalFieldVarianceInVoxelSpace"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.totalFieldVarianceInVoxelSpace".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* metric */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` Available image metrics provided by CPAC are CC (ANTS neighborhood cross correlation) and MI (Mutual information).`}
                              fullWidth
                            />
                        Metric
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric MI: Mutual information
                                  MI[fixedImage,movingImage,metricWeight,numberOfBins,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric MI">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set 32 as numberOfBins default value.`}
                                fullWidth
                              >
                                <TextField label="MI numberOfBins"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.numberOfBins".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>


                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`CPAC provides a choice of samplingStrategy (None,Regular, or Random), set Regular as the default.`}
                                fullWidth
                              >
                                <TextField
                                  select
                                  label="MI samplingStrategy"
                                  fullWidth margin="normal" variant="outlined"
                                  className={classes.textField} onChange={onChange}
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.samplingStrategy".split("."))}
                                  helperText=''
                                >
                                  <MenuItem value={"None"}>None</MenuItem>
                                  <MenuItem value={"Regular"}>Regular</MenuItem>
                                  <MenuItem value={"Random"}>Random</MenuItem>
                                </TextField>
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`samplingPercentage defines the fraction of points to select from the domain.`}
                                fullWidth
                              >
                                <TextField label="MI samplingPercentage"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.MI.samplingPercentage".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>

                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={` --metric CC: ANTS neighborhood cross correlation
                                    CC[fixedImage,movingImage,metricWeight,radius,<samplingStrategy={None,Regular,Random}>,<samplingPercentage=[0,1]>]`}
                            >
                              <FormControlLabelled label="Metric CC">
                                <Switch
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.enabled"
                                  checked={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.SyN.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.metricWeight"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.metricWeight".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>

                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={`Set '4' as CC radius default value.`}
                                fullWidth
                              >
                                <TextField label="CC radius"
                                  fullWidth margin="normal" variant="outlined"
                                  name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.radius"
                                  value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.metric.type.CC.radius".split("."))}
                                  onChange={onChange}
                                />
                              </Help>
                            </FormGroup>
                          </Collapse>
                        </FormGroup>

                        {/* convergence */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --convergence MxNxO
                                    [MxNxO,<convergenceThreshold=1e-6>,<convergenceWindowSize=10>]
                                    Convergence is determined from the number of iterations per level and is 
                                    determined by fitting a line to the normalized energy profile of the last N 
                                    iterations (where N is specified by the window size) and determining the slope 
                                    which is then compared with the convergence threshold.`}
                              fullWidth
                            />
                          Convergence
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '100x100x70x20' as convergence iteration default value.`}
                              fullWidth
                            >
                              <TextField label="convergence iteration"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.iteration"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.iteration".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '1e-09' as convergence Threshold default value.`}
                              fullWidth
                            >
                              <TextField label="convergence Threshold"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.convergenceThreshold"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.convergenceThreshold".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '15' as convergence WindowSize default value.`}
                              fullWidth
                            >
                              <TextField label="convergence WindowSize"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.convergenceWindowSize"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.convergence.convergenceWindowSize".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* smoothing-sigmas */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --smoothing-sigmas MxNxO...
                                    Specify the sigma of gaussian smoothing at each level. Units are given in terms 
                                    of voxels ('vox') or physical spacing ('mm'). Example usage is '4x2x1mm' and 
                                    '4x2x1vox' where no units implies voxel spacing. `}
                              fullWidth
                            />
                          Smoothing sigmas
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '3.0x2.0x1.0x0.0' as smoothing sigmas default value.`}
                              fullWidth
                            >
                              <TextField label="smoothing sigmas"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.smoothing_sigmas"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.smoothing_sigmas".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* shrink_factors */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --shrink-factors MxNxO...
                                    Specify the shrink factor for the virtual domain (typically the fixed image) at 
                                    each level. `}
                              fullWidth
                            />
                          Shrink factors
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '6x4x2x1' as shrink factors default value.`}
                              fullWidth
                            >
                              <TextField label="shrink factors"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.shrink_factors"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.shrink_factors".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* use_histogram_matching */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={` --use-histogram-matching 
                                    Histogram match the images before registration. `}
                              fullWidth
                            />
                          Use histogram matching
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC default is True.`}
                              fullWidth
                            >
                              <TextField
                                select
                                label="use histogram matching"
                                fullWidth margin="normal" variant="outlined"
                                className={classes.textField} onChange={onChange}
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.use_histogram_matching"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.use_histogram_matching".split("."))}
                                helperText=''
                              >
                                <MenuItem value={"true"}>True</MenuItem>
                                <MenuItem value={"false"}>False</MenuItem>
                              </TextField>
                            </Help>
                          </FormGroup>
                        </FormGroup>

                        {/* winsoriz_image_intensities */}
                        <FormGroup>
                          <FormLabel>
                            <Help
                              type="pipeline"
                              help={`--winsorize-image-intensities [lowerQuantile,upperQuantile]
                                  Winsorize data based on specified quantiles.`}
                              fullWidth
                            />
                          Winsorize image intensities
                        </FormLabel>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '0.01' as winsorize image intensities lowerQuantile default value.`}
                              fullWidth
                            >
                              <TextField label="lowerQuantile"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.winsorize_image_intensities.lowerQuantile"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.winsorize_image_intensities.lowerQuantile".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                          <FormGroup row>
                            <Help
                              type="pipeline"
                              help={`CPAC sets '0.99' as winsorize image intensities upperQuantile default value.`}
                              fullWidth
                            >
                              <TextField label="upperQuantile"
                                fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.winsorize_image_intensities.upperQuantile"
                                value={configuration.getIn("anatomical.registration.methods.ants.ANTs_para_T1_registration.transforms.SyN.winsorize_image_intensities.upperQuantile".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>
                      </Collapse>
                    </FormGroup>
   
                    </DialogContent>
                  </Dialog>

                  {/* end ants param expand */}
                </FormGroup>
              </Collapse>
              <Collapse in={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      help={`Specific options for fine tuning the FLIRT/FNIRT registration.`}
                    />
                    FSL FLIRT/FNIRT options
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fnirtConfig/}
                      help={`Configuration file to be used by FSL to set FNIRT parameters. It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.`}
                      fullWidth
                    >
                      <TextField label="FNIRT Configuration" fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.fsl.configuration.config_file"
                                value={configuration.getIn("anatomical.registration.methods.fsl.configuration.config_file".split("."))}
                                onChange={onChange}
                      />
                    </Help>

                    <Help
                      type="pipeline"
                      regex={/^ref_mask/}
                      help={`A reference mask to be used by FNIRT.`}
                      fullWidth
                    >
                      <TextField label="FNIRT Reference Mask" fullWidth margin="normal" variant="outlined"
                                name="anatomical.registration.methods.fsl.configuration.reference_mask"
                                value={configuration.getIn("anatomical.registration.methods.fsl.configuration.reference_mask".split("."))}
                                onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^fsl_linear_reg_only/}
                      help={`Perform linear registration only.`}
                    >
                      <FormControlLabelled label="Perform linear registration only">
                        <Switch
                          name="anatomical.registration.methods.fsl.configuration.linear_only"
                          checked={configuration.getIn("anatomical.registration.methods.fsl.configuration.linear_only".split("."))}
                          onChange={onChange}
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <Grid item xs={8}>
                    <FormGroup row>
                      <Help
                          type="pipeline"
                          regex={/^anatRegFSLinterpolation/}
                          help={`We provide a choice of interpolation options (Trilinear, Sinc, or Spline), set sinc as the default.`}
                          fullWidth
                        >
                          <TextField
                            select
                            label="Interpolation Option for FSL"
                            fullWidth margin="normal" variant="outlined"
                            className={classes.textField} onChange={onChange}
                            name="anatomical.registration.methods.fsl.interpolation"
                            value={configuration.getIn("anatomical.registration.methods.fsl.interpolation".split("."))}
                            helperText=''
                          >
                            <MenuItem value={"linear"}>Trilinear</MenuItem>
                            <MenuItem value={"sinc"}>Sinc</MenuItem>
                            <MenuItem value={"spline"}>Spline</MenuItem>
                          </TextField>
                        </Help>
                      </FormGroup>
                    </Grid>
                </FormGroup>
              </Collapse>
            </Grid>
          </Grid>
        </FormGroup>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(Registration.styles)(Registration));

// export default withStyles(Registration.styles)(Registration);
