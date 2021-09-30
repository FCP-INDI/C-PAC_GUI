import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

/**
 * Recursive component to convert YAML structure to GUI.
 */
class RadioOption extends PureComponent {
  static propTypes = {
    option: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.string.isRequired,
      () => null
    ]),
  }

  render() {
    const { isDefault, name, onChange, option } = this.props;
    let componentType, label, value;
    if (option == null) {
      label = "None";
      value = "";
    } else {
      switch (typeof(option)) {
        case "object":
          if (Object.keys(option).includes('type')) {
            if (option.type == "str") {
              componentType = "PipelineTextField";
            }
          } else {
            label = JSON.stringify(option);
            console.log(label);
            console.log(Object.keys(option));
          }
          break;
        default:
          value = option;
          label = value;
          componentType = "immutable";
      }
    }
    switch (componentType) {
      case "PipelineTextField":
        return(
          <FormControlLabel
              value=''
              control={<Radio />}
              label={
                <TextField
                  placeholder="other"
                  onChange={this.handleOtherChange}
                  onFocus={this.focusOther}
                />
              }
              onChange={() => this.selectItem(this.state.otherText)}
            />
          </RadioGroup>
        )
        break;
      case "immutable":
      default:
        return (
          <FormControlLabel { ...{label, value} } control={<Radio />} />
        )
    }
  }
}

export default (RadioOption);