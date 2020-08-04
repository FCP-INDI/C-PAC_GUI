import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Content from '../Content'
import Header, { HeaderText, HeaderAvatar, HeaderTools } from '../Header'

import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'

import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import { Map, updateIn } from 'immutable'

import {
  HomeIcon,
  PipelineIcon,
  ExpandMoreIcon,
  NavigateNextIcon,
} from '../icons'


class DatasetSettingsEditor extends Component {

  static styles = theme => ({
  })

  state = {
  }

  constructor(props) {
    super(props)
    this.state.settings = Map(props.settings)
  }

  renderBidsFormatForm() {
    const { settings } = this.state
    return (
      <>
        <TextField
          label="Base Directory"
          name="base_directory" value={settings.getIn(['base_directory'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText='The base directory of the BIDS-organized data.'
        />
      </>
    )
  }

  renderCustomFormatForm() {
    const { settings } = this.state
    return (
      <>
        <TextField
          label="Anatomical Path Template"
          name="anatomical_path_template" value={settings.getIn(['anatomical_path_template'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />

        <TextField
          label="Functional Path Template"
          name="functional_path_template" value={settings.getIn(['functional_path_template'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />

        <TextField
          label="Scan Parameters Path"
          name="scan_parameters_path" value={settings.getIn(['scan_parameters_path'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />

        <TextField
          label="Field Map Phase Path Template"
          name="fieldmap_phase_path_template" value={settings.getIn(['fieldmap_phase_path_template'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />

        <TextField
          label="Field Map Magnitude Path Template"
          name="fieldmap_magnitude_path_template" value={settings.getIn(['fieldmap_magnitude_path_template'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />
      </>
    )
  }

  renderFormat() {
    const { settings } = this.state
    switch(settings.getIn(['format'])) {
      case 'bids':
        return this.renderBidsFormatForm()
      break
      case 'custom':
        return this.renderCustomFormatForm()
      break
    }
  }

  handleValueChange = (event) => {
    const { settings } = this.state
    const value = event.target.type && event.target.type == "checkbox" ? event.target.checked : event.target.value
    this.setState({ settings: settings.setIn(event.target.name.split('.'), value) })
  }

  render() {
    const { classes, onChange } = this.props
    const { settings } = this.state

    const hasAWSGeneral = [
      'anatomical_scan',
      'brain_mask_path',
    ].some((s) => settings.get(s).startsWith("s3://"))

    const hasAWSBidsFormat = [
      'base_directory',
    ].some((s) => settings.get(s).startsWith("s3://"))

    const hasAWSCustomFormat = [
      'anatomical_path_template',
      'functional_path_template',
      'scan_parameters_path',
      'fieldmap_phase_path_template',
      'fieldmap_magnitude_path_template',
    ].some((s) => settings.get(s).startsWith("s3://"))

    const hasAWS = hasAWSGeneral || (
      settings.get("format") == "bids" ?
        hasAWSBidsFormat :
        hasAWSCustomFormat
    )

    return (
      <>
        <TextField
          select
          label="Dataset Format"
          fullWidth={true} margin="normal" variant="outlined"
          className={classes.textField}
          name="format"
          onChange={this.handleValueChange}
          value={settings.getIn(['format'])}
          helperText=''
        >
          <MenuItem value={"bids"}>BIDS</MenuItem>
          <MenuItem value={"custom"}>Custom</MenuItem>
        </TextField>

        <Collapse in={hasAWS}>
          <TextField
            label="AWS Credential Path"
            name="aws_credential_path" value={settings.getIn(['aws_credential_path'])}
            onChange={this.handleValueChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />
        </Collapse>

        { this.renderFormat() }

        <TextField
          label="Anatomical Scan to use"
          name="anatomical_scan" value={settings.getIn(['anatomical_scan'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />

        <TextField
          label="Brain Mask Path"
          name="brain_mask_path" value={settings.getIn(['brain_mask_path'])}
          onChange={this.handleValueChange}
          fullWidth={true} margin="normal" variant="outlined"
          helperText=''
        />
      </>
    )
  }
}

export default withStyles(DatasetSettingsEditor.styles)(DatasetSettingsEditor)
