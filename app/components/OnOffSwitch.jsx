import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabelled from 'components/FormControlLabelled';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Help from 'components/Help';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';

class OnOffSwitch extends Component {
    render() {
      const { checked, key, label, name, onChange, regex } = this.props;
      switch (regex) {
        case null:
          return (
            <Grid key={key} item xs={12}>
              <FormGroup row>
                <FormControl>
                  <Switch
                    name={label}
                    checked={checked}
                    onChange={onChange}
                    color="primary"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
          )
        default:
          return (
            <Grid key={key} item xs={12}>
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
