import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControlLabelled from 'components/FormControlLabelled';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'
import {
  SettingsIcon,
} from 'components/icons';

class TissueSegmentation extends Component {

  static styles = theme => ({
  });

  state = {
    fsl: false,
    customized: false,
  }

  handleValueChange = (event) => {
    const name = event.target.name

    const checkBoxes = [
      "anatomical.tissue_segmentation.configuration.fast_threshold.enabled",
      "anatomical.tissue_segmentation.configuration.custom_threshold.enabled",
    ]

    if (!checkBoxes.includes(name)) {
      this.props.onChange([
        [name, event.target.value]
      ])

    } else {
      const changes = []
      const value = event.target.checked

      if (name == "anatomical.tissue_segmentation.configuration.fast_threshold.enabled") {
        changes.push([name, value])
        if (value) {
          changes.push(["anatomical.tissue_segmentation.configuration.custom_threshold.enabled", false])
        }
      } else if (name == "anatomical.tissue_segmentation.configuration.custom_threshold.enabled") {
        changes.push([name, value])
        if (value) {
          changes.push(["anatomical.tissue_segmentation.configuration.fast_threshold.enabled", false])
        }
      }

      this.props.onChange(changes)
    }
  };

  handleOpenFSL = () => {
    this.setState({ fsl: true })
  }
  
  handleOpenCustomized = () => {
    this.setState({ customized: true })
  }

  handleCloseFSL = () => {
    this.setState({ fsl: false })
  }
  
  handleCloseCustomized = () => {
    this.setState({ customized: false })
  }

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
                    name="anatomical.tissue_segmentation.configuration.priors.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.priors.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <Help
                  type="pipeline"
                  regex={/^seg_use_threshold/}
                  help={`Choice of using FSL-FAST Thresholding or Customized Thresholding to perform tissue segmentation thresholding. Only one thresholding method can be chosen.`}
                >
                  <FormControlLabel
                    label="FSL-FAST Threshold"
                    control={
                      <Switch
                        name="anatomical.tissue_segmentation.configuration.fast_threshold.enabled"
                        checked={configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'fast_threshold', 'enabled'])}
                        onChange={this.handleValueChange}
                        color="primary"
                      />
                    }
                  />
                  { configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'fast_threshold', 'enabled']) ?
                    <IconButton
                      onClick={() => this.handleOpenFSL()}>
                    </IconButton>
                  : null }

                  <FormControlLabel
                    label="Customized Threshold"
                    control={
                      <Switch
                      name="anatomical.tissue_segmentation.configuration.custom_threshold.enabled"
                      checked={configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'custom_threshold', 'enabled'])}
                      onChange={this.handleValueChange}
                      color="primary"
                      />
                    }
                  />
                  { configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'custom_threshold', 'enabled']) ?
                    <IconButton
                      onClick={() => this.handleOpenCustomized()}>
                    </IconButton>
                  : null }
                </Help>
              </FormGroup>
              <FormGroup row>
                <FormControlLabelled label="Erosion">
                  <Switch
                    name="anatomical.tissue_segmentation.configuration.erosion.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.erosion.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
              </FormGroup>
              <FormGroup row>
                <Help
                  type="pipeline"
                  help={`If you choose template based segmentation, C-PAC does not segment anatomical images into White Matter, Gray Matter, and CSF any more. White Matter, Gray Matter, CSF masks will be generated based on template segmentation masks. `}
                >
                <FormControlLabelled label="Template Based Segmentation">
                  <Switch
                    name="anatomical.tissue_segmentation.configuration.template_based_seg.enabled"
                    checked={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.enabled".split("."))}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControlLabelled>
                </Help>
              </FormGroup>
            </Grid>

            <Grid item xs={8}>
              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.priors.enabled".split("."))}>               
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
                          name="anatomical.tissue_segmentation.configuration.priors.priors.white_matter"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.priors.priors.white_matter".split("."))}
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
                          name="anatomical.tissue_segmentation.configuration.priors.priors.gray_matter"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.priors.priors.gray_matter".split("."))}
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
                          name="anatomical.tissue_segmentation.configuration.priors.priors.cerebrospinal_fluid"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.priors.priors.cerebrospinal_fluid".split("."))}
                          onChange={onChange}
                          fullWidth={true} margin="normal" variant="outlined"
                        />
                      </Help>
                  </FormLabel>
                </FormGroup>                   
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.custom_threshold.enabled".split("."))}>
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
                        name="anatomical.tissue_segmentation.configuration.custom_threshold.threshold.white_matter"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.custom_threshold.threshold.white_matter".split("."))}
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
                        name="anatomical.tissue_segmentation.configuration.custom_threshold.threshold.gray_matter"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.custom_threshold.threshold.gray_matter".split("."))}
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
                        name="anatomical.tissue_segmentation.configuration.custom_threshold.threshold.cerebrospinal_fluid"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.custom_threshold.threshold.cerebrospinal_fluid".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>
                </FormGroup>
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.erosion.enabled".split("."))}>
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
                          name="anatomical.tissue_segmentation.configuration.erosion.proportion"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.erosion.proportion".split("."))}
                          onChange={onChange}
                          fullWidth margin="normal" variant="outlined"
                        />
                      </Help>
                    </FormLabel>
                </FormGroup>
              </Collapse>

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      help={`Generate white matter, gray matter, CSF masks based on EPI template segmentation masks, T1 template segmentation masks, or not use template-based segmentation. If use template based segmentation, please make sure to specify white matter, gray matter, CSF mask paths. `}
                    />
                    Template based tissue segmentation
                  </FormLabel>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^template_based_segmenation/}
                      help={`If use template based segmentation, please make sure to specify white matter, gray matter, CSF mask paths at below three configurations. These masks should be in the same space of your registration template, e.g. if you choose 'EPI Template based tissue segmentation' , below tissue masks should also be EPI template tissue masks.`}
                      fullWidth
                      >
                        <TextField
                          select
                          label="Template based tissue segmentation"
                          fullWidth margin="normal" variant="outlined"
                          className={classes.textField} onChange={onChange}
                          name="anatomical.tissue_segmentation.configuration.template_based_seg.methods"
                          value={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.methods".split("."))}
                          helperText=''
                        >
                          <MenuItem value={"epi_template_based"}>EPI Template based </MenuItem>
                          <MenuItem value={"t1_template_based"}>T1 Template based </MenuItem>                      
                        </TextField>  
                      </Help>                 
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^template_based_segmenation_WHITE/}
                      help={`Full path to a binarized White Matter mask. These masks should be in the same space of selected registration template. `}
                      fullWidth
                    >
                      <TextField
                        label="White Matter Binary Mask"
                        name="anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.white_matter"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.white_matter".split("."))}
                        onChange={onChange}
                        fullWidth={true} margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^template_based_segmenation_GRAY/}
                      help={`Full path to a binarized Gray Matter mask. These masks should be in the same space of selected registration template. `}
                      fullWidth
                    >
                      <TextField
                        label="Gray Matter Binary Mask"
                        name="anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.gray_matter"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.gray_matter".split("."))}
                        onChange={onChange}
                        fullWidth={true} margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^template_based_segmenation_CSF/}
                      help={`Full path to a binarized CSF mask. These masks should be in the same space of selected registration template. `}
                      fullWidth
                    >
                      <TextField
                        label="Cerebrospinal Fluid Binary Mask"
                        name="anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.cerebrospinal_fluid"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.cerebrospinal_fluid".split("."))}
                        onChange={onChange}
                        fullWidth={true} margin="normal" variant="outlined"
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
