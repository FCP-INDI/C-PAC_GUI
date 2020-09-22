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

class InitialPreprocessing extends Component {

  static styles = theme => ({
  });

  state = {
    ACPC: false,
  }

  handleOpenACPC = () => {
    this.setState({ ACPC : true })
  }

  handleCloseACPC = () => {
    this.setState({ ACPC: false })
  }

  render() {
    const { classes, configuration, advanced, onChange } = this.props

    return (
      <React.Fragment>
        {/* acpc align dialog */}
        <Dialog
          open={this.state.ACPC && configuration.getIn("anatomical.preprocessing.methods.acpc_align.enabled".split("."))}
          onClose={this.handleCloseACPC}
          fullWidth={true}
        >
          <DialogTitle>{`ACPC Alignment Options`}</DialogTitle>
          <DialogContent>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^acpc_brainsize/}
                help={`ACPC size of brain in z-dimension in mm. Default: 150mm for human data, 70mm for macaque data.`}
                fullWidth
              >
                <TextField
                  label="ACPC Brain Size" fullWidth margin="normal" variant="outlined"
                  name="anatomical.preprocessing.methods.acpc_align.acpc_brainsize"
                  value={configuration.getIn("anatomical.preprocessing.methods.acpc_align.acpc_brainsize".split("."))}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^acpc_template_skull/}
                help={`Skull template to be used for ACPC alignment. It is not necessary to change this path unless you intend to use a non-standard template.`}
                fullWidth
              >
                <TextField
                  label="ACPC Aligned Skull Template" fullWidth margin="normal" variant="outlined"
                  name="anatomical.preprocessing.methods.acpc_align.acpc_template_skull"
                  value={configuration.getIn("anatomical.preprocessing.methods.acpc_align.acpc_template_skull".split("."))}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={/^acpc_template_brain/}
                help={`Brain template to be used for ACPC alignment. For human data, it can be 'None'. It is not necessary to change this path unless you intend to use a non-standard template.`}
                fullWidth
              >
                <TextField
                  label="ACPC Aligned Brain Template" fullWidth margin="normal" variant="outlined"
                  name="anatomical.preprocessing.methods.acpc_align.acpc_template_brain"
                  value={configuration.getIn("anatomical.preprocessing.methods.acpc_align.acpc_template_brain".split("."))}
                  onChange={onChange}
                />
              </Help>
            </FormGroup>
          </DialogContent>
        </Dialog> 

        <FormControl fullWidth>
          {/* ACPC alignment */}
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^acpc_align/}
              help={`Turn on to apply Anterior Commissure - Posterior Comissure (ACPC) alignment`}
            >
            <FormControlLabel
              label="ACPC Alignment"
              control={
                <Switch
                  name="anatomical.preprocessing.methods.acpc_align.enabled"
                  checked={configuration.getIn("anatomical.preprocessing.methods.acpc_align.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              }
            />
            {configuration.getIn("anatomical.preprocessing.methods.acpc_align.enabled".split(".")) ?
              <IconButton
                onClick={() => this.handleOpenACPC()}>
                <SettingsIcon />
              </IconButton>
            : null}
            </Help>
          </FormGroup>

          {/* Non local means filtering */}
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^non_local_means_filtering/}
              help={`Turn on to apply non-local means filtering`}
            >
              <FormControlLabelled label="Non Local Means Filtering">
                <Switch
                  name="anatomical.preprocessing.methods.nlmf.enabled"
                  checked={configuration.getIn("anatomical.preprocessing.methods.nlmf.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </Help>
          </FormGroup>

          {/* N4 Bias Correction*/}
          <FormGroup row>
            <Help
              type="pipeline"
              regex={/^n4_bias_field_correction/}
              help={`Turn on to apply N4 bias correction`}
            >
              <FormControlLabelled label="N4 Bias Correction">
                <Switch
                  name="anatomical.preprocessing.methods.n4.enabled"
                  checked={configuration.getIn("anatomical.preprocessing.methods.n4.enabled".split("."))}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
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

export default connect(mapStateToProps)(withStyles(InitialPreprocessing.styles)(InitialPreprocessing));
