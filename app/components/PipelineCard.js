import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import clsx from 'clsx'
import { formatMs, withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import PipelineStep from './PipelineStep';

import {
  EnvironmentIcon,
  PipelineIcon,
  PipelineStepIcon,
  PipelineExecutionTimeIcon,
  SubjectIcon,
  RunIcon,
  LaunchIcon,
  SettingsIcon,
  NavigateNextIcon,
  PlayArrowIcon,
  TimerIcon,
  LogIcon,
  BrainIcon,
  DeleteIcon,
  DuplicateIcon,
} from './icons';
import { formatLabel } from '../containers/pipeline/parts/PipelinePart'
import { isADefault } from '../containers/PipelinePage'


class PipelineCard extends Component {

  static styles = theme => ({
    card: {
      minWidth: 240
    },
    actions: {
      display: 'flex',
    },
    expand: {
      marginLeft: 'auto',
    },
    action: {
    },
    avatar: {
    },
    info: {
      padding: 0
    },

    featDisabled: { opacity: 0.5 },
    featEnabled: { opacity: 1.0 },
  })

  handleOpen = (pipeline) => {
    this.props.history.push(`/pipelines/${pipeline}`)
  }

  render() {
    const { classes, pipeline } = this.props

    const pipelineIsADefault = isADefault(pipeline.get('id'));
    let versionId = '0'
    const versions = pipeline.get('versions')
    if (!versions.has("0")) {
      versionId = versions.keySeq().max()
    }

    const version = versions.get(versionId)
    const configuration = version.getIn(['configuration', ]);
    const cardSteps = ['anatomical_preproc', 'functional_preproc', 'surface_analysis'];
    let derivatives = [];
    Object.keys(configuration.toJS()).forEach(step => {
      if (step === 'FROM') {
        configuration.importedPipeline = configuration.getIn([step]);
      } else {
        let [...stepKeys] = configuration.getIn([step]).keys();
        if (stepKeys.includes('run')) {
          const runswitch = configuration.getIn([step, 'run']);
          if (
            !cardSteps.includes(step) &&
            runswitch &&
            (
              typeof(runswitch) === 'boolean' ||
              (Array.isArray(runswitch) && runswitch.includes(true))
            )
          ) { derivatives.push(step); }
        }
      }
    })
    derivatives = Array.from(derivatives);
    derivatives = derivatives ? derivatives.length : 0;
    let cardSubheader = `C-PAC ${version.get('version')}`;
    if (configuration.hasOwnProperty('importedPipeline')) {
      cardSubheader = `FROM '${configuration.importedPipeline}' (${cardSubheader})`
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <PipelineIcon />
            </Avatar>
          }
          title={pipeline.get('name')}
          subheader={cardSubheader}
        />
        <CardContent className={classes.info}>
          <List>
            {cardSteps.map(step =>{
              const runKey = (step !== 'surface_analysis') ? 'run' : 'run_freesurfer';
              return (
                <PipelineStep
                  {...{classes}}
                  stepKey={configuration.getIn([step, runKey])}
                  label={formatLabel(step)}
                  key={step}
                />
              )
            })}
            <PipelineStep
              {...{classes}}
              stepKey={Boolean(derivatives)}
              label={`${derivatives} derivative${derivatives === 1 ? '' : 's'}`}
              key='derivatives'
            />
          </List>
        </CardContent>
        <CardActions className={classes.actions}>

          <Tooltip title="Duplicate">
            <IconButton onClick={() => this.props.onDuplicate(pipeline.get('id'))}>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>

          { !pipelineIsADefault ?
            <Tooltip title="Delete">
              <IconButton onClick={() => this.props.onDelete(pipeline.get('id'))}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            : null
          }

          <Tooltip title={pipelineIsADefault ? 'View' : 'View / Edit'}>
            <IconButton className={classes.expand} onClick={() => this.handleOpen(pipeline.get('id'))}>
              {pipelineIsADefault ? <PlayArrowIcon /> : <NavigateNextIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  }
}

export default withRouter(withStyles(PipelineCard.styles)(PipelineCard))
