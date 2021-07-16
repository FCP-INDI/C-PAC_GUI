import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

/** Text field that updates on exiting the field or on pressing `Enter` rather than on every keystroke. */
class CustomTextField extends PureComponent {
  /** Manages the value in local state until user presses `Enter` or leaves the field.
   * @param {object} values              The event object
   * @param {string} values.target.value The current value of the text field (not stored yet)
   */
  changePath = (values) => {
    this.setState({ path: values.target.value });
  }

  /** Change the value in the stored pipeline configuration.
   * @param {object} values The event object
   * @param {string} values.target.name 
   * @param {string} values.target.value The current value of the text field (not stored yet)
   * @param {array<string>} entry exactly 2 entries: key, comma-separated csv analyses
   * @param {function} handleChange
   * @param {config} config
   */
  handleChangedPath = (values, entry, handleChange, config) => {
    switch (config) {
      case null:
      case undefined:
        handleChange({
          target: {
            name: values.target.name,
            value: entry
          }
        })
        break;
      default:
        let newConfig = config.delete(entry[0])
        newConfig = newConfig.setIn([values.target.value], entry[1])
        handleChange({
          target: {
            name: values.target.name,
            value: newConfig
          }
        })
    }
    
  }

  /** Handle keydowns in TextFields. Enter saves, everything else modifies local state.
   * @param {object} event
   * @param {array<string>} entry
   * @param {function} handleChange
   * @param {Immutable.Map} config
   * @param {function} checkboxesCallback
   */
  handleKeyDown = (event, entry, handleChange, config, checkboxesCallback) => {
    if (event.key === 'Enter') {
      this.handleChangedPath(event, entry, handleChange, config);
      if (checkboxesCallback != undefined) {
        checkboxesCallback(false);
      }
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
    /** Function to call on change completion (pressing `Enter` or leaving field). */
    onChange: PropTypes.func.isRequired,
    /** Editable text or number to display */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  state = { path: this.props.value };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ path: this.props.value });
    }
  }

  render() {
    const { name, onChange } = this.props;

    return (
      <TextField
        { ...this.props }
        key={ name }
        value={ this.state.path }
        onChange={ (e) => this.changePath(e) }
        onKeyDown={ (e) => this.handleKeyDown(e, this.state.path, onChange) }
        onBlur={ (e) => this.handleChangedPath(e, this.state.path, onChange) }
      />
    )
  }
}

export default PipelineTextField;
export { CustomTextField };