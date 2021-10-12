import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";
import { withStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Help from "components/Help";
import PipelineTextField from "components/TextField";

/** Editable item in a list within a pipeline configuration. */
class PipelineStringPart extends PureComponent {
  static propTypes = {
    /** 2-element array: key, value */
    entry: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this list (array). */
    name: PropTypes.string.isRequired,
    /** Text label to display by TextField. */
    label: PropTypes.string,
    /** Change method */
    onChange: PropTypes.func.isRequired,
    /** Is this a default, immutable pipeline? */
    isDefault: PropTypes.bool,
    /** Validation schema */
    schema: PropTypes.object.isRequired,
    /** Regular expression */
    regex: PropTypes.instanceOf(RegExp).isRequired,
  }

  render() {
    const { entry, isDefault, label, name, onChange, regex, schema } = this.props;
    const immutableOptions = schema.getIn(name.split("."));
    const validOptions = immutableOptions != undefined ? immutableOptions.toJS() : undefined;
    if (validOptions != undefined && Object.keys(validOptions)[0] == "In") {
      const options = Object.keys(validOptions.In)[0] == "set" ? validOptions.In.set : validOptions.In;
      return (
        <Grid key={entry[0]} item xs={12}>
          <FormGroup row>
            <Help
              type="pipeline"
              regex={regex}
              help=""
              fullWidth >
              <TextField
                { ...{
                  label, name, onChange
                } }
                fullWidth
                select
                margin="normal"
                variant="outlined"
                value={entry[1]}
              >
                { options.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                    >{option}</MenuItem>
                  )
                ) }
              </TextField>
            </Help>
          </FormGroup>
        </Grid>
      )
    }
    return (
      <Grid key={entry[0]} item xs={12}>
        <FormGroup row>
          <Help
            type="pipeline"
            regex={regex}
            help=""
            fullWidth >
            <PipelineTextField
              { ...{
                label, isDefault, name, onChange
              } }
              fullWidth
              margin="normal"
              variant="outlined"
              value={entry[1]}
            />
          </Help>
        </FormGroup>
      </Grid>
    )
  }
}

export default PipelineStringPart;
