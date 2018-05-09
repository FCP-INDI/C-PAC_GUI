import React, { Component } from 'react';
import { connect } from 'react-redux';

import { environmentCheck, environmentSelect } from '../actions/main'

import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import {
  LoadingIcon,
  AuthErrorIcon,
  ErrorIcon,
  DoneIcon,
} from './icons';

import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import { white } from 'material-ui/colors';

class EnvironmentStatus extends Component {
  renderStyle(status) {
    const common = { color: white, margin: 4 }
    if (status === undefined) {
      return { ...common };
    } else {
      switch (status.mode) {
        case 'ONLINE':
          return { ...common, backgroundColor: green[500] };
        case 'OFFLINE':
          return { ...common, backgroundColor: red[500] };
        case 'AUTH_ERROR':
          return { ...common, backgroundColor: red[500] };
        default:
          return { ...common, backgroundColor: red[500] };
      }
    }
  }

  renderIcon(status) {
    if (status === undefined) {
      return <LoadingIcon />;
    } else {
      switch (status.mode) {
        case 'ONLINE':
          return <DoneIcon />;
        case 'OFFLINE':
          return <ErrorIcon />;
        case 'AUTH_ERROR':
          return <AuthErrorIcon />;
        default:
          return <ErrorIcon />;
      }
    }
  }

  render() {
    const { status } = this.props;
    return (
      <Avatar style={this.renderStyle(status)}>{ this.renderIcon(status) }</Avatar>
    );
  }
}

class EnvironmentSelector extends Component<Props> {
  props: Props;

  state = {
    environment: ''
  };

  handleChange = event => {
    const env = event.target.value;
    this.setState({ environment: env });
    this.props.environmentCheck(env);
  };

  componentWillUpdate(nextProps) {
    if (nextProps.main) {
      const { config: { environments = {} } = {} } = nextProps.main;

      if (environments[this.state.environment] && environments[this.state.environment].status) {
        const isOnline = environments[this.state.environment].status.mode === 'ONLINE'
        const isNotSelected = (nextProps.main.environment || {}).id !== this.state.environment
        if (isOnline && isNotSelected) {
          this.props.environmentSelect(this.state.environment);
        }
      }
    }
  }

  render() {
    const { config: { environments = {} } = {} } = this.props.main;

    return (
      <Grid container spacing={8}>
        <Grid item xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel>Environment</InputLabel>
            <Select
              fullWidth={true}
              value={this.state.environment}
              onChange={this.handleChange}
            >
              {
                Object.keys(environments).map((key) => {
                  return (<MenuItem key={key} value={key}>{ key }</MenuItem>)
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          { this.state.environment ? <EnvironmentStatus status={environments[this.state.environment].status} /> : null }
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
  environmentCheck,
  environmentSelect,
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentSelector)
