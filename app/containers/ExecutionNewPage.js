import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { withStyles, lighten } from '@material-ui/core/styles'
import { fromJS, isImmutable } from 'immutable'

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
    scheduler: { id: null, backend: null, profile: {corePerPipeline: 1, memPerPipeline: 1, parallelPipeline: 1 }},
    datasetScheduler: null,
  }

  constructor(props) {
    super(props);
    const p = props.parameters
    if (props.scheduler && props.scheduler.get('online')) {
      this.state.scheduler.id = props.scheduler.get('id')
    }
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
        this.state.scheduler = { id: scheduler, backend: backend }
      }
    }
    this.state.datasetScheduler = this.props.scheduler.get('id')
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

  handleChange =
    (statePath, value=null) =>
      (e) => {
        let state = fromJS(this.state)

        if (value === null) {
          value = e.target.value
        }
        state = state.setIn(statePath, value)

        if (statePath[0] === 'dataset' && statePath[1] === 'id') {
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
          state = state.setIn(['dataset', 'version'], version)
        }

        if (statePath[0] === 'pipeline' && statePath[1] === 'id') {
          const { pipelines } = this.props
          const pipeline = pipelines.find((d) => d.get('id') == value)
          const version = `${pipeline.get('versions').keySeq().map(i => +i).max()}`
          state = state.setIn(['pipeline', 'version'], version)
        }

        if (statePath[0] === 'scheduler' && statePath[1] === 'profile') {
          state = state.setIn(statePath, value)
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
    const { dataset, pipeline, scheduler, note } = this.state
    this.props.preprocessDataset(scheduler, dataset, pipeline, note)
    this.props.onSchedule && this.props.onSchedule()
  }

  computeSummaries = () => {
    const { schedulers, datasets, pipelines } = this.props

    const summaries = {}
    if (this.state.pipeline.id) {
      const pipeline = pipelines.find((d) => d.get('id') == this.state.pipeline.id)
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

    if (this.state.dataset.id) {
      const dataset = datasets.find((d) => d.get('id') == this.state.dataset.id)
      const versions = dataset.get('versions')
      const dirty = versions.has('0') || !dataset.hasIn(['data', 'sets'])
      const versionId = `${versions.keySeq().map(i => +i).max()}`
      const version = versions.get(versionId)

      let datasetSummary = {}
      if (!dirty) {
        const dataConfig = cpac.data_config.parse(cpac.data_config.dump(dataset.toJS(), version, this.state.dataset.view))

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

    if (this.state.scheduler.id) {
      const scheduler = schedulers.find((d) => d.get('id') == this.state.scheduler.id)
      summaries.scheduler = {
        online: scheduler.get('online'),
      }
    }

    return summaries
  }

  render() {
    const { classes, executions, schedulers, datasets, pipelines, parameters } = this.props
    const { activeStep } = this.state
    const steps = ['pipeline', 'dataset', 'scheduler', 'summary']
    const summary = this.computeSummaries()
    const completed = {
      pipeline: !!this.state.pipeline.id,
      dataset: !!(this.state.dataset.id && !summary.dataset?.dirty),
      scheduler: !!(this.state.scheduler.id && this.state.scheduler.backend),
    }

    const pipeline = this.state.pipeline.id ? pipelines.find((s) => s.get('id') == this.state.pipeline.id) : null
    const dataset = this.state.dataset.id ? datasets.find((d) => d.get('id') == this.state.dataset.id) : null
    const view = dataset && this.state.dataset.view ? dataset.get('views').find((v) => v.get('id') == this.state.dataset.view) : null
    const scheduler = this.state.scheduler.id ? schedulers.find((s) => s.get('id') == this.state.scheduler.id) : null
    const backend = scheduler && this.state.scheduler.backend ? scheduler.get('backends').find((b) => b.get('id') == this.state.scheduler.backend) : null
    const schedulerProfile = this.state.scheduler.profile

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
                (dataset && summary.dataset?.dirty) ? (
                  <Grid item xs={12}>
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
                <Grid item xs={6} md={8} style={{ display: 'flex' }}>
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
                <Grid item xs={6} md={4}>
                  <TextField
                    select
                    label="Backend"
                    fullWidth margin="normal" variant="outlined"
                    disabled={this.state.scheduler.id === null || !scheduler.get('online')}
                    value={this.state.scheduler.backend || ''}
                    onChange={this.handleChange(['scheduler', 'backend'])}
                    className={classes.backend}
                  >
                    {
                      this.state.scheduler.id !== null ?
                      schedulers
                        .find((s) => s.get('id') == this.state.scheduler.id)
                        .get('backends')
                        .map((b) => (
                          <MenuItem key={ b.get('id') } value={ b.get('id') }>
                            <ListItemIcon>
                              <ExecutionCurrentBackendIcon fontSize="inherit" backend={ b.get('backend') } />
                            </ListItemIcon>
                            <ListItemText primary={ b.get('id') } />
                          </MenuItem>
                        )) :
                        null
                    }
                  </TextField>
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
                    label="Amount of memories per pipeline (MB)"
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
              <Grid container>
                <Grid item xs={12} sm={6} className={classes.summaryCard}>
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
                            }}  primary={`${summary.pipeline.derivatives} derivative${summary.pipeline.derivatives != 1 ? 's' : ''}`} />
                          </ListItem>
                        </List>
                      )
                    }
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.summaryCard}>
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
                            <ListItemText primary={`${summary.dataset.sites} site${summary.dataset.sites != 1 ? 's' : ''}`} />
                          </ListItem> }
                          { summary.dataset.subjects > 0 &&
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <DatasetSubjectIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${summary.dataset.subjects} subject${summary.dataset.subjects != 1 ? 's' : ''}` } />
                          </ListItem> }
                          { summary.dataset.sessions > 0 &&
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <DatasetSessionIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${summary.dataset.sessions} session${summary.dataset.sessions != 1 ? 's' : ''}`} />
                          </ListItem> }
                        </List>
                      )
                    }
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.summaryCard}>
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
                <Grid item xs={12} sm={6} className={classes.summaryCard}>
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
                            <ListItemText primary={schedulerProfile.corePerPipeline + ' core / pipeline'} />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <SchedulerParamIcon />
                            </ListItemIcon>
                            <ListItemText primary={schedulerProfile.memPerPipeline + ' GB / pipeline'} />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemIcon>
                              <SchedulerParamIcon />
                            </ListItemIcon>
                            <ListItemText primary={schedulerProfile.parallelPipeline + ' parallel pipeline(s)'} />
                          </ListItem>
                        </List>
                      )
                    }
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Note / Description"
                    fullWidth margin="normal" variant="outlined"
                    value={this.state.note || ''}
                    onChange={this.handleChange(['note'])} />
                </Grid>
              </Grid>
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
