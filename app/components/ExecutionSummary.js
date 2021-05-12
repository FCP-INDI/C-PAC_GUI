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

class ExecutionSummary extends Component {
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

  render() {
    const { classes, summary } = this.props
    const { normalPage=true } = this.props

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
                      <ListItemText primary={summary.scheduler.name} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        {summary.scheduler.backend && <ExecutionCurrentBackendIcon fontSize="small" backend={summary.scheduler.backend.backend} />}
                      </ListItemIcon>
                      <ListItemText primary={summary.scheduler.backend && summary.scheduler.backend.id} />
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
                      <ListItemText primary={summary.scheduler.schedulerProfile.corePerPipeline + ' core / pipeline'} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerParamIcon />
                      </ListItemIcon>
                      <ListItemText primary={summary.scheduler.schedulerProfile.memPerPipeline + ' GB / pipeline'} />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon>
                        <SchedulerParamIcon />
                      </ListItemIcon>
                      <ListItemText primary={summary.scheduler.schedulerProfile.parallelPipeline + ' parallel pipeline(s)'} />
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


export default connect(ExecutionSummary.mapStateToProps, ExecutionSummary.mapDispatchToProps)
(withRouter(withStyles(ExecutionSummary.styles)(ExecutionSummary)))
