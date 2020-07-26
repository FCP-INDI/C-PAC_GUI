import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { default  as FlexBox } from '@material-ui/core/Box'

import {
  ExecutionIcon,
  ExecutionRunning,
  ExecutionSuccess,
  ExecutionError,
  ExecutionUnknown,
  SchedulerIcon,
  PipelineIcon,
  DatasetIcon,
} from '../components/icons'

import Content from '../components/Content'
import Box from '../components/Box'
import Table from '../components/Table'
import ExecutionNodesGraph from '../components/ExecutionNodesGraph'

import { logs } from './callback.log'


const getColor = (theme, status) => ({
  backgroundColor: lighten(theme.palette[status].light, 0.7),
  color: theme.palette[status].main
})


class ExecutionPage extends Component {

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
    status_running: getColor(theme, 'info'),
    status_success: getColor(theme, 'success'),
    status_error: getColor(theme, 'error'),
    status_unknown: {},
    content: {
      padding: 20,
      paddingTop: 35,
      // flexGrow: 1,
    }
  })

  renderExecution(e) {
    const { classes } = this.props
    return (
      <Paper key={e.get('id')} className={classes.paper} elevation={3}>
        <Avatar className={clsx(classes.status, classes[`status_${e.get('status')}`])}>
          {
            {
              running: <ExecutionRunning key="running" />,
              success: <ExecutionSuccess key="success" />,
              error: <ExecutionError key="error" />,
              unknown: <ExecutionUnknown key="unknown" />,
            }[e.get('status')]
          }
        </Avatar>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FlexBox className={classes.content}>
              <Typography variant="h6">
                {e.get('note')}
              </Typography>
              <Grid container>
                <Grid item xs={6} md={3}>
                  <Chip
                    icon={<SchedulerIcon />}
                    label={`${e.getIn(['scheduler', 'id'])}:${e.getIn(['scheduler', 'backend'])}`}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  {
                    e.getIn(['pipeline', 'version']) ? (
                      <Badge badgeContent={e.getIn(['pipeline', 'version'])} color="primary">
                        <Chip
                          icon={<PipelineIcon />}
                          label={`${e.getIn(['pipeline', 'id'])}`}
                          color="primary"
                        />
                      </Badge>
                    ) : (
                      <Chip
                        icon={<PipelineIcon />}
                        label={`${e.getIn(['pipeline', 'id'])}`}
                        color="primary"
                      />
                    )
                  }
                </Grid>
                <Grid item xs={6} md={3}>
                  {
                    e.getIn(['dataset', 'version']) ? (
                      <Badge badgeContent={e.getIn(['dataset', 'version'])} color="primary">
                        <Chip
                          icon={<DatasetIcon />}
                          label={`${e.getIn(['dataset', 'id'])}`}
                          color="primary"
                        />
                      </Badge>
                    ) : (
                      <Chip
                        icon={<DatasetIcon />}
                        label={`${e.getIn(['dataset', 'id'])} | ${e.getIn(['dataset', 'view'])}`}
                        color="primary"
                      />
                    )
                  }
                </Grid>
              </Grid>
            </FlexBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ExecutionNodesGraph nodes={e.getIn(['progress', 'nodes'])} style={{flexGrow: 1}} />
          </Grid>
        </Grid>
      </Paper>
    )
  }

  render() {
    const { classes } = this.props

    // @TODO install moment.js

    const executions = fromJS([
      {
        id: '00000000-0000-0000-0000-000000000000',
        note: 'My Execution from yesterday',
        start: "2020-02-28T01:00:52.123456",
        finish: null,
        status: 'running',
        scheduler: { id: 'local', backend: 'docker' },
        pipeline: { id: 'default', version: '' },
        dataset: { id: 'abide', version: '', view: 'default' },
        progress: {
          summary: { all: 1000, run: 592, error: 10 },
          nodes: logs.map((l, i) => ({...l, start: i})).reduce((o, l) => ({...o, [l.id]: l}), {}),
        }
      },
      // {
      //   id: '00000000-0000-0000-0000-000000000001',
      //   note: 'My Execution from yesterday',
      //   start: "2020-02-28T01:00:52.123456",
      //   finish: null,
      //   status: 'success',
      //   scheduler: { id: 'local', backend: 'docker' },
      //   pipeline: { id: 'default', version: '' },
      //   dataset: { id: 'abide', version: '', view: 'default' },
      //   progress: {
      //     summary: { all: 1000, run: 592, error: 10 },
      //     nodes: logs.reduce((o, l) => ({...o, [l.id]: l}), {}),
      //   }
      // },
      // {
      //   id: '00000000-0000-0000-0000-000000000002',
      //   note: 'My Execution from yesterday',
      //   start: "2020-02-28T01:00:52.123456",
      //   finish: null,
      //   status: 'error',
      //   scheduler: { id: 'local', backend: 'docker' },
      //   pipeline: { id: 'default', version: '' },
      //   dataset: { id: 'abide', version: '', view: 'default' },
      //   progress: {
      //     summary: { all: 1000, run: 592, error: 10 },
      //     nodes: logs.reduce((o, l) => ({...o, [l.id]: l}), {}),
      //   }
      // },
      // {
      //   id: '00000000-0000-0000-0000-000000000003',
      //   note: 'My Execution from yesterday',
      //   start: "2020-02-28T01:00:52.123456",
      //   finish: null,
      //   status: 'unknown',
      //   scheduler: { id: 'local', backend: 'docker' },
      //   pipeline: { id: 'default', version: '' },
      //   dataset: { id: 'abide', version: '', view: 'default' },
      //   progress: {
      //     summary: { all: 1000, run: 592, error: 10 },
      //     nodes: logs.reduce((o, l) => ({...o, [l.id]: l}), {}),
      //   }
      // },
    ])
  
    return (
      <Box avatar={<ExecutionIcon />} title="Executions">
        {
          executions.map(e => this.renderExecution(e))
        }
      </Box>
    )
  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(ExecutionPage.styles)(ExecutionPage)
)
