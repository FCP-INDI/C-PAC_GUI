import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabelled from 'components/FormControlLabelled';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Help from 'components/Help';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';

/** A Boolean toggle component. */
class OnOffSwitch extends PureComponent {
  static propTypes = {
    /** Text label to display by switch. */
    label: PropTypes.string,
    /** On or off? (true == On). */
    checked: PropTypes.bool.isRequired,
    /** Dot-delimited sequence of keys from the top of the overall pipeline configuration to this field. */
    name: PropTypes.string.isRequired,
    /** Function to call on change. */
    onChange: PropTypes.func.isRequired,
    /** Regular expression for help field (deprecated). */
    regex: PropTypes.instanceOf(RegExp)
  }

  render() {
    const { checked, isDefault, label, name, onChange, regex } = this.props;

    switch (regex) {
      case null:
        return (
          <Grid item xs={12}>
            <FormGroup row>
              <FormControl>
                <Switch
                  name={name}
                  checked={checked}
                  onChange={onChange}
                  color="primary"
                  disabled={ isDefault }
                />
              </FormControl>
            </FormGroup>
          </Grid>
        )
      default:
        return (
          <Grid item xs={12}>
            <FormGroup row>
              <Help
                type="pipeline"
                regex={regex}
                help=""
              >
                <FormControlLabelled label={label}>
                  <Switch
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                    disabled={ isDefault }
                  />
                </FormControlLabelled>
              </Help>
            </FormGroup>
          </Grid>
        )
    }
  }
}

export default withRouter(OnOffSwitch);
