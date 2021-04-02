import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, lighten } from '@material-ui/core/styles'
import { fromJS, isImmutable, Map } from 'immutable'
import clsx from 'clsx'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula as highlightStyle } from 'react-syntax-highlighter/dist/styles/hljs'

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
import Collapse from '@material-ui/core/Collapse'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { default as FlexBox } from '@material-ui/core/Box'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'

import format from '../utils/format'

import {
  AddIcon,
  ExecutionCurrentStatusIcon,
  ExecutionIcon,
  ExecutionLogsIcon,
  ExecutionCrashIcon,
  ExpandMoreIcon,
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

const formatSeconds = (milliseconds) => {
  let seconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60
  if (hours >= 1) {
    return `${hours}${minutes >= 1 ? ':' + minutes : ''}h`
  } else if (minutes >= 1) {
    return `${minutes}${seconds >= 1 ? ':' + seconds : ''}m`
  } else {
    return `${seconds}s`
  }
}

class ExecutionPage extends Component {

  static styles = theme => ({
    paper: {
      flexGrow: 1,
      padding: theme.spacing(),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    time: {
      flex: 0.1,
    },
    nodeInfo: {
      marginTop: 10,
      marginBottom: 10,
      wordBreak: 'break-all',
    },
    timelinePoint: {
      marginBottom: 10,
    },
  })

  static mapStateToProps = (state, props) => {
    const { execution, schedule, operation } = props.match.params
    return {
      execution: state.execution.get('executions').find((e) => e.get('id') == execution),
      operation,
      schedule,
    }
  }
  
  static mapDispatchToProps = {
  }

  state = {
    openedLog: null,
    inputsSelected: null,
  }

  handleTabChange = (event, operation) => {
    const { execution, schedule } = this.props
    this.setState({ openedLog: null })
    this.props.history.push(`/executions/${execution.get('id')}/${schedule}/${operation}`)
  };
  
  handleOpenSchedule = (s) => {
    const { execution, operation } = this.props
    this.setState({ openedLog: null })
    this.props.history.push(`/executions/${execution.get('id')}/${s.get('id')}/${operation || 'logs'}`)
  }

  handleOpenLog = (log) => (event, isExpanded) => {
    this.setState({ openedLog: this.state.openedLog === log ? null : log })
  };

  handleOpenInputsModal = (inputs) => () => {
    this.setState({ inputsSelected: inputs })
  }

  handleCloseInputsModal = () => {
    this.setState({ inputsSelected: null })
  }

  render() {
    const { classes, execution, operation } = this.props;
    let { schedule } = this.props;
    const { openedLog, inputsSelected } = this.state;

    if (!execution) {
      return null;
    }

    schedule = (schedule && execution.getIn(['schedules', schedule])) || null

    const crashes = schedule && schedule.getIn(['results', 'crashes'], Map());
    const logs = schedule && schedule.getIn(['results', 'logs'], Map());
    const scheduleFinished = schedule && ['success', 'failure'].indexOf(schedule.getIn(['status'])) > -1;

    return (
      <>
        <Modal
          disableAutoFocus
          disableEnforceFocus

          title="Inputs"
          inner
          open={!!inputsSelected}
          onClose={this.handleCloseInputsModal}
        >
          {
            inputsSelected && inputsSelected
              .entrySeq()
              .filter(([ key, value ]) => key !== 'function_str')
              .map(([ key, value ]) => (
                <Typography key={key} className={classes.nodeInfo}>
                  <>
                    <strong>{ key }</strong>: 
                    { value && value.toJS ? JSON.stringify(value.toJS()) : value }
                  </>
                </Typography>
              ))
          }
          {
            inputsSelected && inputsSelected.get('function_str') &&
            (
              <>
                <strong>function_str</strong>: 
                {
                  inputsSelected.get('function_str').indexOf('\n') > -1 ? (
                    <SyntaxHighlighter
                      wrapLines
                      language='python'
                      showLineNumbers
                      style={highlightStyle}
                      customStyle={{ overflow: 'auto', maxHeight: '30vh', flexGrow: 1 }}
                    >
                      { inputsSelected.get('function_str') }
                    </SyntaxHighlighter>
                  ) : inputsSelected.get('function_str')
                }
              </>
            )
          }
        </Modal>
        <Box avatar={<ExecutionIcon />} title="Execution">
          {
            execution && (
              <>
                <ExecutionDetailCard
                  execution={execution.get('id')}
                  actions={false}
                  onClickSchedule={this.handleOpenSchedule}
                  selectedSchedule={schedule && schedule.get('id')}
                  showSummaryCard={true}
                />
                <Paper className={classes.paper} elevation={3}>
                  {
                    !schedule && (
                      <Typography variant="subtitle1">
                        Select a participant to check its logs and crashes.
                      </Typography>
                    )
                  }
                  {
                    schedule && (
                      <>
                        <Tabs
                          value={operation}
                          onChange={this.handleTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                          centered
                        >
                          <Tab label={ schedule.get('name') } disabled />
                          <Tab label="Logs" value="logs" />
                          <Tab label="Crashes" value="crashes" />
                        </Tabs>
                        <Collapse in={operation === "logs"}>
                          {
                            logs.size === 0 ? (
                              <Typography variant="subtitle1">
                                {
                                  scheduleFinished ?
                                    `No logs.` :
                                    `Waiting for logs...`
                                }
                                </Typography>
                            ) : (
                              logs
                                .entrySeq()
                                .map(([id, log]) => (
                                  <Accordion key={id} expanded={openedLog === id} onChange={this.handleOpenLog(id)}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                    >
                                      <Typography>{ log.get('name') }</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {
                                        openedLog === id && (
                                          <pre style={{ ...highlightStyle.hljs, flexGrow: 1, maxHeight: '50vh' }}>
                                            {log.get('log') || ''}
                                          </pre>
                                        )
                                      }
                                    </AccordionDetails>
                                  </Accordion>
                                ))
                            )
                          }
                        </Collapse>
                        <Collapse in={operation === "crashes"}>
                          {
                            crashes.size === 0 ? (
                              <Typography variant="subtitle1">
                                {
                                  scheduleFinished ?
                                    `No crashes.` :
                                    `Waiting for crashes...`
                                }
                                </Typography>
                            ) : (
                              <Timeline>
                                <TimelineItem className={classes.timelinePoint}>
                                  <TimelineOppositeContent className={classes.time}>
                                    <Typography color="textSecondary">Execution start</Typography>
                                  </TimelineOppositeContent>
                                  <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                  </TimelineSeparator>
                                  <TimelineContent>
                                    <Typography>
                                      Start at { format(execution.get('start')) }
                                    </Typography>
                                  </TimelineContent>
                                </TimelineItem>
                                {
                                  crashes
                                    .entrySeq()
                                    .map(([id, crash]) => (
                                    <TimelineItem key={id} className={classes.timelinePoint}>
                                      <TimelineOppositeContent className={classes.time}>
                                        <Typography color="textSecondary">
                                          {
                                            formatSeconds(crash.get('at') - execution.get('start'))
                                          }
                                        </Typography>
                                      </TimelineOppositeContent>
                                      <TimelineSeparator>
                                        <TimelineDot />
                                        <TimelineConnector />
                                      </TimelineSeparator>
                                      <TimelineContent>
                                        <Grid container>
                                          <Grid item xs={12}>
                                            <Typography variant="h6">
                                              Node Information
                                            </Typography>
                                            <Typography className={classes.nodeInfo}>
                                              { crash.getIn(['node', 'name']) }
                                            </Typography>
                                            <Typography variant="body2" className={classes.nodeInfo}>
                                              Execution directory: { crash.getIn(['node', 'directory']) }
                                            </Typography>
                                            <Button
                                              color="secondary" variant="contained" 
                                              onClick={
                                                this.handleOpenInputsModal(
                                                  crash
                                                    .getIn(['node', 'inputs'])
                                                )
                                              }
                                            >
                                              Node Inputs
                                            </Button>
                                          </Grid>
                                          <Grid item xs={12} style={{ display: 'flex' }}>
                                            <SyntaxHighlighter
                                              wrapLines
                                              language='python'
                                              showLineNumbers
                                              style={highlightStyle}
                                              customStyle={{ overflow: 'auto', width: 1, flexGrow: 1 }}
                                            >
                                              { crash.get('traceback').trim() }
                                            </SyntaxHighlighter>
                                          </Grid>
                                        </Grid>
                                      </TimelineContent>
                                    </TimelineItem>
                                  ))
                                }
                              </Timeline>
                            )
                          }
                        </Collapse>
                      </>
                    )
                  }
                </Paper>
              </>
            )
          }
        </Box>
      </>
    )
  }
}
export default
  connect(ExecutionPage.mapStateToProps, ExecutionPage.mapDispatchToProps)
    (withRouter(withStyles(ExecutionPage.styles)(ExecutionPage)))
