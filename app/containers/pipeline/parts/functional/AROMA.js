import React, { Component } from 'react'

import { withStyles, Typography } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Switch from '@material-ui/core/Switch'

import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import Help from 'components/Help'


class AROMA extends Component {

  static styles = theme => ({
  })

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>
          <Help
            type="pipeline"
            regex={/^aroma_denoise_type/}
            help={`Types of denoising strategy.`}
            fullWidth
          >
            <TextField
              select
              label="Denoising Strategy"
              name="functional.aroma.denoising_strategy"
              value={configuration.getIn(["functional", "aroma", "denoising_strategy"])}
              onChange={onChange}
              fullWidth={true} margin="normal" variant="outlined"
              className={classes.textField}
              helperText=''
            >
              <MenuItem value={"non-aggressive"}>Non-Aggressive</MenuItem>
              <MenuItem value={"aggressive"}>Aggressive</MenuItem>
            </TextField>
          </Help>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(AROMA.styles)(AROMA)
