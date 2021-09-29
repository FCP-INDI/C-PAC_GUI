import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/**
 * Recursive component to convert YAML structure to GUI.
 */
class RadioOption extends PureComponent {
  static propTypes = {
    option: PropTypes
    // /** Inherited style. */
    // classes: PropTypes.object.isRequired,
    // /** Current-depth Immutable Map to render. */
    // configuration: PropTypes.instanceOf(Immutable.Map).isRequired,
    // /** Function to handle changes to this component. */
    // onChange: PropTypes.func.isRequired,
    // /** Sequence of keys from the top of the overall pipeline configuration to this Map. */
    // parents: PropTypes.array.isRequired,
    // /** Current depth level (integer). */
    // level: PropTypes.number.isRequired,
    // /** Validation schema */
    // schema: PropTypes.object.isRequired
  }

  render() {
    const { option } = this.props;

    return (
      <FormControlLabel value={JSON.stringify(option)} control={<Radio />} label={JSON.stringify(option)} />
    )
  }
}