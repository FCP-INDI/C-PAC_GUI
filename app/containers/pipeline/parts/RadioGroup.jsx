import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import RadioGroup from "@material-ui/core/RadioGroup";
import RadioOption from "./RadioOption";

/**
 * Component to provide an option to a RadioGroup.
 */
class CPACRadioGroup extends PureComponent {
  static propTypes = {
    // label, name, onChange, validOptions
    /** String label for field */
    label: PropTypes.string.isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** Change method */
    onChange: PropTypes.func.isRequired,
    /** Schema definition for option */
    validOptions: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
  }

  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      optionType: this.typeOfOption(value),
      value: value,
    }
  }

  typeOfOption = (option) => {
    let optionType = typeof(option);
    if (
      (optionType == "string") && (option == "")
    ) {
      optionType = "None";
    }
    return optionType
  }

  updateGroup = (event) => {
    const { name, onChange } = this.props;
    const { value } = event.target;
    onChange({
      target: {
        name: name,
        value: value,
      }
    });
    this.setState({
      optionType: this.typeOfOption(value),
      value: value,
    });
  }

  render() {
    const { label, name, validOptions } = this.props;

    return(
      <RadioGroup
        { ...{ name, label } }
        onChange={this.updateGroup}
        value={this.state.value}
      >
        {validOptions.Any.map((option) => <RadioOption
            key={option}
            { ...{ name, option } }
            onChange={this.updateGroup}
            value={this.state.value}
            optionType={this.state.optionType}
          />
        )}
      </RadioGroup>
    )
  }
}

export default (CPACRadioGroup);