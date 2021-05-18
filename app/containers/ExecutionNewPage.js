import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, lighten } from '@material-ui/core/styles'
import { fromJS, isImmutable } from 'immutable'
import uuid from 'uuid/v4'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from 'components/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Alert from '@material-ui/lab/Alert'
import { default as FlexBox } from '@material-ui/core/Box'

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabelled from 'components/FormControlLabelled'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import {
  AddIcon,
  ExecutionIcon,
  ExecutionStatusRunningIcon,
  DefaultIcon,
  ExecutionCurrentBackendIcon,
  PipelineIcon,
  PipelineStepIcon,
  DatasetIcon,
  DatasetSubjectIcon,
  DatasetSiteIcon,
  DatasetSessionIcon,
  SchedulerIcon,
  SchedulerParamIcon,
  NextIcon,
  PreviousIcon,
} from '../components/icons'

import Modal from '../components/Modal'
import Content from '../components/Content'
import Box from '../components/Box'
import SummaryCard from '../components/ExecutionSummary'

import CpacpySchedulerSelector from './cpacpy/SchedulerSelector'

import {
  preprocessDataset,
} from '../actions/execution'

import {
  generateDataConfig,
} from '../actions/dataset'

import {
  selectDatasets,
} from '../reducers/dataset'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from '../reducers/cpacpy'

import cpac from '@internal/c-pac'


class ExecutionNewPage extends Component {

  static styles = theme => ({
    icon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backend: {
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        '& .MuiListItemIcon-root': {
          fontSize: '1.25rem'
        },
        '& .MuiListItemText-root': {
          margin: 0,
          '& *': {
            lineHeight: 'normal',
          }
        }
      }
    },
    featDisabled: { opacity: 0.5 },
    featEnabled: { opacity: 1.0 },
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
    actions: {
      marginTop: 0,
      paddingTop: theme.spacing(),
      borderTop: `1px solid ${theme.palette.divider}`,
      textAlign: 'right',
      '& > *': {
        marginRight: theme.spacing(),
      },
    },
  })

  state = {
    activeStep: 0,
    dataset: { id: null, view: 'default' },
    pipeline: { id: null },
    scheduler: { id: null, backend: null, profile: {corePerPipeline: 8, memPerPipeline: 16, parallelPipeline: 1 }},
    datasetScheduler: null,
    execution: null
  }

  constructor(props) {
    super(props);
    const p = props.parameters
    if (p) {
      if (p.dataset) {
        const [dataset, view] = p.dataset.split(':')
        this.state.dataset = { id: dataset, view }
      }
      if (p.pipeline) {
        this.state.pipeline = { id: p.pipeline }
      }
      if (p.scheduler) {
        const [scheduler, backend] = p.scheduler.split(':')
        const name = this.props.schedulers.find(s => s.get('id') === scheduler).get('name')
        this.state.scheduler = { id: scheduler, backend: backend, name }
      }
    }
    this.state.datasetScheduler = this.props.schedulers.size > 0 && this.props.scheduler ? this.props.scheduler.get('id') : null
    this.state.execution = uuid()
  }

  static mapStateToProps = (state, props) => ({
    executions: state.execution.getIn(['executions']),
    schedulers: selectSchedulers()(state.cpacpy),
    scheduler: selectCurrentScheduler()(state.cpacpy),
    datasets: selectDatasets()(state.dataset),
    pipelines: state.main.getIn(['config', 'pipelines']),
  })

  static mapDispatchToProps = {
    preprocessDataset,
    generateDataConfig,
  }

  calDataset = (dataset, version, view, state) => {
    const dataConfig = cpac.data_config.parse(cpac.data_config.dump(dataset.toJS(), version, view))
    const subjectNum = Math.max(dataConfig.subject_ids.length, 1)
    const sessions = Math.max(dataConfig.unique_ids.length, 1)
    const sites = Math.max(dataConfig.sites.length, 1)
    return state.setIn(['dataset', 'subjects'], subjectNum)
      .setIn(['dataset', 'sessions'], sessions)
      .setIn(['dataset', 'sites'], sites)
  }

  handleChange =
    (statePath, value=null) =>
      (e) => {
        let state = fromJS(this.state)

        if (value === null) {
          value = e.target.value
        }
        const ifChange = state.getIn(statePath) !== value
        state = state.setIn(statePath, value)

        if (statePath[0] === 'dataset' && statePath[1] === 'id') {
          if (ifChange) {
            state = state.removeIn(['dataset', 'view'])
              .removeIn(['dataset', 'subjects'])
              .removeIn(['dataset', 'sessions'])
              .removeIn(['dataset', 'sites'])
          }
          const { datasets } = this.props
          const dataset = datasets.find((d) => d.get('id') == value)
          const view = 
            state.getIn(['dataset', 'view']) ?
              dataset
                .get('views')
                .find((v) => v.get('id') == state.getIn(['dataset', 'view'])) :
              null

          if (!view) {
            state = state.setIn(['dataset', 'view'], 'default')
          }
          const version = `${dataset.get('versions').keySeq().map(i => +i).max()}`
          const versionDetails = dataset.getIn(['versions', version])

          const dirty = dataset.get('versions').has('0') || !dataset.hasIn(['data', 'sets'])
          state = state.setIn(['dataset', 'version'], version)
            .setIn(['dataset', 'versionDetails'], versionDetails)
            .setIn(['dataset', 'dirty'], dirty)
          if (dataset.hasIn(['data', 'sets'])) {
            state = this.calDataset(dataset, version, state.getIn(['dataset', 'view']), state)
          }
        }

        if (statePath[0] === 'dataset' && statePath[1] === 'view') {
          const { datasets } = this.props
          const dataset = datasets.find((d) => d.get('id') === this.state.dataset.id)
          const version = `${dataset.get('versions').keySeq().map(i => +i).max()}`
          state = this.calDataset(dataset, version, value, state)
        }

        if (statePath[0] === 'pipeline' && statePath[1] === 'id') {
          const { pipelines } = this.props
          const pipeline = pipelines.find((d) => d.get('id') == value)
          const versionId = `${pipeline.get('versions').keySeq().map(i => +i).max()}`
          const version = pipeline.get('versions').get(versionId)
          const dirty = pipeline.get('versions').has('0')
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
          state = state.setIn(['pipeline', 'version'], versionId)
            .setIn(['pipeline', 'versionDetail'], version)
            .setIn(['pipeline', 'dirty'], dirty)
            .setIn(['pipeline', 'anatomical'], anatomical)
            .setIn(['pipeline', 'functional'], functional)
            .setIn(['pipeline', 'derivatives'], derivatives)
        }

        if (statePath[0] === 'scheduler' && statePath[1] === 'profile') {
          state = state.setIn(statePath, value)
        }

        if (statePath[0] === 'scheduler' && statePath[1] === 'id') {
          const { scheduler } = this.props
          const backend = scheduler.get('backends').size > 0 && scheduler.getIn(['backends', 0])
          const name = scheduler.get('name')
          state = state.setIn(['scheduler', 'backend'], backend)
            .setIn(['scheduler', 'name'], name)
        }

        this.setState(state.toJS())
      }

  handleDatabaseScheduler = 
    (scheduler) => {
      this.setState({ datasetScheduler: scheduler })
    }

  handleNext = 
    (e) => {
      this.setState({ activeStep: this.state.activeStep + 1 })
    }

  handlePrevious = 
    (e) => {
      this.setState({ activeStep: this.state.activeStep - 1 })
    }

  handleGenerateDataConfig = () => {
    this.props.generateDataConfig(
      this.state.datasetScheduler,
      {
        id: this.state.dataset.id,
        version: this.state.dataset.version,
      }
    )
    this.setState({ buildingDataset: this.state.dataset.id })
  }

  handlePreprocessDataset = () => {
    const { execution, pipeline, scheduler, note } = this.state
    const { datasets } = this.props
    let { dataset } = this.state
    if (!this.state.dataset.subjectNum) {
      const storeDataset = datasets.find((d) => d.get('id') === this.state.dataset.id)
      const version = `${storeDataset.get('versions').keySeq().map(i => +i).max()}`
      const dataConfig = cpac.data_config.parse(cpac.data_config.dump(storeDataset.toJS(), version, this.state.dataset.view))
      const subjectNum = Math.max(dataConfig.subject_ids.length, 1)
      dataset.subjectNum = subjectNum
    }
    this.props.preprocessDataset(execution, scheduler, dataset, pipeline, note)
    this.props.onSchedule && this.props.onSchedule()
  }

  render() {
    const { classes, schedulers, datasets, pipelines, } = this.props
    const { activeStep } = this.state
    const steps = ['pipeline', 'dataset', 'scheduler', 'summary']
    const dataset = this.state.dataset.id ? datasets.find((d) => d.get('id') == this.state.dataset.id) : null
    const scheduler = this.state.scheduler.id ? schedulers.find((s) => s.get('id') == this.state.scheduler.id) : null
    const dirty = !dataset?.hasIn(['data', 'sets'])
    if (dirty !== this.state.dataset.dirty ) {
      this.setState(fromJS(this.state).setIn(['dataset', 'dirty'], dirty).toJS())
    }
    const datasetVersion = this.state.dataset.versionDetails
    const completed = {
      pipeline: !!this.state.pipeline.id,
      dataset: !!(this.state.dataset.id && !dirty),
      scheduler: !!(this.state.scheduler.id && this.state.scheduler.backend),
    }
    const summary = {
      pipeline: {
        functional: this.state.pipeline.functional,
        derivatives: this.state.pipeline.derivatives,
      },
      dataset: {
        sites: this.state.dataset.sites,
        subjects: this.state.dataset.subjects,
        sessions: this.state.dataset.sessions,
      },
      scheduler: {
        name: this.state.scheduler.name,
        backend: this.state.scheduler.backend ? {
          id: this.state.scheduler.backend.id,
          backend: this.state.scheduler.backend.backend,
        } : null,
        profile: this.state.scheduler.profile,
      }
    }

    return (
      <>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key="pipeline" completed={completed.pipeline}>
            <StepLabel>Select your pipeline</StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Pipeline"
                    fullWidth margin="normal" variant="outlined"
                    value={this.state.pipeline.id || ''}
                    onChange={this.handleChange(['pipeline', 'id'])}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PipelineIcon />
                        </InputAdornment>
                      )
                    }}
                  >
                    { pipelines.map((d) => (
                      <MenuItem key={ d.get('id') } value={ d.get('id') }>{ d.get('name') }</MenuItem>
                    )) }
                  </TextField>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key="dataset" completed={completed.dataset}>
            <StepLabel>Select your dataset</StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={6} md={8}>
                  <TextField
                    select
                    label="Dataset"
                    fullWidth margin="normal" variant="outlined"
                    value={this.state.dataset.id || ''}
                    onChange={this.handleChange(['dataset', 'id'])}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DatasetIcon />
                        </InputAdornment>
                      )
                    }}
                  >
                    { datasets.map((d) => (
                      <MenuItem key={ d.get('id') } value={ d.get('id') }>{ d.get('name') }</MenuItem>
                    )) }
                  </TextField>
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    select
                    label="View"
                    fullWidth margin="normal" variant="outlined"
                    disabled={this.state.dataset.id === null}
                    value={this.state.dataset.view || ''}
                    onChange={this.handleChange(['dataset', 'view'])}
                  >
                    {
                      this.state.dataset.id !== null ?
                      datasets
                        .find((d) => d.get('id') == this.state.dataset.id)
                        .get('views')
                        .map((v) => (
                          <MenuItem key={ v.get('id') } value={ v.get('id') }>{ v.get('name') }</MenuItem>
                        )) :
                        <MenuItem key={'all'} value={'all'}>All</MenuItem>
                    }
                  </TextField>
                </Grid>

                {
                (dataset && dirty) ? (
                  <Grid item xs={12}>
                    {datasetVersion.configuration.format === 'upload' || datasetVersion.configuration.format === 'fetch' ?
                      <Alert
                        severity="warning"
                        style={{ margin: '0 -10px' }}>Invalid dataset: please upload or fetch the dataset first.</Alert> :
                      <Alert
                        severity="warning"
                        style={{ margin: '0 -10px' }}
                        action={
                          <>
                            <Button
                              disabled={dataset.get('loading')} variant="contained"
                              color="inherit" size="small" onClick={this.handleGenerateDataConfig}
                              style={{ paddingTop: 8, paddingBottom: 8 }}
                            >
                              Build Dataset on
                              <CpacpySchedulerSelector buttonProps={{
                                style: { marginLeft: 10 },
                                variant: 'outlined',
                              }}
                                onSelect={this.handleDatabaseScheduler}
                              />
                            </Button>
                            { dataset.get('loading') && <LinearProgress style={{ marginTop: -4, borderRadius: '0 0 4px 4px' }} /> }
                          </>
                        }>
                        This dataset needs to be build in order to run.
                      </Alert>
                    }

                  </Grid>
                ) : (
                  this.state.buildingDataset === this.state.dataset.id && (
                    <Grid item xs={12}>
                      <Alert severity="success">
                        This dataset is built and ready to run!
                      </Alert>
                    </Grid>
                  )
                ) }
              </Grid>
            </StepContent>
          </Step>
          <Step key="scheduler" completed={completed.scheduler}>
            <StepLabel>Select your scheduler</StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={12} md={12} style={{ display: 'flex' }} border={1}>
                  <FormControl margin="normal" fullWidth>
                    <CpacpySchedulerSelector
                      buttonProps={{
                        style: { flexGrow: 1 },
                        variant: 'outlined',
                      }}
                      scheduler={this.state.scheduler.id}
                      onSelect={(scheduler) => this.handleChange(['scheduler', 'id'], scheduler)()}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Number of cores per pipeline"
                    fullWidth margin="normal" variant="outlined"
                    disabled={this.state.scheduler.id === null || !scheduler.get('online')}
                    value={this.state.scheduler.profile.corePerPipeline || ''}
                    onChange={this.handleChange(['scheduler', 'profile', 'corePerPipeline'])}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Max memory per pipeline (GB)"
                    fullWidth margin="normal" variant="outlined"
                    disabled={this.state.scheduler.id === null || !scheduler.get('online')}
                    value={this.state.scheduler.profile.memPerPipeline || ''}
                    onChange={this.handleChange(['scheduler', 'profile', 'memPerPipeline'])}
                  >
                  </TextField>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Number of pipelines in parallel"
                    fullWidth margin="normal" variant="outlined"
                    disabled={this.state.scheduler.id === null || !scheduler.get('online')}
                    value={this.state.scheduler.profile.parallelPipeline || ''}
                    onChange={this.handleChange(['scheduler', 'profile', 'parallelPipeline'])}
                  >
                  </TextField>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step key="summary" completed={completed.pipeline && completed.dataset && completed.scheduler}>
            <StepLabel>Summary</StepLabel>
            <StepContent>
              <SummaryCard
                summary = {summary}
                normalPage = {false}
              />
            </StepContent>
          </Step>
        </Stepper>

        <FlexBox className={classes.actions}>
          {
            activeStep > 0 ? (
              <Button color="primary" variant="contained" startIcon={<PreviousIcon />} onClick={this.handlePrevious}>
                { steps[activeStep - 1] }
              </Button>
            ) : null
          }
          {
            activeStep < steps.length - 1 ? (
              <Button color="primary" variant="contained" endIcon={<NextIcon />} onClick={this.handleNext} disabled={!completed[steps[activeStep]]}>
                { steps[activeStep + 1] }
              </Button>
            ) : null
          }

          {activeStep === steps.length - 1 && (
            <Tooltip title="Create an execution with your configuration">
              <Button
                disabled={!(completed.pipeline && completed.dataset && completed.scheduler)}
                onClick={this.handlePreprocessDataset}
                color="secondary" variant="contained" startIcon={<ExecutionStatusRunningIcon />}>
                Run!
              </Button>
            </Tooltip>
          )}
        </FlexBox>
      </>
    )
  }
}

export default
  connect(ExecutionNewPage.mapStateToProps, ExecutionNewPage.mapDispatchToProps)
    (withRouter(withStyles(ExecutionNewPage.styles)(ExecutionNewPage)))
