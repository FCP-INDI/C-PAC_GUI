import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Help from 'components/Help'


class VMHC extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    const config = configuration.getIn(['derivatives', 'vmhc'])

    return (
      <Grid container>
        <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^template_symmetric_brain_only/}
            help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            fullWidth
          >
            <TextField
              label="Symmetric Brain Template"
              name="derivatives.vmhc.symmetric_brain"
              value={config.getIn(['symmetric_brain'])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^template_symmetric_skull/}
            help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            fullWidth
          >
            <TextField
              label="Symmetric Brain + Skull Template"
              name="derivatives.vmhc.symmetric_skull"
              value={config.getIn(['symmetric_skull'])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^dilated_symmetric_brain_mask/}
            help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            fullWidth
          >
            <TextField
              label="Dilated Symmetric Brain Mask"
              name="derivatives.vmhc.dilated_symmetric_brain"
              value={config.getIn(['dilated_symmetric_brain'])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
            />
          </Help>

          <Help
            type="pipeline"
            regex={/^configFileTwomm/}
            help={`Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.`}
            fullWidth
          >
            <TextField
              label="FLIRT Configuration file"
              name="derivatives.vmhc.flirt_configuration_file"
              value={config.getIn(['flirt_configuration_file'])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
            />
          </Help>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(VMHC.styles)(VMHC);
