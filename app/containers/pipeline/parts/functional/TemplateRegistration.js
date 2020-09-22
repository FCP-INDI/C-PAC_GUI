import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabelled from 'components/FormControlLabelled'
import Switch from '@material-ui/core/Switch';
import { fromJS } from 'immutable';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import {
  SettingsIcon,
} from 'components/icons';
import EditIcon from 'components/icons';

class TemplateRegistration extends Component {

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
    const { classes, configuration, advanced, onChange } = this.props
    // const { classes, configuration, onChange } = this.props
    const functional_resolution = configuration.getIn(["functional", "template_registration", "functional_resolution"])
    const derivative_resolution = configuration.getIn(["functional", "template_registration", "derivative_resolution"])
    
    return (
      <Grid container>
        <Grid item sm={12}>

          {/* <Collapse in={configuration.getIn("anatomical.registration.methods.ants.enabled".split("."))}>

            <Help
              type="pipeline"
              regex={/^funcRegANTSinterpolation/}
              help={`We provide a choice of interpolation options (Linear, LanczosWindowedSinc, or BSpline), set LanczosWindowedSinc as the default.`}
              fullWidth
            >

              <TextField
                select
                label="Interpolation Option for ANTS"
                fullWidth margin="normal" variant="outlined"
                className={classes.textField} onChange={onChange}
                name="functional.template_registration.methods.ants.interpolation"
                value={configuration.getIn(["functional", "template_registration", "methods", "ants","interpolation"])}
                helperText=''
              >
                <MenuItem value={"linear"}>Linear</MenuItem>
                <MenuItem value={"sinc"}>LanczosWindowedSinc</MenuItem>
                <MenuItem value={"spline"}>BSPline</MenuItem>

              </TextField>
            </Help>

          </Collapse>

          <Collapse in={configuration.getIn("anatomical.registration.methods.fsl.enabled".split("."))}>

            <Help
              type="pipeline"
              regex={/^funcRegFSLinterpolation/}
              help={`We provide a choice of interpolation options (Linear, Sinc, or Spline), set sinc as the default.`}
              fullWidth
            >

              <TextField
                select
                label="Interpolation Option for FSL"
                fullWidth margin="normal" variant="outlined"
                className={classes.textField} onChange={onChange}
                name="functional.template_registration.methods.fsl.interpolation"
                value={configuration.getIn(["functional", "template_registration", "methods", "fsl", "interpolation"])}
                helperText=''
              >
                <MenuItem value={"linear"}>Linear</MenuItem>
                <MenuItem value={"sinc"}>Sinc</MenuItem>
                <MenuItem value={"spline"}>Spline</MenuItem>

              </TextField>
            </Help>

          </Collapse> */}

          <Help
            type="pipeline"
            regex={/^resolution_for_func_preproc/}
            help={`The resolution (in mm) to which the preprocessed, registered functional timeseries outputs are written into. 
            Optional input types: 1 one integer or float number indicating 3 same dimensions, e.g. 3 or 2.5; 2 three different integers or float numbers connected by 'x', e.g. 3x2.67x2.67. 
            Note that selecting a 1 mm or 2 mm resolution might substantially increase your RAM needs- these resolutions should be selected with caution. For most cases, 3 mm or 4 mm resolutions are suggested.`}
            fullWidth
          >
            <InputLabel>Functional Resolution</InputLabel>
            {
            
              functional_resolution.size !== undefined ?

              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.0"
                    value={functional_resolution.get(0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.1"
                    value={functional_resolution.get(1)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.functional_resolution.2"
                    value={functional_resolution.get(2)}
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
                name="functional.template_registration.functional_resolution"
                value={functional_resolution}
                onChange={function(event) {
                  if (event.target.value.includes("x")) {
                    let values = event.target.value.replace(/[^0-9\.x]/, '').split("x").filter(Boolean).map(parseFloat)
                    values = [...values, ...values, ...values].slice(0, 3)
                    onChange(
                      [[['functional', 'template_registration', 'functional_resolution'], values]]
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

          <Help
            type="pipeline"
            regex={/^resolution_for_func_derivative/}
            help={`The resolution (in mm) to which the registered derivative outputs are written into.`}
            fullWidth
          >
            <InputLabel>Derivative Resolution</InputLabel>
            {
            
              derivative_resolution.size !== undefined ?

              <Grid container>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.0"
                    value={derivative_resolution.get(0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.1"
                    value={derivative_resolution.get(1)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="functional.template_registration.derivative_resolution.2"
                    value={derivative_resolution.get(2)}
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
                name="functional.template_registration.derivative_resolution"
                value={derivative_resolution}
                onChange={function(event) {
                  if (event.target.value.includes("x")) {
                    let values = event.target.value.replace(/[^0-9\.x]/, '').split("x").filter(Boolean).map(parseFloat)
                    values = [...values, ...values, ...values].slice(0, 3)
                    onChange(
                      [[['functional', 'template_registration', 'derivative_resolution'], values]]
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

          <Help
            type="pipeline"
            regex={/^template_for_resample/}
            help={`A standard template for resampling if using float resolution.`}
            fullWidth
          >
            <TextField label="Template for Resampling"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.template_for_resample"
              value={configuration.getIn(["functional", "template_registration", "template_for_resample"])}
              onChange={onChange}
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^identityMatrix/}
            help={`Matrix containing all 1's. Used as an identity matrix during registration. It is not necessary to change this path unless you intend to use non-standard MNI registration.`}
            fullWidth
          >
            <TextField label="Standard Identity Matrix"
              fullWidth margin="normal" variant="outlined"
              name="functional.template_registration.identity_matrix"
              value={configuration.getIn(["functional", "template_registration", "identity_matrix"])}
              onChange={onChange}
            />
          </Help>

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabelled label="T1 Template Registration">
                  <Switch
                    name="functional.template_registration.t1_template.enabled"
                    checked={configuration.getIn("functional.template_registration.t1_template.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="EPI Template Registration">
                  <Switch
                    name="functional.template_registration.epi_template.enabled"
                    checked={configuration.getIn("functional.template_registration.epi_template.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("functional.template_registration.t1_template.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    T1 - Brain/Skull Templates
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_brain_only_for_func/}
                      help={`Standard FSL Skull Stripped Template. Used as a reference image for functional registration.`}
                      fullWidth
                    >
                      <TextField label="Standard Brain Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.t1_template.brain_template"
                        value={configuration.getIn(["functional", "template_registration", "t1_template", "brain_template"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_skull_for_func/}
                      help={`Standard FSL Anatomical Brain Image with Skull.`}
                      fullWidth
                    >
                      <TextField label="Standard Brain + Skull Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.t1_template.skull_template"
                        value={configuration.getIn(["functional", "template_registration", "t1_template", "skull_template"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                </FormGroup>
              </Collapse>
              <Collapse in={configuration.getIn("functional.template_registration.epi_template.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    EPI - Brain/Skull Template
                  </FormLabel>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^template_epi/}
                      help={`EPI template. Used as a reference image for functional registration.`}
                      fullWidth
                    >
                      <TextField label="EPI Template"
                        fullWidth margin="normal" variant="outlined"
                        name="functional.template_registration.epi_template.template_epi"
                        value={configuration.getIn(["functional", "template_registration", "epi_template", "template_epi"])}
                        onChange={onChange}
                      />
                    </Help>
                  </FormGroup>
                </FormGroup>

                {/* ants_para */}
                <FormGroup>
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
                          name="functional.template_registration.epi_template.ANTs_para_EPI_registration.collapse_output_transforms"
                          value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.collapse_output_transforms".split("."))}
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
                          name="functional.template_registration.epi_template.ANTs_para_EPI_registration.dimensionality"
                          value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.dimensionality".split("."))}
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
                          name="functional.template_registration.epi_template.ANTs_para_EPI_registration.initial_moving_transform.initializationFeature"
                          value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.initial_moving_transform.initializationFeature".split("."))}
                          onChange={onChange}
                        />
                      </Help>
                    </FormGroup>

                    {/* expand transform Rigid. TODO: make transforms(Rigid,Affine,SyN) for loop */} 
                    <FormGroup>
                      <FormGroup row>
                        <FormControlLabelled label="Transform Rigid">
                          <Switch
                            name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.enabled"
                            checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>
  
                      <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.enabled".split("."))}>
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.gradientStep"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.gradientStep".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.numberOfBins".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.samplingStrategy".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.MI.samplingPercentage".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.Rigid.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.radius"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.metric.type.CC.radius".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.iteration"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.iteration".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.convergenceThreshold"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.convergenceThreshold".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.convergenceWindowSize"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.convergence.convergenceWindowSize".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.smoothing_sigmas"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.smoothing_sigmas".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.shrink_factors"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.shrink_factors".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.use_histogram_matching"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Rigid.use_histogram_matching".split("."))}
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
                            name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.enabled"
                            checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>

                      <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.enabled".split("."))}>
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.gradientStep"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.gradientStep".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.numberOfBins".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.samplingStrategy".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.MI.samplingPercentage".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.Affine.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.radius"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.metric.type.CC.radius".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.iteration"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.iteration".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.convergenceThreshold"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.convergenceThreshold".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.convergenceWindowSize"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.convergence.convergenceWindowSize".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.smoothing_sigmas"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.smoothing_sigmas".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.shrink_factors"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.shrink_factors".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.use_histogram_matching"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.Affine.use_histogram_matching".split("."))}
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
                            name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.enabled"
                            checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.enabled".split("."))}
                            onChange={onChange}
                            color="primary"
                          />
                        </FormControlLabelled>
                      </FormGroup>

                      <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.enabled".split("."))}>
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.gradientStep"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.gradientStep".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.updateFieldVarianceInVoxelSpace"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.updateFieldVarianceInVoxelSpace".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.totalFieldVarianceInVoxelSpace"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.totalFieldVarianceInVoxelSpace".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric MI parameters. TODO: make it short - for loop */}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="MI metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.numberOfBins"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.numberOfBins".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.samplingStrategy"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.samplingStrategy".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.samplingPercentage"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.MI.samplingPercentage".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.enabled"
                                  checked={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.SyN.metric.type.CC.enabled".split("."))}
                                  onChange={onChange}
                                  color="primary"
                                />
                              </FormControlLabelled>
                            </Help>
                          </FormGroup>

                          {/* metric CC parameters.*/}
                          <Collapse in={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.enabled".split("."))}>
                            <FormGroup row>
                              <Help
                                type="pipeline"
                                help={` The "metricWeight" variable is used to modulate the per stage weighting of the metrics.`}
                                fullWidth
                              >
                                <TextField label="CC metricWeight"
                                  fullWidth margin="normal" variant="outlined"
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.metricWeight"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.metricWeight".split("."))}
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
                                  name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.radius"
                                  value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.metric.type.CC.radius".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.iteration"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.iteration".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.convergenceThreshold"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.convergenceThreshold".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.convergenceWindowSize"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.convergence.convergenceWindowSize".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.smoothing_sigmas"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.smoothing_sigmas".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.shrink_factors"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.shrink_factors".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.use_histogram_matching"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.use_histogram_matching".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.winsorize_image_intensities.lowerQuantile"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.winsorize_image_intensities.lowerQuantile".split("."))}
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
                                name="functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.winsorize_image_intensities.upperQuantile"
                                value={configuration.getIn("functional.template_registration.epi_template.ANTs_para_EPI_registration.transforms.SyN.winsorize_image_intensities.upperQuantile".split("."))}
                                onChange={onChange}
                              />
                            </Help>
                          </FormGroup>
                        </FormGroup>
                      </Collapse>
                    </FormGroup>
                    </DialogContent>
                  </Dialog>
                </FormGroup>
                {/* end ants param expand */}
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
const mapStateToProps = (state, props) => {
  return {
    advanced: state.main.getIn(['config', 'settings', 'advanced']),
  }
}

export default connect(mapStateToProps)(withStyles(TemplateRegistration.styles)(TemplateRegistration));
// export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
