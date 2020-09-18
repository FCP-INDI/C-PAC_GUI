import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, lighten } from '@material-ui/core/styles'
import { fromJS, isImmutable } from 'immutable'
import clsx from 'clsx'

import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from 'components/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { default as FlexBox } from '@material-ui/core/Box'

import {
  AddIcon,
  ExecutionCurrentStatusIcon,
  ExecutionIcon,
  ExecutionLogsIcon,
  ExecutionCrashIcon,
} from '../components/icons'

import ExecutionNewPage from './ExecutionNewPage'

import Modal from '../components/Modal'
import Content from '../components/Content'
import Box from '../components/Box'
import Table from '../components/Table'
import ExecutionNodesGraph from '../components/ExecutionNodesGraph'
import ExecutionDetailCard from '../components/ExecutionDetailCard'

import { PipelineChip, DatasetChip, SchedulerChip } from '../components/chips'

import {
  preprocessDataset,
} from '../actions/execution'

import {
  selectDatasets,
} from '../reducers/dataset'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from '../reducers/cpacpy'


const getColor = (theme, status) => ({
  backgroundColor: lighten(theme.palette[status].light, 0.7),
  color: theme.palette[status].main
})

class ExecutionsPage extends Component {

  static styles = theme => ({
    loading: {
      width: 36, height: 36,
    },
    paper: {
      marginTop: 30,
      position: 'relative',
      display: 'flex',
    },
    status: {
      position: 'absolute',
      top: -15,
      left: 10,
    },
    status_running: {
      ...getColor(theme, 'info'), 
      strokeWidth: 0,
      strokeOpacity: 0,
      stroke: getColor(theme, 'info').color,
      animation: `$shinebrightlikeadiamond 1s linear infinite`
    },
    status_success: getColor(theme, 'success'),
    status_failure: getColor(theme, 'error'),
    status_unknown: {},
    content: {
      padding: theme.spacing() * 2,
      paddingTop: theme.spacing() * 4,
    },
    chips: {
      padding: theme.spacing() * 3,
      paddingBottom: 0,
      textAlign: 'center',
    },
    actions: {
      margin: theme.spacing(),
      marginTop: 0,
      paddingTop: theme.spacing(),
      borderTop: `1px solid ${theme.palette.divider}`,
      '& > *': {
        marginRight: theme.spacing(),
      },
    },
    '@keyframes shinebrightlikeadiamond': {
      '0%': { strokeWidth: 0, strokeOpacity: 1 },
      '80%': { strokeWidth: 6, strokeOpacity: 0 },
    },
  })

  static mapStateToProps = (state, props) => {
    return {
      operation: props.match.params.operation,
      parameters: Object.fromEntries(new URLSearchParams(props.location.search)),
      executions: state.execution.getIn(['executions']),
    }
  }
  
  static mapDispatchToProps = {
  }
  
  handleExecutionNewOpen = () => {
    this.props.history.push(`/executions/new`)
  }

  handleExecutionClose = () => {
    this.props.history.push(`/executions`)
  }

  render() {
    const { classes, executions, operation, parameters } = this.props
    const tools = (
      <>
        <Tooltip title="New execution">
          <IconButton onClick={this.handleExecutionNewOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </>
    )
    return (
      <>
        <Modal
          open={operation === 'new'}
          onClose={this.handleExecutionClose}
          title="Execute a pipeline"
          inner
          style={{ maxWidth: 800 }}
        >
          <ExecutionNewPage parameters={parameters} onSchedule={this.handleExecutionClose} />
        </Modal>
        <Box avatar={<ExecutionIcon />} title="Executions" tools={tools}>
          {
            executions &&
            executions
              .sortBy((e) => e.get('id'))
              .map(e => <ExecutionDetailCard key={e.get('id')} execution={e.get('id')} />)
          }
        </Box>
      </>
    )
  }
}
export default
  connect(ExecutionsPage.mapStateToProps, ExecutionsPage.mapDispatchToProps)
    (withRouter(withStyles(ExecutionsPage.styles)(ExecutionsPage)))
