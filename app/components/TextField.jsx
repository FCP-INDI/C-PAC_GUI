import React, { PureComponent, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

/** Text field that updates on exiting the field or on pressing `Enter` rather than on every keystroke. */
class CustomTextField extends PureComponent {
  static propTypes = {
    /** Passed through to Material TextField */
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this field. */
    name: PropTypes.string.isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool,
    /** Function to call on change completion (pressing `Enter` or leaving field). */
    onChange: PropTypes.func.isRequired,
    /** Editable text or number to display */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  /** Manages the value in local state until user presses `Enter` or leaves the field.
   * @param {object} event              The event object
   * @param {string} event.target.value The current value of the text field (not stored yet)
   */
  changePath = (event) => {
    this.setState({ path: event.target.value });
  }

  /** Change the value in the stored pipeline configuration.
   * @param {object} values The event object
   * @param {string} values.target.name 
   * @param {string} values.target.value The current value of the text field (not stored yet)
   * @param {array<string>|string} entry exactly 2 entries (for ROI entries): key, comma-separated csv analyses, or just a string (for other text entries)
   * @param {function} handleChange
   * @param {config} config
   */
  handleChangedPath = (values, entry, handleChange, config) => {
    const { name, value } = values.target;
    switch (config) {
      case null:
      case undefined:
        handleChange({
          target: {
            name,
            value: entry
          }
        })
        break;
      default:
        let newConfig = config.delete(entry[0])
        newConfig = newConfig.setIn([value], entry[1])
        handleChange({
          target: {
            name,
            value: newConfig
          }
        })
    }
    
  }

  /** Handle keydowns in TextFields. Enter saves, everything else modifies local state.
   * @param {object} event
   * @param {array<string>|string} entry
   * @param {Immutable.Map} config
   * @param {function} checkboxesCallback
   */
  handleKeyDown = (event, entry, config, checkboxesCallback) => {
    if (event.key === 'Enter') {
      if (checkboxesCallback != undefined) {
        checkboxesCallback(false);
      }
      event.target.blur(event);
    } else {
      if (checkboxesCallback != undefined) {
        checkboxesCallback(true);
      }
      this.changePath(event);
    }
  }
}

/** A Material TextField with custom handling (to rerender less frequently) */
class PipelineTextField extends CustomTextField {
  static propTypes = {
    /** Passed through to Material TextField */
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this field. */
    name: PropTypes.string.isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool,
    /** Function to call on change completion (pressing `Enter` or leaving field). */
    onChange: PropTypes.func.isRequired,
    /** Editable text or number to display */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  state = { path: this.props.value };

  render() {
    const { name, isDefault, onChange, value } = this.props;
    const passthrough = { ...this.props };
    delete passthrough.isDefault;
    return (
      <TextField
        { ...passthrough }
        disabled={ isDefault }
        key={ name }
        value={ this.state.path }
        onChange={ (e) => this.changePath(e) }
        onKeyDown={ (e) => this.handleKeyDown(e, this.state.path) }
        onBlur={ (e) => this.handleChangedPath(e, this.state.path, onChange) }
      />
    )
  }
}

export default PipelineTextField;
export { CustomTextField };