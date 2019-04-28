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

import FormControlLabelled from 'components/FormControlLabelled'
import Help from 'components/Help'

import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DuplicateIcon
} from 'components/icons';

class NuisanceRegression extends Component {

  state = {
    editRegressor: null
  }

  static styles = theme => ({
    header: { padding: 0, minHeight: 10 },
    content: { padding: 0, minHeight: 10, margin: 0 },
    details: { padding: '0 10px 0 10px', minHeight: 10 },
    details_box: { margin: 0 },
    footer: { textAlign: 'right', padding: theme.spacing.unit * 2 }
  });

  handleEdit = (regi) => {
    this.setState({ editRegressor: regi });
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
    this.setState({ deleteRegressor: regi });
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
      'GreyMatter': 'GM',
      'GlobalSignal': 'GR',
      'Motion': 'Mot',
    }

    let representation = ''

    const regressor_pieces = []
    for(let reg of ['Motion', 'GlobalSignal', 'WhiteMatter', 'CerebrospinalFluid', 'GreyMatter','aCompCor', 'tCompCor', ]) {
      if (regressors[reg] === undefined) {
        continue
      }

      if (!regressors[reg].enabled) {
        continue
      }

      if (reg == 'aCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
            method: 'DetrendPC',
            components: 5,
          }
        }
      }

      if (reg == 'tCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
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

      let terms = [name]

      if (regressor['include_squared']) {
        terms.push(`${name}²`)
      }
      if (regressor['include_delayed']) {
        terms.push(`${name}ₜ₋₁`)
      }
      if (regressor['include_delayed_squared']) {
        terms.push(`${name}ₜ₋₁²`)
      }

      let regressor_terms = terms.join(' + ')

      if (regressor['tissues']) {
        regressor_terms += ' ('
        regressor_terms += regressor['tissues'].map((tissue) => renaming[tissue]).reduce((t, tt) => t + " + " + tt)
        regressor_terms += ')'
      }

      if (regressor['summary']) {
        if (typeof(regressor['summary']) == "object") {
          regressor_terms += ` ${regressor['summary']['method']}`
          if (['DetrendPC', 'PC'].indexOf(regressor['summary']['method']) > -1) {
            regressor_terms += ` ${regressor['summary']['components']}`
          }
        } else {
          regressor_terms += ` ${regressor['summary']}`
        }
      }

      regressor_pieces.push(regressor_terms)
    }

    representation += regressor_pieces.join(", ") + "\n"

    return representation
  }

  addRegressor = (event) => {
    const { configuration, onChange } = this.props
    const next = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).size

    onChange([
      [
        `functional.nuisance_regression.regressors.${next}`,
        fromJS({})
      ]
    ])
  }

  removeRegressor(i) {
    const { classes, configuration, onChange } = this.props
    const regressor = configuration.getIn(['functional', 'nuisance_regression', 'regressors']).delete(i)

    onChange([
      [['functional', 'nuisance_regression', 'regressors'], regressor]
    ])
  }

  renderDialogRegressor(regressor, i) {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        { this.renderRegressor(regressor, i, 'Motion', 'Motion', true) }
        { this.renderRegressor(regressor, i, 'GlobalSignal', 'Global Signal', true, true) }
        { this.renderRegressor(regressor, i, 'GreyMatter', 'Grey Matter', true, true, true) }
        { this.renderRegressor(regressor, i, 'WhiteMatter', 'White Matter', true, true, true) }
        { this.renderRegressor(regressor, i, 'CerebrospinalFluid', 'CerebrospinalFluid', true, true, true) }
        { this.renderRegressor(regressor, i, 'aCompCor', 'aCompCor', true, false, false, (
          <FormControl>
            <InputLabel>Tissues</InputLabel>
            <Select
              multiple
              name={`functional.nuisance_regression.regressors.${i}.aCompCor.tissues`}
              value={regressor.getIn(['aCompCor', 'tissues'], []).toJS()}
              onChange={onChange}
              renderValue={selected => selected.map(t => ({
                'WhiteMatter': 'White Matter',
                'CerebrospinalFluid': 'Cerebrospinal Fluid'
              }[t])).join(', ')}
            >
              <MenuItem value="WhiteMatter">
                <Checkbox checked={regressor.getIn(['aCompCor', 'tissues'], []).indexOf('WhiteMatter') > -1} />
                <ListItemText primary={"White Matter"} />
              </MenuItem>
              <MenuItem value="CerebrospinalFluid">
                <Checkbox checked={regressor.getIn(['aCompCor', 'tissues'], []).indexOf('CerebrospinalFluid') > -1} />
                <ListItemText primary={"Cerebrospinal Fluid"} />
              </MenuItem>
            </Select>
          </FormControl>
        )) }
        { this.renderRegressor(regressor, i, 'tCompCor', 'tCompCor', true, false, false, (
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
              <FormControlLabelled label="By Slice">
                <Switch
                  name={`functional.nuisance_regression.regressors.${i}.tCompCor.by_slice`}
                  checked={regressor.getIn(['tCompCor', 'by_slice'])}
                  onChange={onChange}
                  color="primary"
                />
              </FormControlLabelled>
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
      <ExpansionPanel key={`${i}-${key}`} expanded={regressor.getIn([key, 'enabled'])}>
        <ExpansionPanelSummary
            classes={{
              root: classes.header,
              content: classes.content,
            }}>
          <Switch
            name={`functional.nuisance_regression.regressors.${i}.${key}.enabled`}
            checked={regressor.getIn([key, 'enabled'])}
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
            { custom }

            { summary ? (
              <React.Fragment>
                <FormGroup row>
                  <TextField
                    select
                    label="Summary"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.summary.method`}
                    value={regressor.getIn([key, 'summary', 'method'])}
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

            { extraction ? (
              <React.Fragment>
                <FormGroup row>
                  <TextField label="Resolution"
                    name={`functional.nuisance_regression.regressors.${i}.${key}.extraction_resolution`}
                    value={regressor.getIn([key, 'extraction_resolution'])}
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
                      checked={regressor.getIn([key, 'erode_mask'])}
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
                      checked={regressor.getIn([key, 'include_delayed'])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.include_squared`}
                      checked={regressor.getIn([key, 'include_squared'])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared Delayed">
                    <Switch
                      name={`functional.nuisance_regression.regressors.${i}.${key}.include_delayed_squared`}
                      checked={regressor.getIn([key, 'include_delayed_squared'])}
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

    const i = 0
    const regressors = configuration.getIn(["functional", "nuisance_regression", "regressors"])

    let regressor = null
    if (this.state.editRegressor) {
      regressor = configuration.getIn(["functional", "nuisance_regression", "regressors", this.state.editRegressor])
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
              open={this.state.editRegressor !== null}
              onClose={this.handleClose}
              fullWidth={true}
            >
              <DialogTitle>{`Edit Nuisance Regressor`}</DialogTitle>
              <DialogContent>
                {
                  this.state.editRegressor ? this.renderDialogRegressor(regressor, this.state.editRegressor) : null
                }
              </DialogContent>
            </Dialog>

            <List>
              {
                regressors.map((regressor, i) => (
                  <ListItem button key={i}>
                    <ListItemText primary={
                      <span>{ this.getRegressorLabel(regressor.toJS()) }</span>
                    } />
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
              <ListItem button style={{ padding: 10 }}>
                <ListItemSecondaryAction>
                  <IconButton>
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
