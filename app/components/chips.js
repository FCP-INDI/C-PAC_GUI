import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fromJS, isImmutable } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'

import {
  SchedulerIcon,
  ExecutionCurrentBackendIcon,
  PipelineIcon,
  DatasetIcon,
} from '../components/icons'

import {
  selectScheduler,
  selectSchedulerBackend,
} from '../reducers/cpacpy'


class PipelineChip extends Component {

  static mapStateToProps = (state, props) => {
    const { pipeline } = props
    return {
      pipeline: state.main.getIn(['config', 'pipelines']).find((p) => p.get('id') == pipeline),
    }
  }

  static mapDispatchToProps = {
  }

  render() {
    const { pipeline, version } = this.props
    if (version) {
      return (
        <Badge
          badgeContent={`v${version}`}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Chip
            icon={<PipelineIcon />}
            label={pipeline.get('name')}
            color="primary"
          />
        </Badge>
      )
    } else {
      return (
        <Chip
          icon={<PipelineIcon />}
          label={pipeline.get('name')}
          color="primary"
        />
      )
    }
  }
}

const ConnectedPipelineChip = connect(PipelineChip.mapStateToProps, PipelineChip.mapDispatchToProps)(PipelineChip)
export { ConnectedPipelineChip as PipelineChip }


class DatasetChip extends Component {

  static styles = theme => ({
    view: {
      marginLeft: 4,
      paddingLeft: 4,
      borderLeft: '1px solid white',
    }
  })


  static mapStateToProps = (state, props) => {
    const { dataset } = props
    return {
      dataset: state.dataset.getIn(['datasets']).find((d) => d.get('id') == dataset),
    }
  }

  static mapDispatchToProps = {
  }

  render() {
    const { dataset, version, classes } = this.props
    if (version) {
      return (
        <Badge
          badgeContent={
            <>{`v${version}`}<span className={classes.view}>NYU</span></>
          }
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Chip
            icon={<DatasetIcon />}
            label={
              dataset.get('name')
            }
            color="primary"
          />
        </Badge>
      )
    } else {
      return (
        <Chip
          icon={<DatasetIcon />}
          label={
            <>
            {dataset.get('name')}
            </>
          }
          color="primary"
        />
      )
    }
  }
}

const ConnectedDatasetChip =
  connect(DatasetChip.mapStateToProps, DatasetChip.mapDispatchToProps)
    (withStyles(DatasetChip.styles)(DatasetChip))
export { ConnectedDatasetChip as DatasetChip }


class SchedulerChip extends Component {

  static mapStateToProps = (state, props) => {
    const { scheduler } = props
    return {
      schedulerId: scheduler,
      scheduler: selectScheduler(scheduler)(state.cpacpy)
    }
  }

  static mapDispatchToProps = {
  }

  static styles = theme => ({
    badgeIcon: {
      fontSize: theme.typography.pxToRem(14)
    },
  })


  render() {
    const { name: scheduler, backend } = this.props
    if (!scheduler) {
      return null
    }
    if (backend) {
      return (
        <Badge
          badgeContent={<ExecutionCurrentBackendIcon backend={backend} />}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Chip
            icon={<SchedulerIcon />}
            label={ scheduler }
            color="primary"
          />
        </Badge>
      )
    } else {
      return (
        <Chip
          icon={<SchedulerIcon />}
          label={ scheduler }
          color="primary"
        />
      )
    }
  }
}

const ConnectedSchedulerChip =
  connect(SchedulerChip.mapStateToProps, SchedulerChip.mapDispatchToProps)
    (withStyles(SchedulerChip.styles)
      (SchedulerChip))

export { ConnectedSchedulerChip as SchedulerChip }


class SchedulerBackendChip extends Component {

  static mapStateToProps = (state, props) => {
    const { scheduler, backend } = props
    return {
      scheduler: selectScheduler(scheduler)(state.cpacpy),
      backend: selectSchedulerBackend(scheduler, backend)(state.cpacpy),
    }
  }

  static mapDispatchToProps = {
  }

  static styles = theme => ({
    badgeIcon: {
      fontSize: theme.typography.pxToRem(14)
    },
  })

  render() {
    const { scheduler, backend, classes } = this.props
    if (!scheduler) {
      return null
    }
    if (backend) {
      return (
        <Badge
          badgeContent={<ExecutionCurrentBackendIcon backend={backend.get('backend')} />}
          color="secondary"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Chip
            icon={<SchedulerIcon />}
            label={scheduler.get('name')}
            color="primary"
          />
        </Badge>
      )
    } else {
      return (
        <Chip
          icon={<SchedulerIcon />}
          label={scheduler.get('name')}
          color="primary"
        />
      )
    }
  }
}

const ConnectedSchedulerBackendChip =
  connect(SchedulerBackendChip.mapStateToProps, SchedulerBackendChip.mapDispatchToProps)
    (withStyles(SchedulerBackendChip.styles)
      (SchedulerBackendChip))

export { ConnectedSchedulerBackendChip as SchedulerBackendChip }


class BackendChip extends Component {

  static mapStateToProps = (state, props) => {
    const { scheduler, backend } = props
    return {
      scheduler: selectScheduler(scheduler)(state.cpacpy),
      backend: selectSchedulerBackend(scheduler, backend)(state.cpacpy),
    }
  }

  static mapDispatchToProps = {
  }

  static styles = theme => ({
  })

  render() {
    const { scheduler, backend, classes } = this.props

    if (!backend) {
      return null
    }

    return (
      <Chip
        icon={<ExecutionCurrentBackendIcon backend={backend.get('backend')} />}
        label={backend.get('id')}
        color="primary"
      />
    )
  }
}

const ConnectedBackendChip =
  connect(BackendChip.mapStateToProps, BackendChip.mapDispatchToProps)
    (withStyles(BackendChip.styles)
      (BackendChip))

export { ConnectedBackendChip as BackendChip }
