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
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import Collapse from '@material-ui/core/Collapse';
import Help from 'components/Help'
import {
  SettingsIcon,
} from 'components/icons';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import {
  AddIcon,
  DeleteIcon
} from 'components/icons';
import { fromJS } from 'immutable';
class TissueSegmentation extends Component {

  // static styles = theme => ({
  // });

  static styles = theme => ({
    paper: { flexGrow: 1, padding: theme.spacing(), marginBottom: theme.spacing(2) },
    footer: { textAlign: 'right', padding: theme.spacing(2) }
  });

  addMask_brain = (event) => {
    const { configuration, onChange } = this.props
    const next = configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg','template_brain_list']).size

    onChange([
      [
        `anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_brain_list.${next}`,
        fromJS({
          mask: '',
        })
      ]
    ])
  }

  removeMask_brain = (i) => {
    const { classes, configuration, onChange } = this.props

    const template_brain_list = configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg', 'template_brain_list']).delete(i)

    onChange([
      [['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg', 'template_brain_list'], template_brain_list]
    ])

  }

  addMask_seg = (event) => {
    const { configuration, onChange } = this.props
    const next = configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg', 'template_segmentation_list']).size

    onChange([
      [
        `anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_segmentation_list.${next}`,
        fromJS({
          mask: '',
        })
      ]
    ])
  }

  removeMask_seg = (i) => {
    const { classes, configuration, onChange } = this.props

    const template_brain_list = configuration.getIn(['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg', 'template_segmentation_list']).delete(i)

    onChange([
      [['anatomical', 'tissue_segmentation', 'configuration', 'ANTs_prior_based_seg', 'template_segmentation_list'], template_segmentation_list]
    ])

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

    const config = configuration.getIn(['anatomical','tissue_segmentation','configuration','ANTs_prior_based_seg'])

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
              <FormGroup row>
                <Help
                  type="pipeline"
                  help={`ANTs Prior-based Segmentation workflow that has shown optimal results for non-human primate data. Generate white matter, gray matter, CSF masks based on antsJointLabelFusion. `}
                >
                  <FormControlLabelled label="ANTs Prior-Based Segmentation">
                    <Switch
                      name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.enabled"
                      checked={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.enabled".split("."))}
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
                      regex={/^template_based_segmentationtion/}
                      help={`Optimal for use with functional-only pipelines commonly used for rodent data, users can now employ a template-based tissue segmentation approach that applies inverse registration transforms to template-space tissue priors. If use template based segmentation, please make sure to specify white matter, gray matter, CSF mask paths at below three configurations. `}
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
                      regex={/^template_based_segmentationtion_WHITE/}
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
                      regex={/^template_based_segmentationtion_GRAY/}
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
                      regex={/^template_based_segmentation_CSF/}
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

              <Collapse in={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.enabled".split("."))}>
                <FormGroup>
                  <FormLabel>
                    <Help
                      type="pipeline"
                      help={`Optimal for non-human primate segmentations. Generate white matter, gray matter, CSF masks based on antsJointLabelFusion. If use ANTs prior based segmentation, please make sure to specify template brain list and template segmentation list properly. `}
                    />
                    ANTs Prior Based Tissue Segmentation
                  </FormLabel>
                  <Paper className={classes.paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Help
                              type="pipeline"
                              regex={/^ANTs_prior_seg_template_brain_list/}
                              help={`Paths to the atlas image assumed to be used in ANTs Prior-based Segmentation.`}
                            />
                          </TableCell>
                          <TableCell>The atlas images</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          config.get('template_brain_list').size == 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                Add new rows with the "+" below.
                              </TableCell>
                            </TableRow>
                          ) : (
                              config.get('template_brain_list').map((mask, i) => (
                                <TableRow key={i}>
                                  <TableCell padding="checkbox">
                                    <IconButton className={classes.button} onClick={() => this.removeMask_brain(i)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      fullWidth={true}
                                      name={`anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_brain_list.${i}.mask`}
                                      onChange={onChange}
                                      value={mask.get('mask')}
                                      helperText=''
                                    />
                                  </TableCell>
                                </TableRow>
                              )))}
                      </TableBody>
                      <TableFooter>
                        <TableRow >
                          <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                            <Fab aria-label="Add new brain template" onClick={this.addMask_brain}>
                              <AddIcon />
                            </Fab>
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Paper>

                  <Paper className={classes.paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Help
                              type="pipeline"
                              regex={/^ANTs_prior_seg_template_segmentation_list/}
                              help={`Paths to the atlas segmentation images. For performing ANTs Prior-based segmentation method, the number of specified segmentations should be identical to the number of atlas brain image sets. `}
                            />
                          </TableCell>
                          <TableCell>The atlas segmentation images</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          config.get('template_segmentation_list').size == 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                Add new rows with the "+" below.
                              </TableCell>
                            </TableRow>
                          ) : (
                              config.get('template_segmentation_list').map((mask, i) => (
                                <TableRow key={i}>
                                  <TableCell padding="checkbox">
                                    <IconButton className={classes.button} onClick={() => this.removeMask_seg(i)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                      fullWidth={true}
                                      name={`anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_segmentation_list.${i}.mask`}
                                      onChange={onChange}
                                      value={mask.get('mask')}
                                      helperText=''
                                    />
                                  </TableCell>
                                </TableRow>
                              )))}
                      </TableBody>
                      <TableFooter>
                        <TableRow >
                          <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                            <Fab aria-label="Add new segmentation template" onClick={this.addMask_seg}>
                              <AddIcon />
                            </Fab>
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Paper>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^ANTs_prior_seg_CSF_label/}
                      help={`Label value corresponding to CSF in multiatlas file. It is not necessary to change this values unless your CSF/GM/WM label values are different from Freesurfer Color Lookup Table.`}
                      fullWidth
                    >
                      <TextField label="CSF Label Value"
                        name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.CSF_label"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.CSF_label".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^ANTs_prior_seg_left_GM_label/}
                      help={`Label value corresponding to Left Gray Matter in multiatlas file. It is not necessary to change this values unless your CSF/GM/WM label values are different from Freesurfer Color Lookup Table.`}
                      fullWidth
                    >
                      <TextField label="Left Gray Matter Label Value"
                        name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_GM_label"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_GM_label".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^ANTs_prior_seg_right_GM_label/}
                      help={`Label value corresponding to Right Gray Matter in multiatlas file. It is not necessary to change this values unless your CSF/GM/WM label values are different from Freesurfer Color Lookup Table..`}
                      fullWidth
                    >
                      <TextField label="Right Gray Matter Label Value"
                        name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_GM_label"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_GM_label".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^ANTs_prior_seg_left_WM_label/}
                      help={`Label value corresponding to Left White Matter in multiatlas file. It is not necessary to change this values unless your CSF/GM/WM label values are different from Freesurfer Color Lookup Table..`}
                      fullWidth
                    >
                      <TextField label="Left White Matter Label Value"
                        name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_WM_label"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_WM_label".split("."))}
                        onChange={onChange}
                        fullWidth margin="normal" variant="outlined"
                      />
                    </Help>
                  </FormLabel>

                  <FormLabel>
                    <Help
                      type="pipeline"
                      regex={/^ANTs_prior_seg_right_WM_label/}
                      help={`Label value corresponding to Right White Matter in multiatlas file. It is not necessary to change this values unless your CSF/GM/WM label values are different from Freesurfer Color Lookup Table..`}
                      fullWidth
                    >
                      <TextField label="Right White Matter Label Value"
                        name="anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_WM_label"
                        value={configuration.getIn("anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_WM_label".split("."))}
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
