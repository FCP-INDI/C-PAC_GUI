import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material'

import Collapse from '@mui/material/Collapse';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

import Immutable, { fromJS } from 'immutable';
import MathJax from 'react-mathjax'

import FormControlLabelled from 'components/FormControlLabelled'
import Help from 'components/Help'
import PipelineTextField from 'components/TextField'

import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DoneIcon,
  DuplicateIcon
} from 'components/icons';

/** One signal correction GUI component.
 * @TODO This component includes configuration validation information that is not yet encoded in C-PAC.
 */
class SignalCorrection extends PureComponent {
  static propTypes = {
    /** Regressor to render */
    regressor: PropTypes.object,
    /** Regresor index */
    i: PropTypes.number.isRequired,
    /** Key for rendered regressor */
    regressorKey: PropTypes.string.isRequired,
    /** Text to display for regressor name */
    name: PropTypes.string.isRequired,
    /** Boolean values to indicate whether these options are part of this signal correction */
    derivatives: PropTypes.bool,
    summary: PropTypes.bool,
    extraction: PropTypes.bool,
    /** Custom component to include in this signal correction */
    custom: PropTypes.node,
    /** Inherited style */
    classes: PropTypes.object,
    /** Method for mutating regressor in pipeline config */
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    derivatives: false,
    summary: false,
    extraction: false
  }

  handleRegressorSwitch = (onChange) => {
    const { i, regressor, regressorKey } = this.props;
    const name = `nuisance_corrections.2-nuisance_regression.Regressors.${i}`
    if (regressor.keySeq().includes(regressorKey)) {
      onChange({target: {
        name,
        value: regressor.deleteIn([regressorKey])
      }});
    } else {
      onChange({target: {
        name,
        value: regressor.setIn([regressorKey], {})
      }});
    }
  }

  render() {

    const {
      classes, custom, derivatives, extraction, i, name,
      onChange, regressor, summary
    } = this.props;

    if (!regressor) {
      return null;
    }

    const key = this.props.regressorKey;
    const expanded = regressor.keySeq().includes(key);

    return (
      <Accordion
        key={`${i}-${name}`}
        expanded={ expanded }
      >
        <AccordionSummary
            classes={{
              root: classes.header,
              content: classes.content,
            }}
        >
          <Switch
            name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}`}
            checked={ expanded }
            onChange={() => this.handleRegressorSwitch(onChange)}
            color="primary"
          />
          <Typography
            variant="h6"
            style={{paddingTop: 13}}
          >
            { name }
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={ { root: classes.details } }
        >
          <FormGroup style={ { flexGrow: 1, margin: '0 0 10px 0' } }>
            { summary ? (
              <>
                <FormGroup row>
                  <TextField
                    select
                    label="Filter"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.summary.filter`}
                    value={regressor.getIn([key, 'summary', 'filter'], '')}
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
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.summary.method`}
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
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.summary.components`}
                    value={regressor.getIn([key, 'summary', 'components'], 5)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                  />
                </FormGroup>
                ) : null }
              </>
            ) : null }

            { custom }

            { extraction ? (
              <>
                <FormGroup row>
                  <TextField label="Resolution"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.extraction_resolution`}
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
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.erode_mask`}
                      checked={regressor.getIn([key, 'erode_mask'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </>
            ) : null }

            { derivatives ? (
              <>
                <FormGroup row>
                  <FormControlLabelled label="Delayed">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.include_delayed`}
                      checked={regressor.getIn([key, 'include_delayed'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.include_squared`}
                      checked={regressor.getIn([key, 'include_squared'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Squared Delayed">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.${key}.include_delayed_squared`}
                      checked={regressor.getIn([key, 'include_delayed_squared'], false)}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </>
            ) : null }
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    )
  }
}

/** One CensorThreshold in a Censor Regressor. */
class CensorThreshold extends PureComponent {
  static propTypes = {
    /** Regressor to render */
    regressor: PropTypes.object,
    /** Regresor index */
    i: PropTypes.number.isRequired,
    /** Threshold index */
    j: PropTypes.number.isRequired,
    /** Threshold object (type & value) */
    threshold: PropTypes.instanceOf(Immutable.Map).isRequired,
    /** Methods for mutating regressor in pipeline config */
    handleThresholdChange: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  /** Function to delete a Threshold from a Censor Regressor.
   * @param {number} j Threshold index within Censor
   */
  handleDelete = (j) => {
    const { handleThresholdChange, i, onChange, regressor } = this.props;

    let thresholds = regressor.getIn(['Censor', 'thresholds'], fromJS([]));
    thresholds = thresholds.delete(j);

    handleThresholdChange(thresholds, i, onChange);
  };

  render() {
    const { i, j, onChange, regressor, threshold } = this.props;

    return (
      <FormGroup style={ { flexGrow: 1, margin: '0 0 10px 0' } }>
        <PipelineTextField
          select
          label="Threshold type"
          name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Censor.thresholds.${j}.type`}
          value={threshold.getIn(["type"], 'FD_J')}
          onChange={onChange}
          fullWidth margin="normal" variant="outlined"
        >
          <MenuItem value={"FD_J"}>Framewise Displacement - Jenkinson</MenuItem>
          <MenuItem value={"FD_P"}>Framewise Displacement - Power</MenuItem>
          <MenuItem value={"DVARS"}>DVARS</MenuItem>
        </PipelineTextField>
        <PipelineTextField label="Threshold"
          name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Censor.thresholds.${j}.value`}
          value={threshold.getIn(["value"])}
          onChange={onChange}
          fullWidth margin="normal" variant="outlined"
        />
        <IconButton onClick={() => this.handleDelete(j)}>
          <DeleteIcon />
        </IconButton>
        <Divider />
      </FormGroup>
    )
  }
}

/** A modal in which to edit a Regressor.
 * @TODO This component includes configuration validation information that is not yet encoded in C-PAC.
 * @TODO This component mixes controlled and uncontrolled components.
*/
class RegressorDialog extends PureComponent {
  static propTypes = {
    /** Regressor to render */
    regressor: PropTypes.object,
    /** Regresor index */
    editRegressor: PropTypes.number.isRequired,
    /** Inherited style */
    classes: PropTypes.object,
    /** Method for mutating regressor in pipeline config */
    onChange: PropTypes.func.isRequired,
    /** Method to close the modal */
    handleClose: PropTypes.func.isRequired
  }

  state = {
    regressorName: this.props.regressor.getIn(['Name'])
  }

  /** Helper to pass key, value to updater.
   * @param {Immtable.List} change updated list of regressors
   * @param {number} i Regressor index
   * @param {function} onChange
   */
  handleThresholdChange = ((change, i, onChange) => {
    onChange({
      target: {
        name: ['nuisance_corrections', '2-nuisance_regression', 'Regressors', i, 'Censor', 'thresholds'],
        value: change
      }
    });
  });

  /** Function to add a Threshold to a Censor Regressor
   * @param {number} i Regressor index
   */
  handleNewThreshold = (i) => {
    const { regressor, onChange } = this.props;

    this.handleThresholdChange(
      regressor.getIn(['Censor', 'thresholds'], fromJS([])).push(
        fromJS({
          type: 'FD_J',
          value: 0
        })
      ), i, onChange
    );
  };


  render() {
    const { classes, handleClose, onChange, regressor } = this.props;
    const i = this.props.editRegressor;

    return (
      <Dialog
        open={!!regressor}
        onClose={handleClose}
        fullWidth={true}
      >
        <Toolbar>
          <DialogTitle>{`Edit Nuisance Regressor`}</DialogTitle>
          <ListItemSecondaryAction>
            <IconButton onClick={ handleClose }>
              <DoneIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Toolbar>
        <DialogContent>
          <Accordion>
            <PipelineTextField
              { ...{ onChange } }
              name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Name`}
              label="Regressor Name"
              value={ this.state.regressorName }
              style={ { flexGrow: 1, margin: '10px 0 10px 10px', width: '95%' } }
            />
          </Accordion>
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-Motion`}
            regressorKey='Motion'
            name='Motion'
            derivatives={true}
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange }}
            key={`Regressor-${i}-GSR`}
            regressorKey='GlobalSignal'
            name='GlobalSignal'
            derivatives={true}
            summary={true}
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-GM`}
            regressorKey='GrayMatter'
            name='Gray Matter'
            derivatives={true}
            summary={true}
            extraction={true}
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-WM`}
            regressorKey='WhiteMatter'
            name='White Matter'
            derivatives={true}
            summary={true}
            extraction={true}
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-CSF`}
            regressorKey='CerebrospinalFluid'
            name='Cerebrospinal Fluid'
            derivatives={true}
            summary={true}
            extraction={true}
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-aCompCor`}
            regressorKey='aCompCor'
            name='aCompCor'
            derivatives={true}
            summary={true}
            custom={ (
              <FormGroup row>
                <FormControl>
                  <InputLabel>Tissues</InputLabel>
                  <Select
                    multiple
                    fullWidth
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.aCompCor.tissues`}
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
            ) }
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-tCompCor`}
            regressorKey='tCompCor'
            name='tCompCor'
            derivatives={true}
            summary={true}
            custom={ (
              <>
                <FormGroup row>
                  <TextField label="Threshold"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.tCompCor.threshold`}
                    value={regressor.getIn(['tCompCor', 'threshold'])}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                  />
                </FormGroup>
                <FormGroup row>
                  <TextField label="Degree"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.tCompCor.degree`}
                    value={regressor.getIn(['tCompCor', 'degree'])}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="By Slice">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.tCompCor.by_slice`}
                      checked={regressor.getIn(['tCompCor', 'by_slice'])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Erode Mask (one voxel)">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.tCompCor.erode_mask`}
                      checked={regressor.getIn(['tCompCor', 'erode_mask'])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
                <FormGroup row>
                  <FormControlLabelled label="Erode Mask (mm)">
                    <Switch
                      name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.tCompCor.erode_mask_mm`}
                      checked={regressor.getIn(['tCompCor', 'erode_mask_mm'])}
                      onChange={onChange}
                      color="primary"
                    />
                  </FormControlLabelled>
                </FormGroup>
              </>
            ) }
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-PolyOrt`}
            regressorKey='PolyOrt'
            name='PolyOrt'
            custom={ (
              <FormGroup row>
                <TextField label="Degree"
                  name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.PolyOrt.degree`}
                  value={regressor.getIn(['PolyOrt', 'degree'])}
                  onChange={onChange}
                  fullWidth margin="normal" variant="outlined"
                />
              </FormGroup>
            ) }
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-Bandpass`}
            regressorKey='BandPass'
            name='BandPass'
            custom={ (
              <>
                <FormGroup row>
                  <TextField label="Bottom Frequency"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Bandpass.bottom_frequency`}
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
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Bandpass.top_frequency`}
                    value={regressor.getIn(['Bandpass', 'top_frequency'])}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Hz</InputAdornment>,
                    }}
                  />
                </FormGroup>
              </>
            ) }
          />
          <SignalCorrection
            { ...{ classes, i, regressor, onChange } }
            key={`Regressor-${i}-Censor`}
            regressorKey='Censor'
            name='Censor'
            custom={ (
              <>
                <FormGroup row>
                  <TextField
                    select
                    label="Method"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Censor.method`}
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
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Censor.number_of_previous_trs_to_censor`}
                    value={regressor.getIn(['Censor', 'number_of_previous_trs_to_censor'], 0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">TRs</InputAdornment>,
                    }}
                  />
                </FormGroup>
                <FormGroup row>
                  <TextField label="Number of subsequent TRs to censor"
                    name={`nuisance_corrections.2-nuisance_regression.Regressors.${i}.Censor.number_of_subsequent_trs_to_censor`}
                    value={regressor.getIn(['Censor', 'number_of_subsequent_trs_to_censor'], 0)}
                    onChange={onChange}
                    fullWidth margin="normal" variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">TRs</InputAdornment>,
                    }}
                  />
                </FormGroup>
                <FormGroup style={ { flexGrow: 1, margin: '0 0 10px 0' } }>
                  {
                    regressor.getIn(["Censor", "thresholds"], fromJS([])).map((threshold, j) => <CensorThreshold
                        { ...{i, j, onChange, regressor, threshold} }
                        handleThresholdChange={this.handleThresholdChange}
                        key={`Censor-${j}`}
                      />
                    )
                  }
                  <IconButton onClick={() => this.handleNewThreshold(i)}>
                    <AddIcon />
                  </IconButton>
                </FormGroup>
              </>
            ) }
          />
        </DialogContent>
      </Dialog>
    )
  }
}

/** One regressor in the list. */
class RegressorListItem extends PureComponent {
  static propTypes = {
    /** Regressor to render */
    regressor: PropTypes.object,
    /** Regresor index */
    i: PropTypes.number.isRequired,
    /** Methods for mutating regressor in pipeline config */
    handlers: PropTypes.objectOf(PropTypes.func).isRequired
  }

  render() {
    const { handlers, i, regressor } = this.props;
    const regressorName = regressor.getIn(['Name']);
    const regressorFormula = (<span>{
      handlers.getRegressorLabel(regressor.toJS()).reduce((result, child, index, children) => {
        if (index < children.length - 1) {
          return result.concat([child, <span key={`sep-${index}`}>, </span>])
        }
        return result.concat(child)
      }, [])
    }</span>);

    return (
      <ListItem button key={i} onClick={
        ((regi) => () => handlers.handleEdit(regi))(i)
      }>
        { regressorName ?
          <ListItemText
            primary={regressorName}
            secondary={<MathJax.Provider>{regressorFormula}</MathJax.Provider>}
            style={ { padding: '0 115px 0 0' } }
          /> : 
          <ListItemText
            primary={<MathJax.Provider>{regressorFormula}</MathJax.Provider>}
            style={ { padding: '0 115px 0 0' } }
          />
        }
        <ListItemSecondaryAction>
          <IconButton onClick={((regi) => () => handlers.handleEdit(regi))(i)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={((regi) => () => handlers.handleDuplicate(regi))(i)}>
            <DuplicateIcon />
          </IconButton>
          <IconButton onClick={((regi) => () => handlers.handleDelete(regi))(i)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

}

/** Nusiance Regression component ported forward from 1.6+ with minimal changes. This component was more specific than the documentation in the default pipeline at the time of the GUI refactor from 1.6 to 1.8.
 * @TODO This component includes configuration validation information that is not yet encoded in C-PAC.
*/
class NuisanceRegression extends PureComponent {
  static propTypes = {
    //** Pipeline configuration */
    configuration: PropTypes.instanceOf(Immutable.Map),
    /** Method for mutating regressor in pipeline config */
    onChange: PropTypes.func.isRequired,
    /** Inherited style */
    classes: PropTypes.object
  }

  state = {
    editRegressor: null
  }

  static styles = theme => ({
    header: { padding: 0, minHeight: 10 },
    content: { padding: 0, minHeight: 10, margin: 0 },
    details: { padding: '0 10px 0 10px', minHeight: 10 },
    details_box: { margin: 0 },
    footer: { textAlign: 'right', padding: theme.spacing(2) },
    fullWidth: {
      width: "100%",
    },
    sectionTitle: {
      paddingTop: 6,
      paddingLeft: 6,
    }
  });

  /** Helper to pass key, value to updater.
   * @param {Immtable.List} change updated list of regressors
   * @param {function} onChange
   */
  handleChange = ((change, onChange) => {
    onChange({
      target: {
        name: ['nuisance_corrections', '2-nuisance_regression', 'Regressors'], 
        value: change
      }
    });
  });

  handleEdit = (regi) => {
    this.setState({ editRegressor: regi });
  };

  handleNew = () => {
    const { classes, configuration, onChange } = this.props
    let regressors = configuration.getIn(['Regressors']);
    regressors = regressors.push(fromJS({
      Name: `Regressor ${regressors.size + 1}`
    }));

    this.handleChange(regressors, onChange);
    this.setState({ editRegressor: regressors.size - 1 });
  };

  handleDuplicate = (regi) => {
    const { classes, configuration, onChange } = this.props;
    const regressors =
      configuration.getIn(['Regressors']).filter(i => i).push(
        configuration.getIn(['Regressors', regi])
      );
    this.handleChange(regressors, onChange);
  };

  handleDelete = (regi) => {
    const { classes, configuration, onChange } = this.props
    const regressors = configuration.getIn(['Regressors']).delete(regi)

    this.handleChange(regressors, onChange);
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

      if (reg == 'aCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
            filter: '',
            method: 'DetrendPC',
            components: 5,
          }
        }
      }

      if (reg == 'tCompCor') {
        if (!regressors[reg]['summary']) {
          regressors[reg]['summary'] = {
            filter: '',
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

      let terms = [];
      
      if (!(
        regressor['include_squared'] ||
        regressor['include_delayed'] ||
        regressor['include_delayed_squared'] ||
        regressor['erode_mask'] ||
        regressor['erode_mask_mm']
      )) {
          terms.push(`\\textrm{${name}}`);
      } else {
        if (regressor['include_squared']) {
          terms.push(`\\textrm{${name}}^{2}`);
        }
        if (regressor['include_delayed']) {
          terms.push(`\\textrm{${name}}_{t-1}`);
        }
        if (regressor['include_delayed_squared']) {
          terms.push(`\\textrm{${name}}_{t-1}^{2}`);
        }
        if (regressor['erode_mask']) {
          terms.push(`\\textrm{${name}}_{\\textrm{erode}}`);
        }
        if (regressor['erode_mask_mm']) {
          terms.push(`\\textrm{${name}}_{\\textrm{erode_mm}}`);
        }
      }

      let regressor_terms = terms.join(' + ');

      if (regressor['tissues']) {
        regressor_terms += '\\;(';
        regressor_terms += regressor['tissues'].map((tissue) => `\\textrm{${renaming[tissue]}}`).reduce((t, tt) => t + " + " + tt);
        regressor_terms += ')';
      }

      if (regressor['summary']) {
        if (typeof(regressor['summary']) == "object") {
          if (regressor.summary.filter) {
            regressor_terms += ` ${regressor['summary']['filter']}`;
          }
          if (regressor.summary.method && regressor.summary.components) {
            regressor_terms += ` ${regressor['summary']['method']}`
            if (['DetrendPC', 'PC'].indexOf(regressor['summary']['method']) > -1) {
              regressor_terms += `\\;${regressor['summary']['components']}`
            }
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
        regressor_terms += `^\\textrm{-${regressor.number_of_previous_trs_to_censor || 0}}_\\textrm{+${regressor.number_of_subsequent_trs_to_censor || 0}}\\;`;
        if (regressor.thresholds) {
          regressor.thresholds.forEach((thresh, regi) => {
            if (regi === 0) {
              regressor_terms += `[`;
            }
            regressor_terms += `\\;\\textrm{${censor_renaming[thresh['type']]}}:${thresh['value']}`;
            if (regi < regressor.thresholds.length - 1) {
              regressor_terms += `,\\;`;
            } else {
              regressor_terms += `]`;
            };
          });
        }
      }

      regressor_pieces.push(regressor_terms)
    }

    representation = regressor_pieces.map((p, i) => <MathJax.Node key={i} inline formula={p} />)

    if (!representation) {
      representation = 'No regressors selected'
    }

    return representation
  }

  render() {
    const { classes, configuration, onChange } = this.props;

    const regressors = configuration.getIn(['Regressors']);

    let regressor = null;
    if (this.state.editRegressor !== null) {
      regressor = regressors.get(this.state.editRegressor);
    }

    return (
      <Grid container>
        <Grid size={{ sm: 12 }}>
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
                  <RegressorDialog
                    { ...{ classes, onChange, regressor } }
                    editRegressor={ this.state.editRegressor }
                    handleClose={ this.handleClose }
                  /> :
                  null
                }
              </DialogContent>
            </Dialog>

            <List>
              {
                regressors.map((regressor, i) => (
                  regressor ? <RegressorListItem
                    key={`regressor-${i}`}
                    { ...{ i, regressor } }
                    handlers={ {
                      getRegressorLabel: this.getRegressorLabel,
                      handleDelete: this.handleDelete,
                      handleDuplicate: this.handleDuplicate,
                      handleEdit: this.handleEdit
                    } }
                  /> : null
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
