import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, lighten } from '@material-ui/core/styles'
import { fromJS, isImmutable } from 'immutable'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
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
} from './icons'

import ExecutionNodesGraph from './ExecutionNodesGraph'
import SummaryCard from './ExecutionSummary'

import { getExecutionSummary } from '../reducers/execution'

import { PipelineChip, DatasetChip, SchedulerChip } from './chips'
import format from '../utils/format'

const getColor = (theme, status) => ({
  backgroundColor: lighten(theme.palette[status].light, 0.7),
  color: theme.palette[status].main
})

class ExecutionDetailCard extends Component {

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
      paddingTop: ({ actions }) => theme.spacing() * (actions ? 4 : 2),
      paddingBottom: ({ actions }) => theme.spacing() * (actions ? 0 : 4),
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

  static mapStateToProps = (state, { execution }) => {
    return {
      execution: state.execution.get('executions').find((e) => e.get('id') == execution),
      summary: getExecutionSummary(execution)(state.execution)
    }
  }
  
  static mapDispatchToProps = {
  }

  handleDetail = (e) => {
    const { execution } = this.props
    this.props.history.push(`/executions/${execution.get('id')}`)
  }

  render() {
    const { classes, execution: e, actions = true, onClickSchedule, selectedSchedule, showSummaryCard = false }  = this.props
    const subjectCnt = e && e.getIn(['dataset', 'subjectNum'])
    const summary = this.props.summary

    return (
      <Paper key={e.get('id')} className={classes.paper} elevation={3}>
        <Avatar className={clsx(classes.status, classes[`status_${e.get('status')}`])}>
          <ExecutionCurrentStatusIcon status={e.get('status')} />
        </Avatar>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FlexBox className={classes.content}>
              <Grid container justify="center">
                <Grid item xs={12} sm={10} xl={8}>
                  <Typography variant="h6">
                    {e.get('note')}
                  </Typography>
                  <Typography variant="subtitle2">
                    {format(e.get('start'))} {e.get('finish') ? `– ${format(e.get('finish'))}` : ''}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.chips} justify="center">
                <Grid item xs={4} lg={3} xl={2}>
                  <SchedulerChip scheduler={e.getIn(['scheduler', 'id'])} backend={e.getIn(['scheduler', 'backend', 'backend'])} />
                </Grid>
                <Grid item xs={4} lg={3} xl={2}>
                  <PipelineChip pipeline={e.getIn(['pipeline', 'id'])} version={e.getIn(['pipeline', 'version'])} />
                </Grid>
                <Grid item xs={4} lg={3} xl={2}>
                  <DatasetChip dataset={e.getIn(['dataset', 'id'])} version={e.getIn(['dataset', 'version'])} />
                </Grid>
              </Grid>
            </FlexBox>
          </Grid>
          {
            showSummaryCard === true ?
              <Grid item xs={12}>
                <FlexBox className={classes.content}>
                  <SummaryCard
                    summary = {summary}
                    normalPage = {true}
                  />
                </FlexBox>
              </Grid> : null
          }
          <Grid item xs={12} md={6}>
            {
              e.get('schedules') ? (e.get('schedules').size < subjectCnt * 0.95 ?
                  'Ready schedule: ' + Math.floor(e.get('schedules').size * 100.0 / subjectCnt) + '%' :
                  <ExecutionNodesGraph
                    onClickSchedule={onClickSchedule}
                    selectedSchedule={selectedSchedule}
                    style={{flexGrow: 1}}
                    nodes={
                      e.get('schedules') ?
                        e.get('schedules').valueSeq().filter((s) => s.get('parent')) :
                        fromJS([])
                    }
                  />
              ) : null
            }

          </Grid>
          { actions &&
          <Grid item xs={12}>
            <FlexBox className={classes.actions}>
              <Tooltip title="Check the execution">
                <Button color="secondary" variant="contained" startIcon={<ExecutionLogsIcon />} onClick={this.handleDetail}>
                  Details
                </Button>
              </Tooltip>
            </FlexBox>
          </Grid> }
        </Grid>
      </Paper>
    )
  }
}

export default
  connect(ExecutionDetailCard.mapStateToProps, ExecutionDetailCard.mapDispatchToProps)
    (withRouter(withStyles(ExecutionDetailCard.styles)(ExecutionDetailCard)))