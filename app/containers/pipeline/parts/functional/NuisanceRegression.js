import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Collapse from '@material-ui/core/Collapse';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import { fromJS } from 'immutable';
import MathJax from 'react-mathjax'

import FormControlLabelled from 'components/FormControlLabelled'
import Help from 'components/Help'

import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DuplicateIcon
} from 'components/icons';

const original = fromJS({
  GrayMatter: {
    enabled: false,
    summary: {
      method: 'Mean',
    },
    erode_mask: true,
    extraction_resolution: 2,
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
  },
  WhiteMatter: {
    enabled: false,
    summary: {
      method: 'Mean',
    },
    erode_mask: true,
    extraction_resolution: 2,
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
  },
  CerebrospinalFluid: {
    enabled: false,
    summary: {
      method: 'Mean',
    },
    erode_mask: false,
    extraction_resolution: 2,
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
  },
  aCompCor: {
    enabled: false,
    summary: {
      filter: ' ',
      method: 'DetrendPC',
      components: 5,
    },
    tissues: ['WhiteMatter'],
    extraction_resolution: 2,
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
  },
  tCompCor: {
    enabled: false,
    summary: {
      filter: ' ',
      method: 'PC',
      components: 5,
    },
    degree: 1,
    threshold: '1.5SD',
    by_slice: true,
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
    erode_mask: false,
  },
  GlobalSignal: {
    enabled: false,
    summary: {
      method: 'Mean',
    },
    include_delayed: false,
    include_squared: false,
    include_delayed_squared: false,
  },
  Motion: {
    enabled: false,
    include_delayed: true,
    include_squared: true,
    include_delayed_squared: true,
  },
  PolyOrt: {
    enabled: false,
    degree: 2,
  },
  Bandpass: {
    enabled: false,
    bottom_frequency: 0.01,
    top_frequency: 0.1,
  },
  Censor: {
    enabled: false,
    method: 'Kill',
    threshold: {
      type: 'FD_J',
      value: 0.0,
    },
    number_of_previous_trs_to_censor: 1,
    number_of_subsequent_trs_to_censor: 2,
  },
})

class NuisanceRegression extends Component {

  state = {
    editRegressor: null
  }

  static styles = theme => ({
    header: { padding: 0, minHeight: 10 },
    content: { padding: 0, minHeight: 10, margin: 0 },
    details: { padding: '0 10px 0 10px', minHeight: 10 },
    details_box: { margin: 0 },
    footer: { textAlign: 'right', padding: theme.spacing(2) }
  });

  handleEdit = (regi) => {
    this.setState({ editRegressor: regi });
  };

  handleNew = () => {
    const { classes, configuration, onChange } = this.props
    const regressors = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).push(original)

    onChange([
      [['functional', 'nuisance_regression', 'regressors'], regressors]
    ])
    this.setState({ editRegressor: regressors.size - 1 });
  };

  handleDuplicate = (regi) => {
    const { classes, configuration, onChange } = this.props
    const regressors =
      configuration.getIn(['functional', 'nuisance_regression', 'regressors']).push(
        configuration.getIn(['functional', 'nuisance_regression', 'regressors', regi])
      )

    onChange([
      [['functional', 'nuisance_regression', 'regressors'], regressors]
    ])
  };

  handleDelete = (regi) => {
    const { classes, configuration, onChange } = this.props
    const regressors = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).delete(regi)

    onChange([
      [['functional', 'nuisance_regression', 'regressors'], regressors]
    ])
  };

  handleClose = () => {
    this.setState({
      editRegressor: null,
      deleteRegressor: null,
    });
  };

  getRegressorLabel = (regressors) => {
    const renaming = {
      'WhiteMatter': 'WM',
      'CerebrospinalFluid': 'CSF',
      'GrayMatter': 'GM',
      'GlobalSignal': 'GR',
      'Motion': 'Mot',
      'Bandpass': 'BP',
    }

    const censor_renaming = {
      'FD_J': 'FD Jenkinson',
      'FD_P': 'FD Power',
      'DVARS': 'DVARS',
    }

    let representation = ''

    const regressor_pieces = []
    for(let reg of [
      'Motion', 'GlobalSignal', 'WhiteMatter', 'CerebrospinalFluid',
      'GrayMatter','aCompCor', 'tCompCor', 'PolyOrt', 'Bandpass', 'Censor'
    ]) {
      if (regressors[reg] === undefined) {
        continue
      }

      if (!regressors[reg].enabled) {
        continue
      }

      if (reg == 'aCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
            filter: ' ',
            method: 'DetrendPC',
            components: 5,
          }
        }
      }

      if (reg == 'tCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
            filter: ' ',
            method: 'PC',
            components: 5,
          }
        }
      }

      const regressor = regressors[reg]
      let name = reg
      if (renaming[reg] !== undefined) {
        name = renaming[reg]
      }

      let terms = [`\\textrm{${name}}`]

      if (regressor['include_squared']) {
        terms.push(`\\textrm{${name}}^{2}`)
      }
      if (regressor['include_delayed']) {
        terms.push(`\\textrm{${name}}_{t-1}`)
      }
      if (regressor['include_delayed_squared']) {
        terms.push(`\\textrm{${name}}_{t-1}^{2}`)
      }
      if (regressor['erode_mask']) {
        terms.push(`\\textrm{${name}}`)
      }

      let regressor_terms = terms.join(' + ')

      if (regressor['tissues']) {
        regressor_terms += '\\;('
        regressor_terms += regressor['tissues'].map((tissue) => `\\textrm{${renaming[tissue]}}`).reduce((t, tt) => t + " + " + tt)
        regressor_terms += ')'
      }

      if (regressor['summary']) {
        if (typeof(regressor['summary']) == "object") {
          regressor_terms += ` ${regressor['summary']['filter']}`
          regressor_terms += ` ${regressor['summary']['method']}`
          if (['DetrendPC', 'PC'].indexOf(regressor['summary']['method']) > -1) {
            regressor_terms += `\\;${regressor['summary']['components']}`
          }
        } else {
          regressor_terms += `\\;\\textrm{${regressor['summary']}}`
        }
      }

      if (reg == 'PolyOrt') {
        regressor_terms += `\\;${regressor['degree']}`
      }

      if (reg == 'Bandpass') {
        regressor_terms += `\\;${regressor['bottom_frequency'] || 0.00}-${regressor['top_frequency'] || 9999.00}`
      }

      if (reg == 'Censor') {
        regressor_terms += `\\;\\textrm{${regressor['method']}}\\;\\textrm{${censor_renaming[regressor['threshold']['type']]}}:\\;${regressor['threshold']['value']}`
      }

      regressor_pieces.push(regressor_terms)
    }

    representation = regressor_pieces.map((p, i) => <MathJax.Node key={i} inline formula={p} />)

    if (!representation) {
      representation = 'No regressors selected'
    }

    return representation
  }

  renderDialogRegressor(regressor, i) {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        { this.renderRegressor(regressor, i, 'Motion', 'Motion', true) }
        { this.renderRegressor(regressor, i, 'GlobalSignal', 'Global Signal', true, true) }
        { this.renderRegressor(regressor, i, 'GrayMatter', 'Gray Matter', true, true, true) }
        { this.renderRegressor(regressor, i, 'WhiteMatter', 'White Matter', true, true, true) }
        { this.renderRegressor(regressor, i, 'CerebrospinalFluid', 'CerebrospinalFluid', true, true, true) }
        { this.renderRegressor(regressor, i, 'aCompCor', 'aCompCor', true, true, false, (
          <FormGroup row>
            <FormControl>
              <InputLabel>Tissues</InputLabel>
              <Select
                multiple
                fullWidth
                name={`functional.nuisance_regression.regressors.${i}.aCompCor.tissues`}
                value={regressor.getIn(['aCompCor', 'tissues'], fromJS(['WhiteMatter'])).toJS()}
                onChange={onChange}
                renderValue={selected => selected.map(t => ({
                  'WhiteMatter': 'White Matter',
                  'CerebrospinalFluid': 'Cerebrospinal Fluid'
                }[t])).join(', ')}
              >
                <MenuItem key="WhiteMatter" value="WhiteMatter">
                  <Checkbox checked={regressor.getIn(['aCompCor', 'tissues'], fromJS([])).indexOf('WhiteMatter') > -1} />
                  <ListItemText primary={"White Matter"} />
                </MenuItem>
                <MenuItem key="CerebrospinalFluid" value="CerebrospinalFluid">
                  <Checkbox checked={regressor.getIn(['aCompCor', 'tissues'], fromJS([])).indexOf('CerebrospinalFluid') > -1} />
                  <ListItemText primary={"Cerebrospinal Fluid"} />
                </MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        )) }
        { this.renderRegressor(regressor, i, 'tCompCor', 'tCompCor', true, true, false, (
          <React.Fragment>
            <FormGroup row>
              <TextField label="Threshold"
                name={`functional.nuisance_regression.regressors.${i}.tCompCor.threshold`}
                value={regressor.getIn(['tCompCor', 'threshold'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              />
            </FormGroup>
            <FormGroup row>
              <TextField label="Degree"
                name={`functional.nuisance_regression.regressors.${i}.tCompCor.degree`}
                value={regressor.getIn(['tCompCor', 'degree'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabelled label="By Slice">
                <Switch
                  name={`functional.nuisance_regression.regressors.${i}.tCompCor.by_slice`}
                  checked={regressor.getIn(['tCompCor', 'by_slice'])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </FormGroup>
            <FormGroup row>
              <FormControlLabelled label="Erode Mask">
                <Switch
                  name={`functional.nuisance_regression.regressors.${i}.tCompCor.erode_mask`}
                  checked={regressor.getIn(['tCompCor', 'erode_mask'])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
            </FormGroup>
          </React.Fragment>
        )) }
        { this.renderRegressor(regressor, i, 'PolyOrt', 'PolyOrt', false, false, false, (
          <React.Fragment>
            <FormGroup row>
              <TextField label="Degree"
                name={`functional.nuisance_regression.regressors.${i}.PolyOrt.degree`}
                value={regressor.getIn(['PolyOrt', 'degree'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              />
            </FormGroup>
          </React.Fragment>
        )) }
        { this.renderRegressor(regressor, i, 'Bandpass', 'Bandpass', false, false, false, (
          <React.Fragment>
            <FormGroup row>
              <TextField label="Bottom Frequency"
                name={`functional.nuisance_regression.regressors.${i}.Bandpass.bottom_frequency`}
                value={regressor.getIn(['Bandpass', 'bottom_frequency'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
                }}
              />
            </FormGroup>
            <FormGroup row>
              <TextField label="Top Frequency"
                name={`functional.nuisance_regression.regressors.${i}.Bandpass.top_frequency`}
                value={regressor.getIn(['Bandpass', 'top_frequency'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
                }}
              />
            </FormGroup>
          </React.Fragment>
        )) }
        { this.renderRegressor(regressor, i, 'Censor', 'Censor', false, false, false, (
          <React.Fragment>
            <FormGroup row>
              <TextField
                select
                label="Method"
                name={`functional.nuisance_regression.regressors.${i}.Censor.method`}
                value={regressor.getIn(["Censor", "method"], 'Kill')}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              >
                <MenuItem value={"Kill"}>Kill</MenuItem>
                <MenuItem value={"Zero"}>Zero</MenuItem>
                <MenuItem value={"Interpolate"}>Interpolate</MenuItem>
                <MenuItem value={"SpikeRegression"}>Spike Regression</MenuItem>
              </TextField>
            </FormGroup>
            <FormGroup row>
              <TextField label="Number of previous TRs to censor"
                name={`functional.nuisance_regression.regressors.${i}.Censor.number_of_previous_trs_to_censor`}
                value={regressor.getIn(['Censor', 'number_of_previous_trs_to_censor'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">TRs</InputAdornment>,
                }}
              />
            </FormGroup>
            <FormGroup row>
              <TextField label="Number of subsequent TRs to censor"
                name={`functional.nuisance_regression.regressors.${i}.Censor.number_of_subsequent_trs_to_censor`}
                value={regressor.getIn(['Censor', 'number_of_subsequent_trs_to_censor'])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">TRs</InputAdornment>,
                }}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                select
                label="Threshold type"
                name={`functional.nuisance_regression.regressors.${i}.Censor.threshold.type`}
                value={regressor.getIn(["Censor", "threshold", "type"])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              >
                <MenuItem value={"FD_J"}>Framewise Displacement - Jenkinson</MenuItem>
                <MenuItem value={"FD_P"}>Framewise Displacement - Power</MenuItem>
                <MenuItem value={"DVARS"}>DVARS</MenuItem>
              </TextField>
              <TextField label="Threshold"
                name={`functional.nuisance_regression.regressors.${i}.Censor.threshold.value`}
                value={regressor.getIn(["Censor", "threshold", "value"])}
                onChange={onChange}
                fullWidth margin="normal" variant="outlined"
              />
            </FormGroup>
          </React.Fragment>
        )) }
      </React.Fragment>
    )
  }

  renderRegressor(regressor, i, key, name, derivatives, summary, extraction, custom) {

    if (!regressor) {
      return null
    }

    const { classes, configuration, onChange } = this.props

    return (
      <ExpansionPanel key={`${i}-${key}`} expanded={regressor.getIn([key, 'enabled'], false)}>
        <ExpansionPanelSummary
            classes={{
              root: classes.header,
              content: classes.content,
            }}>
          <Switch
            name={`functional.nuisance_regression.regressors.${i}.${key}.enabled`}
            checked={regressor.getIn([key, 'enabled'], false)}
            onChange={onChange}
            color="primary"
          />
          <Typography variant="h6" style={{paddingTop: 13}}>{ name }</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
            classes={{
              root: classes.details,
            }}>
          <FormGroup style={{flexGrow: 1, margin: '0 0 10px 0'}}>

            { summary ? (
              <React.Fragment>
                <FormGroup row>
                  <TextField
                    select
                    label="Filter"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.summary.filter`}
                    value={regressor.getIn([key, 'summary', 'filter'], ' ')}
                    onChange={onChange}
                    fullWidth={true} margin="normal" variant="outlined"
                    className={classes.textField}
                    helperText='This field can be blank unless wanna apply a discrete cosine filter with 128s cut-off. Filter field must be blank, if selected method is DetrendPC'
                  >
                    <MenuItem value={''}>  </MenuItem>
                    <MenuItem value={"cosine"}>Cosine</MenuItem>
                  </TextField>
                </FormGroup>

                <FormGroup row>
                  <TextField
                    select
                    label="Method"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.summary.method`}
                    value={regressor.getIn([key, 'summary', 'method'], 'Mean')}
                    onChange={onChange}
                    fullWidth={true} margin="normal" variant="outlined"
                    className={classes.textField}
                    helperText=''
                  >
                    <MenuItem value={"PC"}>PC</MenuItem>
                    <MenuItem value={"DetrendPC"}>Detrended PC</MenuItem>
                    <MenuItem value={"Mean"}>Mean</MenuItem>
                    <MenuItem value={"NormMean"}>Norm Mean</MenuItem>
                    <MenuItem value={"DetrendNormMean"}>Detrended Norm Mean</MenuItem>
                  </TextField>
                </FormGroup>

                {
                  regressor.getIn([key, 'summary', 'method']) == 'PC' ||
                  regressor.getIn([key, 'summary', 'method']) == 'DetrendPC'
                ? (
                <FormGroup row>
                  <TextField label="Components"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.summary.components`}
                    value={regressor.getIn([key, 'summary', 'components'], 5)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                  />
                </FormGroup>
                ) : null }
              </React.Fragment>
            ) : null }

            {custom}

            { extraction ? (
              <React.Fragment>
                <FormGroup row>
                  <TextField label="Resolution"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.extraction_resolution`}
                    value={regressor.getIn([key, 'extraction_resolution'], 2)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                    }}
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Erode">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.erode_mask`}
                      checked={regressor.getIn([key, 'erode_mask'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </React.Fragment>
            ) : null }

            { derivatives ? (
              <React.Fragment>
                <FormGroup row>
                  <FormControlLabelled label="Delayed">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.include_delayed`}
                      checked={regressor.getIn([key, 'include_delayed'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.include_squared`}
                      checked={regressor.getIn([key, 'include_squared'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared Delayed">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.include_delayed_squared`}
                      checked={regressor.getIn([key, 'include_delayed_squared'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </React.Fragment>
            ) : null }
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  render() {
    const { classes, configuration, onChange } = this.props

    const regressors = configuration.getIn(["functional", "nuisance_regression", "regressors"]) // .map((r) => original.mergeDeep(r))

    let regressor = null
    if (this.state.editRegressor !== null) {
      regressor = regressors.get(this.state.editRegressor)
    }

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

          <FormGroup>
            <FormLabel>
              <Help
                type="pipeline"
                regex={/^Regressors/}
                help={`Select which nuisance signal corrections to apply.`}
              />
              Regressors
            </FormLabel>

            <Dialog
              open={!!regressor}
              onClose={this.handleClose}
              fullWidth={true}
            >
              <DialogTitle>{`Edit Nuisance Regressor`}</DialogTitle>
              <DialogContent>
                {
                  regressor ?
                  this.renderDialogRegressor(regressor, this.state.editRegressor) :
                  null
                }
              </DialogContent>
            </Dialog>

            <List>
              {
                regressors.map((regressor, i) => (
                  <ListItem button key={i} onClick={((regi) => () => this.handleEdit(regi))(i)}>
                    <ListItemText primary={
                      <span>{
                        this.getRegressorLabel(regressor.toJS()).reduce((result, child, index, children) => {
                          if (index < children.length - 1) {
                            return result.concat([child, <span key={`sep-${index}`}>, </span>])
                          }
                          return result.concat(child)
                        }, [])
                      }</span>
                    } style={{ padding: '0 115px 0 0' }} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={((regi) => () => this.handleEdit(regi))(i)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={((regi) => () => this.handleDuplicate(regi))(i)}>
                        <DuplicateIcon />
                      </IconButton>
                      <IconButton onClick={((regi) => () => this.handleDelete(regi))(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
              <Divider />
              <ListItem style={{ padding: 10 }}>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.handleNew()}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </FormGroup>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(NuisanceRegression.styles)(NuisanceRegression);
