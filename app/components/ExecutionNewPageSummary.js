import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'


import {
  selectDatasets,
} from '../reducers/dataset'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from '../reducers/cpacpy'

import {
  ExecutionCurrentBackendIcon,
  PipelineIcon,
  PipelineStepIcon,
  DatasetIcon,
  DatasetSubjectIcon,
  DatasetSiteIcon,
  DatasetSessionIcon,
  SchedulerIcon,
  SchedulerParamIcon,
} from '../components/icons'

import cpac from '@internal/c-pac'
import {fromJS} from "immutable";

class ExecutionNewPageSummary extends Component {
  static styles = theme => ({
    summaryCard: {
      display: 'flex',
      justifyContent: 'stretch',
      '& > .MuiFormGroup-root': {
        flexGrow: 1,
        '& > .MuiFormLabel-root': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& > .MuiAvatar-root': {
            marginRight: theme.spacing(1),
          }
        }
      }
    },
    featDisabled: { opacity: 0.5 },
    featEnabled: { opacity: 1.0 },
  })

  static mapStateToProps = (state, props) => ({
    executions: state.execution.getIn(['executions']),
    schedulers: selectSchedulers()(state.cpacpy),
    scheduler: selectCurrentScheduler()(state.cpacpy),
    datasets: selectDatasets()(state.dataset),
    pipelines: state.main.getIn(['config', 'pipelines']),
  })

  static mapDispatchToProps = {}

  computeSummaries(pipelineId, datasetId, schedulerId, datasetViewId='default') {
    const { schedulers, datasets, pipelines } = this.props

    const summaries = {}
    if (pipelineId) {
      const pipeline = pipelines.find((d) => d.get('id') === pipelineId)
      const versions = pipeline.get('versions')
      const dirty = versions.has('0')
      const versionId = `${versions.keySeq().map(i => +i).max()}`
      const version = versions.get(versionId)
      const anatomical = version.getIn(['configuration', 'anatomical', 'enabled'])
      const functional = version.getIn(['configuration', 'functional', 'enabled'])
      let derivatives = version.getIn(['configuration', 'derivatives', 'enabled'])
      if (derivatives) {
        derivatives = version.getIn(['configuration', 'derivatives']).reduce(
          (total, value) => {
            // Ignore root flag 'enabled' under derivatives
            if (value.get) {
              return total + (value.get('enabled') ? 1 : 0)
            }
            return total
          },
          0
        )
        derivatives = derivatives ? derivatives : false
      } else {
        derivatives = 0
      }

      summaries.pipeline = {
        version,
        dirty,
        anatomical,
        functional,
        derivatives,
      }
    }

    if (datasetId) {
      const dataset = datasets.find((d) => d.get('id') === datasetId)
      const versions = dataset.get('versions')
      const dirty = versions.has('0') || !dataset.hasIn(['data', 'sets'])
      const versionId = `${versions.keySeq().map(i => +i).max()}`
      const version = versions.get(versionId)
      const datasetView = datasetViewId ? datasetViewId : 'default'

      let datasetSummary = {}
      if (!dirty) {
        const dataConfig = cpac.data_config.parse(cpac.data_config.dump(dataset.toJS(), version, datasetView))

        datasetSummary = {
          sessions: Math.max(dataConfig.unique_ids.length, 1),
          subjects: Math.max(dataConfig.subject_ids.length, 1),
          sites: Math.max(dataConfig.sites.length, 1),
        }
      }

      summaries.dataset = {
        version,
        dirty,
        ...datasetSummary,
      }
    }

    if (schedulerId) {
      const scheduler = schedulers.find((d) => d.get('id') === schedulerId)
      summaries.scheduler = {
        online: scheduler.get('online'),
      }
    }

    return summaries
  }

  render() {
    const { classes, executions, schedulers } = this.props
    const { pipelineId, datasetId, schedulerId, executionId, datasetViewId, schedulerDetails=null } = this.props
    const { normalPage=true } = this.props

    const scheduler = schedulerId ? schedulers.find((s) => s.get('id') === schedulerId) : null
    const currentSchedulerInfo = schedulerDetails === null? executions.find((execution) => execution.get('id') === executionId).get('scheduler') : fromJS(schedulerDetails)
    const backend = scheduler && currentSchedulerInfo && currentSchedulerInfo.get('backend') ? scheduler.get('backends').find((b) => b.get('id') === currentSchedulerInfo.get('backend')) : null
    const schedulerProfile = currentSchedulerInfo ? currentSchedulerInfo.get('profile') : null
    const summary = this.computeSummaries(pipelineId, datasetId, schedulerId, datasetViewId)
    return (
      <>
      <Grid container>
          <Grid item xs={12} sm={6} md={normalPage? 3 : 6} className={classes.summaryCard}>
            <FormGroup>
              <FormLabel>
                <Avatar><PipelineIcon /></Avatar>
                <Typography>Pipeline</Typography>
              </FormLabel>
              {
                summary.pipeline && (
                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <PipelineStepIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Anatomical`} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <PipelineStepIcon classes={{
                          root: summary.pipeline.functional ? classes.featEnabled : classes.featDisabled
                        }} />
                      </ListItemIcon>
                      <ListItemText classes={{
                        root: summary.pipeline.functional ? classes.featEnabled : classes.featDisabled
                      }}  primary={`Functional`} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <PipelineStepIcon classes={{
                          root: summary.pipeline.derivatives ? classes.featEnabled : classes.featDisabled
                        }}  />
                      </ListItemIcon>
                      <ListItemText classes={{
                        root: summary.pipeline.derivatives ? classes.featEnabled : classes.featDisabled
                      }}  primary={`${summary.pipeline.derivatives} derivative${summary.pipeline.derivatives !== 1 ? 's' : ''}`} />
                    </ListItem>
                  </List>
                )
              }
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={normalPage? 3 : 6} className={classes.summaryCard}>
            <FormGroup>
              <FormLabel>
                <Avatar><DatasetIcon /></Avatar>
                <Typography>Dataset</Typography>
              </FormLabel>
              {
                summary.dataset && (
                  <List>
                    { summary.dataset.sites > 0 &&
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <DatasetSiteIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${summary.dataset.sites} site${summary.dataset.sites !== 1 ? 's' : ''}`} />
                    </ListItem> }
                    { summary.dataset.subjects > 0 &&
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <DatasetSubjectIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${summary.dataset.subjects} subject${summary.dataset.subjects !== 1 ? 's' : ''}` } />
                    </ListItem> }
                    { summary.dataset.sessions > 0 &&
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <DatasetSessionIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${summary.dataset.sessions} session${summary.dataset.sessions !== 1 ? 's' : ''}`} />
                    </ListItem> }
                  </List>
                )
              }
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={normalPage? 3 : 6} className={classes.summaryCard}>
            <FormGroup>
              <FormLabel>
                <Avatar><SchedulerIcon /></Avatar>
                <Typography>Scheduler</Typography>
              </FormLabel>
              {
                summary.scheduler && (
                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerIcon />
                      </ListItemIcon>
                      <ListItemText primary={scheduler.get('name')} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        {backend && <ExecutionCurrentBackendIcon fontSize="small" backend={backend.get('backend')} />}
                      </ListItemIcon>
                      <ListItemText primary={backend && backend.get('id')} />
                    </ListItem>
                  </List>
                )
              }
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6} md={normalPage? 3 : 6} className={classes.summaryCard}>
            <FormGroup>
              <FormLabel>
                <Avatar><SchedulerIcon /></Avatar>
                <Typography>Scheduler Parameters</Typography>
              </FormLabel>
              {
                summary.scheduler && (
                  <List>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerParamIcon />
                      </ListItemIcon>
                      <ListItemText primary={schedulerProfile.get('corePerPipeline') + ' core / pipeline'} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerParamIcon />
                      </ListItemIcon>
                      <ListItemText primary={schedulerProfile.get('memPerPipeline') + ' GB / pipeline'} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerParamIcon />
                      </ListItemIcon>
                      <ListItemText primary={schedulerProfile.get('parallelPipeline') + ' parallel pipeline(s)'} />
                    </ListItem>
                  </List>
                )
              }
            </FormGroup>
          </Grid>
        </Grid>
      </>
    )
  }
}


export default connect(ExecutionNewPageSummary.mapStateToProps, ExecutionNewPageSummary.mapDispatchToProps)
(withRouter(withStyles(ExecutionNewPageSummary.styles)(ExecutionNewPageSummary)))
