import React, { PureComponent } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Help from 'components/Help';
import FormControlLabelled from 'components/FormControlLabelled';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Immutable from 'immutable';

import { AddIcon, DeleteIcon } from 'components/icons';

class RoiPaths extends PureComponent {

  handleChangedOption = (values, option, fullOptionset, handleChange) => {

    let keyParts = values.target.name.split('[');
    let newKey = [...keyParts[0].split('.'), keyParts[1].replace(']', '').replace(/"/gi, '')];

    let newOptionset = new Set(fullOptionset.split(',').map(s => s.trim()))
    if (values.target.checked) {
      newOptionset.add(option);
    } else {
      newOptionset.delete(option);
    }
    newOptionset = Array.from(newOptionset).join(',');

    handleChange({
      target: {
        name: newKey,
        value: newOptionset
      }
    });
  }
  
  render() {
    const { config, configKey, parents, onChange, validOptions, classes={}, help="", regex="" } = this.props;

    const fullKey = [...parents, configKey].join('.')

    return (
      <Grid container>
      <Grid item sm={12}>

        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Help
                    type="pipeline"
                    regex={regex}
                    help={help}
                  />
                </TableCell>
                <TableCell>ROI Image</TableCell>
                { validOptions.map((option) => (
                    <TableCell key={`${fullKey}-checkbox-header-${option}`} padding="checkbox">{ option }</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            { config.size ? config.entrySeq().map((entry, i) => (
                <TableRow key={`${fullKey}-${entry[0]}-${i}`}>
                  <TableCell padding="checkbox">
                      <IconButton className={classes.button} onClick={() => this.removeMask(i)}>
                      <DeleteIcon />
                      </IconButton>
                  </TableCell>
                  <TableCell>
                      <TextField
                      fullWidth={true}
                      name={`${fullKey}.${i}.mask`}
                      onChange={onChange}
                      value={entry[0]}
                      helperText=''
                      />
                  </TableCell>
                  { validOptions.map((option) => (
                      <TableCell key={`${fullKey}-${i}-checkbox-${option}`} padding="checkbox">
                        <Checkbox
                          name={`${fullKey}["${entry[0]}"]`}
                          onChange={(e) => this.handleChangedOption(e, option, entry[1], onChange)}
                          checked={entry[1].split(',').map(item => item.trim()).includes(option)}
                        />
                        <TextField>
                        </TextField>
                      </TableCell>
                  ))}
                  </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    Add new rows with the "+" below.
                  </TableCell>
                </TableRow>
              )
            }
            </TableBody>
            <TableFooter>
              <TableRow >
                <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                  <Fab aria-label="Add new ROI" onClick={this.addMask}>
                    <AddIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Grid>
      </Grid>
    )
  }
}
  
  export default RoiPaths;
  