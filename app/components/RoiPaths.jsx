import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from 'components/PropTypes';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { CustomTextField } from 'components/TextField';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Help from 'components/Help';
import FormControlLabelled from 'components/FormControlLabelled';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Immutable from 'immutable';

import { AddIcon, DeleteIcon } from 'components/icons';

/** A Material Checkbox component to include in a table with ROI path keys and analysis headers. */
class RoiCheckbox extends PureComponent {
  static propTypes = {
    /** Map of strings like {path: comma-separated analyeses} */
    config: CustomPropTypes.roiPaths.isRequired,
    /** Dot-delimited sequence of keys from top of pipeline configuration leading up to but not including `configKey`. */
    fullKey: PropTypes.string.isRequired,
    /** Method to handle changes. */
    onChange: PropTypes.func.isRequired,
    /** The analysis the checkbox indiciates */
    option: PropTypes.string.isRequired,
    /** The path to the specified ROI image */
    roiPath: PropTypes.string.isRequired,
    /** Method to update the state of the checkbox's parent table */
    updateState: PropTypes.func.isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool,
    /** Should this checkbox be disabled now? */
    disabled: PropTypes.bool
  }

  keyArray = this.props.fullKey.split('.');
  entry = this.props.config.getIn([this.props.roiPath]);

  state = {
    checked: this.entry.split(',').map(item => item.trim()).includes(this.props.option),
    disabled: this.props.isDefault || this.props.disabled
  }

  componentDidUpdate(prevProps) {
    if (prevProps.config !== this.props.config) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleChangedOption = (values, config, option, roiPath, handleChange) => {
    const entry = this.props.config.getIn([this.props.roiPath]);
    const fullOptionset = new Set(entry.split(',').map(s => s.trim()));
    let checked = !this.state.checked;
    let keyParts = values.target.name.split('[');
    let newKey = [...keyParts[0].split('.'), roiPath];

    let newOptionset = fullOptionset;
    if (checked) {
      newOptionset.add(option);
    } else {
      newOptionset.delete(option);
    }
    newOptionset = Array.from(newOptionset).filter(option => option.length).join(', ');

    const newEntries = handleChange({
      target: {
        name: newKey,
        value: newOptionset
      }
    });

    this.setState({
      checked: checked,
      entries: newEntries.getIn(this.keyArray)
    });

    this.props.updateState(newEntries.getIn(this.keyArray));
  }

  render() {
    const { config, disabled, fullKey, isDefault, option, onChange, roiPath } = this.props;
    const { checked } = this.state;
    return (
      <Checkbox
        name={ `${fullKey}["${this.state.entry}"]` }
        onChange={ (e) => this.handleChangedOption(
          e, config, option, roiPath, onChange
        ) }
        checked={ checked }
        disabled={ isDefault || disabled }
      />
    )
  }
}

/** A Material TextField with custom handling (to rerender less frequently) for strings that are editable keys in a pipeline config. */
class ROITextField extends CustomTextField {
  static propTypes = {
    /** Passed through to Material TextField */
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this field. */
    fullKey: PropTypes.string.isRequired,
    /** Function to call on change completion (pressing `Enter` or leaving field). */
    handleChange: PropTypes.func.isRequired,
    /** 2-element array: editable text to display, comma-delimited analyses */
    entry: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Method to enable and disable checkboxes in parent table */
    disableCheckboxes: PropTypes.func.isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  state = { path: this.props.entry[0] };

  roiKeydown = (e, disableCheckboxes, entry, handleChange, config) => {
    this.handleKeyDown(
      e, entry, handleChange, config, disableCheckboxes
    );
  }

  exitTextBox = (e, disableCheckboxes, entry, handleChange, config) => {
    disableCheckboxes(false);
    this.handleChangedPath(e, entry, handleChange, config);
  }

  render() {
    const {
      config, disableCheckboxes, entry, fullKey, fullWidth, handleChange,
      isDefault, helperText
    } = this.props;

    return (
      <TextField
        fullWidth={ fullWidth || true }
        name={ `${fullKey}` }
        onChange={ (e) => this.changePath(e) }
        onKeyDown={ (e) => this.roiKeydown(e, disableCheckboxes, entry, config) }
        onBlur={ (e) => this.exitTextBox(e, disableCheckboxes, entry, handleChange, config) }
        onFocus={ () => disableCheckboxes(true) }
        value={ this.state.path }
        disabled={ isDefault }
        { ...{ helperText } }
      />
    )
  }
}

/** List of editable TextField keys and checkbox values for region-of-interest analyses */
class RoiPaths extends PureComponent {
  static propTypes = {
    /** Map of strings like {path: comma-separated analyeses} */
    configuration: CustomPropTypes.roiPaths.isRequired,
    /** Specific key of configuration map within its parent in the pipeline config */
    configKey: PropTypes.string.isRequired,
    /** Sequence of keys from top of pipeline configuration leading up to but not including `configKey`. */
    parents: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Headings for the checkboxes in the table of ROI paths */
    validOptions: PropTypes.arrayOf(PropTypes.string).isRequired,    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool
  }

  static defaultProps = {
    classes: {},
    help: '',
    regex: ''
  }

  /** Put new masks at the end of GUI list
   * @param {Immutable.Map} config
   * @returns {array} 
  */
  sortPaths = (config) => {
    let paths = Array.from(config.keySeq());
    paths.sort();
    if (paths.includes('')) {
      paths = [...paths.slice(1, paths.length), ''];
    }
    return paths;
  }

  state = {
    checkboxesDisabled: false,  // when keys change, the list resorts, so we disable changes to the rest of an entry while the path is in edit mode
    sortedPaths: this.sortPaths(this.props.config),  // so the sequence is relatively consistent
    entries: this.props.config
  };

  componentDidUpdate(prevProps) {
    if (prevProps.config !== this.props.config) {
      this.setState({
        sortedPaths: this.sortPaths(this.props.config),
        entries: this.props.config
      });
    }
  }

  /** Adds a new row to the GUI list.
   * @param {string} fullKey Dot-delimited sequence of keys to this array
   * @param {Immutable.Map} config This pipeline configuration
   * @param {function} handleChange Function to handle changes to this pipeline config 
   */
  addMask = (fullKey, config, handleChange) => {
    const newConfig = config.setIn([""], "");
    handleChange({
      target: {
        name: fullKey,
        value:newConfig
      }
    });
    this.updateState(newConfig);
  }

  /** Removes a specified row from the GUI list.
   * @param {string} fullKey Dot-delimited sequence of keys to this array
   * @param {Immutable.Map} config This pipeline configuration
   * @param {array<string>} entry 2 elements: key, comma-delimited analyses
   * @param {function} handleChange Function to handle changes to this pipeline config 
   */
  removeMask = (fullKey, config, entry, handleChange) => {
    const newConfig = config.delete(entry[0]);
    handleChange({
      target: {
        name: fullKey,
        value: newConfig
      }
    });
    this.updateState(newConfig);
  }

  /** Enable or disable checkboxes in GUI list. */
  disableCheckboxes = (newStatus) => {
    this.setState({
      checkboxesDisabled: newStatus
    });
  }

  /** Applies a change to the GUI list.
   * @param {Immutable.Map} newConfig 
   */
  updateState = (newConfig) => {
    this.setState({
      entries: newConfig,
      sortedPaths: this.sortPaths(newConfig)
    });
  }

  render() {
    const {
      classes, config, configKey, help, isDefault, onChange, parents,
      regex, validOptions
    } = this.props;

    const fullKey = [...parents, configKey].join('.');
    return (
      <Grid container>
        <Grid item sm={12}>

          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Help
                      type="pipeline"
                      regex={regex}
                      help={help}
                    />
                  </TableCell>
                  <TableCell>ROI Image</TableCell>
                  { validOptions.map((option) => (
                      <TableCell key={`${fullKey}-checkbox-header-${option}`} padding="checkbox">{ option }</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              { this.state.entries.size ? this.state.sortedPaths.map((roiPath, i) => {
                let entries = this.state.entries;
                let updateState = this.updateState;
                const entry = [roiPath, this.state.entries.getIn([roiPath])];
                return (
                  <TableRow key={ `${fullKey}-${entry[0]}-${i}` }>
                      <TableCell padding="checkbox">
                        <IconButton
                          className={ classes.button }
                          onClick={
                            () => this.removeMask(
                              fullKey, config, entry, onChange
                            )
                          }
                          disabled={
                            isDefault || this.state.checkboxesDisabled
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <ROITextField
                          {...{config, entry, fullKey, isDefault }}
                          handleChange={onChange}
                          disableCheckboxes={this.disableCheckboxes}
                        />
                      </TableCell>
                      { validOptions.map((option) => (
                          <TableCell key={`${fullKey}-${i}-checkbox-${option}`} padding="checkbox">
                            <RoiCheckbox
                              {...{
                                config,
                                roiPath,
                                fullKey,
                                isDefault,
                                onChange,
                                option,
                                updateState
                              }}
                              disabled={ this.state.checkboxesDisabled }
                            />
                          </TableCell>
                      ))}
                      </TableRow>
                  )
                }) : (
                  <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: "center" }}>
                      Add new rows with the "+" below.
                    </TableCell>
                  </TableRow>
                )
              }
              </TableBody>
              { isDefault || this.state.sortedPaths.includes('') ? null : (<TableFooter>
                <TableRow>
                  <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                    <Fab aria-label="Add new ROI" onClick={() => this.addMask(fullKey, config, onChange)}>
                      <AddIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              </TableFooter>) }
            </Table>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
  
export default RoiPaths;
