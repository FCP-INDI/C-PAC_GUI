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

class RoiCheckbox extends PureComponent {

  keyArray = this.props.fullKey.split('.');
  entry = this.props.entries.getIn([this.props.roiPath]);

  state = {
    entries: this.props.entries,
    checked: this.entry.split(',').map(item => item.trim()).includes(this.props.option)
  }

  handleChangedOption = (values, config, option, roiPath, handleChange) => {
    const entry = this.props.entries.getIn([this.props.roiPath]);
    const fullOptionset = new Set(entry.split(',').map(s => s.trim()));
    let checked = !this.state.checked;
    let keyParts = values.target.name.split('[');
    let newKey = [...keyParts[0].split('.'), roiPath];

    let newOptionset = fullOptionset;
    if (checked) {
      newOptionset.add(option);
    } else {
      newOptionset.delete(option);
    }
    newOptionset = Array.from(newOptionset).filter(option => option.length).join(',');

    const newEntries = handleChange({
      target: {
        name: newKey,
        value: newOptionset
      }
    });

    this.setState({
      checked: checked,
      entries: newEntries.getIn(this.keyArray)
    });

    this.props.updateState(newEntries.getIn(this.keyArray));
  }

  render() {
    const { config, roiPath, fullKey, option, onChange } = this.props;
    return (
      <Checkbox
        name={`${fullKey}["${this.state.entry}"]`}
        onChange={(e) => this.handleChangedOption(e, config, option, roiPath, onChange)}
        checked={this.state.checked}
      />
    )
  }
}

class RoiTextField extends PureComponent {

  state = { path: this.props.entry[0] };

  changePath = (values) => {
    this.setState({path: values.target.value});
  }

  handleChangedPath = (values, config, entry, handleChange) => {
    let newConfig = config.delete(entry[0])
    newConfig = newConfig.setIn([values.target.value], entry[1])
    handleChange({
      target: {
        name: values.target.name,
        value: newConfig
      }
    })
  }

  render() {
    const { config, entry, fullKey, handleChange } = this.props;

    return (
      <TextField
        fullWidth={true}
        name={`${fullKey}`}
        onChange={(e) => this.changePath(e, config, entry[0])}
        onBlur={(e) => this.handleChangedPath(e, config, entry, handleChange)}
        value={this.state.path}
        helperText=''
      />
    )
  }
}

class RoiPaths extends PureComponent {

  sortPaths = (config) => {  // put new mask at end of list;
    let paths = Array.from(config.keySeq());
    paths.sort();
    if (paths.includes('')) {
      paths = [...paths.slice(1, paths.length), ''];
    }
    return paths;
  }

  state = {
    sortedPaths: this.sortPaths(this.props.config),  // so the sequence is relatively consistent
    entries: this.props.config
  };

  addMask = (fullKey, config, handleChange) => {
    const newConfig = config.setIn([""], "");
    handleChange({
      target: {
        name: fullKey,
        value:newConfig
      }
    });

    this.updateState(newConfig);
  }

  removeMask = (fullKey, config, entry, handleChange) => {
    const newConfig = config.delete(entry[0]);
    handleChange({
      target: {
        name: fullKey,
        value: newConfig
      }
    });

    this.updateState(newConfig);
  }

  updateState = (newConfig) => {
    this.setState({
      entries: newConfig,
      sortedPaths: this.sortPaths(newConfig)
    });
  }

  render() {
    const { config, configKey, parents, onChange, validOptions, classes={}, help="", regex="" } = this.props;

    const fullKey = [...parents, configKey].join('.');
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
            { this.state.entries.size ? this.state.sortedPaths.map((roiPath, i) => {
              let entries = this.state.entries;
              let updateState = this.updateState;
              const entry = [roiPath, this.state.entries.getIn([roiPath])];
              return (
                <TableRow key={`${fullKey}-${entry[0]}-${i}`}>
                    <TableCell padding="checkbox">
                      <IconButton className={classes.button} onClick={() => this.removeMask(fullKey, config, entry, onChange)}>
                      <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <RoiTextField
                        {...{config, entry, fullKey }}
                        handleChange={onChange}
                      />
                    </TableCell>
                    { validOptions.map((option) => (
                        <TableCell key={`${fullKey}-${i}-checkbox-${option}`} padding="checkbox">
                          <RoiCheckbox
                            {...{
                              config,
                              entries,
                              roiPath,
                              fullKey,
                              onChange,
                              option,
                              updateState
                            }}
                          />
                        </TableCell>
                    ))}
                    </TableRow>
                )
              }) : (
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "center" }}>
                    Add new rows with the "+" below.
                  </TableCell>
                </TableRow>
              )
            }
            </TableBody>
            { this.state.sortedPaths.includes('') ? null : (<TableFooter>
              <TableRow>
                <TableCell padding="checkbox" colSpan={7} className={classes.footer}>
                  <Fab aria-label="Add new ROI" onClick={() => this.addMask(fullKey, config, onChange)}>
                    <AddIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            </TableFooter>) }
          </Table>
        </Paper>
      </Grid>
      </Grid>
    )
  }
}
  
  export default RoiPaths;
  