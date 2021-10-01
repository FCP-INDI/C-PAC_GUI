import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import PipelineTextField from "components/TextField";

/**
 * Component to provide an option to a RadioGroup.
 */
class RadioOption extends PureComponent {
  static propTypes = {
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** Change method */
    onChange: PropTypes.func.isRequired,
    /** Schema definition for option */
    option: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.string.isRequired,
      () => null
    ]),
    /** Current value */
    value: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.string.isRequired,
      () => null
    ]),
    /** Currently selected type */
    optionType: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { option } = this.props;
    let { value } = this.props;
    let componentType, label;
    let isNull = false;
    if ([null, "", "None"].includes(value)) {
      isNull = true;
    };
    if ([null, "", "None"].includes(option)) {
      label = "None";
      componentType = "None";
      value = "";
    } else {
      switch (typeof(option)) {
        case "object":
          if (Object.keys(option).includes("type")) {
            if (option.type == "str") {
              componentType = "PipelineTextField";
              const checkType = "string";
              if (isNull) {
                value = "";
              }
            }
          } else {
            label = JSON.stringify(option);
            console.log(label);
          }
          break;
        default:
          componentType = "immutable";
          label = JSON.stringify(option);
      }
    }
    this.state = {
      componentType: componentType,
      label: label,
      isNull: isNull,
      value: value || "",
    };
  }

  changeCustom = (event) => {
    const { value } = event.target;
    const isNull = (value == "");
    this.setState({
      isNull: isNull,
      label: isNull ? "None" : value,
      value: value,
    }, () => this.update());
  }

  update = () => {
    const { name, onChange } = this.props;
    onChange({
      target: {
        name: name,
        value: this.state.value
      }
    });
  }

  render() {
    const { optionType } = this.props;
    switch (this.state.componentType) {
      case "PipelineTextField":
        return(
          <FormControlLabel
            value={this.state.value}
            control={<Radio
              checked={optionType == "string"}
            />}
            label={
              <PipelineTextField
                name={this.props.name}
                placeholder={this.state.value}
                value={this.state.value}
                onChange={this.changeCustom}
                onFocus={this.changeCustom}
              />
            }
            onChange={this.changeCustom}
          />
        )
        break;
      case "None":
        return (
          <FormControlLabel
            label={this.state.label}
            value={this.state.value}
            control={<Radio
              checked={optionType == "None"}
            />}
          />
        )
      case "immutable":
      default:
        return (
          <FormControlLabel
            label={this.state.label}
            value={this.state.value}
            control={<Radio />}
          />
        )
    }
  }
}

export default (RadioOption);