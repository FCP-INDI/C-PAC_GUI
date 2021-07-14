import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';

class CustomTextField extends PureComponent {
  changePath = (values) => {
    this.setState({ path: values.target.value });
  }

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

  handleKeyDown = (event, entry, handleChange, config) => {
    if (event.key === 'Enter') {
      this.handleChangedPath(event, entry, handleChange, config);
    } else {
      this.changePath(event);
    }
  }
}

class ROITextField extends CustomTextField {

  state = { path: this.props.entry[0] };

  render() {
    const { config, entry, fullKey, handleChange, helperText, value } = this.props;
    return (
      <TextField
        fullWidth={ true }
        name={ `${fullKey}` }
        onChange={ (e) => this.changePath(e) }
        onKeyDown={ (e) => this.handleKeyDown(e, entry, handleChange, config) }
        onBlur={ (e) => this.handleChangedPath(e, entry, handleChange, config) }
        value={ this.state.path }
        helperText={ helperText }
      />
    )
  }
}

class PipelineTextField extends CustomTextField {

  state = { path: this.props.value };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ path: this.props.value });
    }
  }

  render() {
    const { config, onChange } = this.props;

    return (
      <TextField
        { ...this.props }
        key={ this.props.value }
        value={ this.state.path }
        onChange={ (e) => this.changePath(e) }
        onKeyDown={ (e) => this.handleKeyDown(e, this.state.path, onChange) }
        onBlur={ (e) => this.handleChangedPath(e, this.state.path, onChange) }
      />
    )
  }
}

export default ROITextField;
export { PipelineTextField };