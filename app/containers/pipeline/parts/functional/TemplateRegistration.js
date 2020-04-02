import React, { Component } from 'react';

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


// const original = fromJS({
//   collapse_output_transforms: 0,
//   dimensionality: 3,
//   initial_moving_transform: {
//     initializationFeature: 0,
//   },
//   transforms: {
//     Rigid: {
//       enabled: true,
//       gradientStep: 0.1,
//       metric: {
//         type: {
//           MI: {
//             enabled: true,
//             metricWeight: 1,
//             numberOfBins: 32,
//             samplingStrategy: 'Regular',
//             samplingPercentage: 0.25,
//           },
//           CC: {
//             enabled: false,
//             metricWeight: 1,
//             radius: 4,
//           },
//         },
//       },
//       convergence: {
//         iteration: '1000x500x250x100',
//         convergenceThreshold: 1e-08,
//         convergenceWindowSize: 10,
//       },
//       smoothing_sigmas: '3.0x2.0x1.0x0.0',
//       shrink_factors: '8x4x2x1',
//       use_histogram_matching: {
//         enabled: true,
//       },
//     },

//     Affine: {
//       enabled: true,
//       gradientStep: 0.1,
//       metric: {
//         type: {
//           MI: {
//             enabled: true,
//             metricWeight: 1,
//             numberOfBins: 32,
//             samplingStrategy: 'Regular',
//             samplingPercentage: 0.25,
//           },
//           CC: {
//             enabled: false,
//             metricWeight: 1,
//             radius: 4,
//           },
//         },
//         convergence: {
//           iteration: '1000x500x250x100',
//           convergenceThreshold: 1e-08,
//           convergenceWindowSize: 10,
//         },
//         smoothing_sigmas: '3.0x2.0x1.0x0.0',
//         shrink_factors: '8x4x2x1',
//         use_histogram_matching: {
//           enabled: true,
//         },
//       },

//       SyN: {
//         enabled: true,
//         gradientStep: 0.1,
//         updateFieldVarianceInVoxelSpace: 3.0,
//         totalFieldVarianceInVoxelSpace: 0.0,
//         metric: {
//           MI: {
//             enabled: false,
//             metricWeight: 1,
//             numberOfBins: 32,
//             samplingStrategy: 'Regular',
//             samplingPercentage: 0.25,
//           },
//           CC: {
//             enabled: true,
//             metricWeight: 1,
//             radius: 4,
//           },
//         },
//         convergence: {
//           iteration: '100x100x70x20',
//           convergenceThreshold: 1e-09,
//           convergenceWindowSize: 15,
//         },
//         smoothing_sigmas: '3.0x2.0x1.0x0.0',
//         shrink_factors: '6x4x2x1',
//         use_histogram_matching: {
//           enabled: true,
//         },
//         winsoriz_image_intensities: {
//           lowerQuantile: 0.01,
//           upperQuantile: 0.99,
//         },
//       },
//     },
//   },
// })


class TemplateRegistration extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props
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
                    T1 Template Registration - Brain/Skull Templates
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
                    EPI Template Registration - Brain/Skull Template
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

                {/* ants_para */}
                </FormGroup>
                <FormGroup>
                  <FormLabel>
                    ANTs Registration Parameters
                    <Help
                      type="pipeline"
                      regex={/^ANTs_para_EPI_registration/}
                      help={`Please specify ANTs parameters,if run Functional to EPI Template Registration with ANTs. `}
                      fullWidth
                    ></Help>
                  </FormLabel>

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
{/* ants_para */}



                </FormGroup>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(TemplateRegistration.styles)(TemplateRegistration);
