import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControlLabelled from 'components/FormControlLabelled'
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'


class TissueSegmentation extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>

        <FormGroup>
          <FormLabel>
            <Help
              type="pipeline"
              regex={/^runSegmentationPreprocessing/}
              help={`Automatically segment anatomical images into White Matter, Gray Matter, and CSF based on probability maps.`}
            />
            Tissue Segmentation Options 
          </FormLabel>

          <Grid container>
            <Grid item xs={4}>
              <FormGroup row>
                <FormControlLabelled label="Use Priors">
                  <Switch
                    name="anatomical.tissue_segmentation.configuration.seg_use_priors.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_priors.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="Threshold">
                  <Switch
                    name="anatomical.tissue_segmentation.configuration.seg_use_threshold.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_threshold.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="Erosion">
                  <Switch
                    name="anatomical.tissue_segmentation.configuration.seg_use_erosion.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_erosion.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_priors.enabled".split("."))}>               
                <FormGroup>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      help={`Full path to a directory containing binarized prior probability maps.`}
                      fullWidth
                    />
                    Tissue Prior Probability Map
                  </FormLabel>
                  <FormLabel>
                    <Help
                        type="pipeline"
                        regex={/^PRIORS_WHITE/}
                        help={`Full path to a binarized White Matter prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
                        fullWidth
                      >
                        <TextField
                          label="White Matter Prior Probability Map"
                          name="anatomical.tissue_segmentation.configuration.seg_use_priors.priors.white_matter"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_priors.priors.white_matter".split("."))}
                          onChange={onChange}
                          fullWidth={true} margin="normal" variant="outlined"
                        />
                      </Help>
                  </FormLabel>
 
                  <FormLabel>
                    <Help
                        type="pipeline"
                        regex={/^PRIORS_GRAY/}
                        help={`Full path to a binarized Gray Matter prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
                        fullWidth
                      >
                        <TextField
                          label="Gray Matter Prior Probability Map"
                          name="anatomical.tissue_segmentation.configuration.seg_use_priors.priors.gray_matter"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_priors.priors.gray_matter".split("."))}
                          onChange={onChange}
                          fullWidth={true} margin="normal" variant="outlined"
                        />
                      </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                        type="pipeline"
                        regex={/^PRIORS_CSF/}
                        help={`Full path to a binarized CSF prior probability map. It is not necessary to change this path unless you intend to use non-standard priors.`}
                        fullWidth
                      >
                        <TextField
                          label="Cerebrospinal Fluid Prior Probability Map"
                          name="anatomical.tissue_segmentation.configuration.seg_use_priors.priors.cerebrospinal_fluid"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_priors.priors.cerebrospinal_fluid".split("."))}
                          onChange={onChange}
                          fullWidth={true} margin="normal" variant="outlined"
                        />
                      </Help>
                  </FormLabel>
                </FormGroup>                   
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_threshold.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      help={`Set the threshold value for refining the resulting White Matter, Gray Matter, CSF segmentation tissue masks. `}
                    />
                    Threshold 
                  </FormLabel>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^seg_WM_threshold_value/}
                      help={`Set the threshold value for refining the resulting White Matter segmentation tissue mask. The default value is 0.95.`}
                      fullWidth
                    >
                      <TextField label="White Matter Threshold Value"
                        name="anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_WM_threshold_value"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_WM_threshold_value".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^seg_GM_threshold_value/}
                      help={`Set the threshold value for refining the resulting Gray Matter segmentation tissue mask. The default value is 0.95.`}
                      fullWidth
                    >
                      <TextField label="Gray Matter Threshold Value"
                        name="anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_GM_threshold_value"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_GM_threshold_value".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^seg_CSF_threshold_value/}
                      help={`Set the threshold value for refining the resulting CSF segmentation tissue mask. The default value is 0.95.`}
                      fullWidth
                    >
                      <TextField label="CSF Threshold Value"
                        name="anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_CSF_threshold_value"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_threshold.threshold.seg_CSF_threshold_value".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>
                </FormGroup>
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_erosion.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      help={`Set the erosion proportion, if use erosion to erode binarized tissue masks.`}
                    />
                    Erosion 
                  </FormLabel>
                    <FormLabel>
                      <Help
                        type="pipeline"
                        regex={/^seg_erosion_prop/}
                        help={`Set the erosion proportion, if use erosion to erode binarized tissue masks. The default is 0.6.`}
                        fullWidth
                      >
                        <TextField label="Erosion Proportion"
                          name="anatomical.tissue_segmentation.configuration.seg_use_erosion.erosion.seg_erosion_prop"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.seg_use_erosion.erosion.seg_erosion_prop".split("."))}
                          onChange={onChange}
                          fullWidth margin="normal" variant="outlined"
                        />
                      </Help>
                    </FormLabel>
                </FormGroup>
              </Collapse>
            </Grid>
          </Grid>
        </FormGroup>
      </React.Fragment>
    )
  }
}

export default withStyles(TissueSegmentation.styles)(TissueSegmentation);
