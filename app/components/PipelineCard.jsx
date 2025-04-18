import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import semver from 'semver';

import { withStyles } from '@material-ui/core/styles';

import { Map } from 'immutable';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {
  PipelineIcon,
  NavigateNextIcon,
  PlayArrowIcon,
  DeleteIcon,
  DeprecatedIcon,
  DownloadIcon,
  DuplicateIcon
} from './icons';
import { formatLabel } from '../containers/pipeline/parts/PipelinePart';
import { isADefault } from '../containers/PipelinePage';
import PipelineStep from './PipelineStep';

import cpac from '@internal/c-pac';

const cardSteps = ['anatomical_preproc', 'functional_preproc', 'surface_analysis'];

function stripDevSuffix(version) {
  return version.replace(/\.dev\d*$/, '');
}

/** A card component to show a pipeline configuration available to view/edit, duplicate, and/or
 * delete. */
class PipelineCard extends Component {
  static propTypes = {
    /** Inherited style */
    classes: PropTypes.object,
    /** Methods for mutating array of pipelines */
    onDelete: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    /** A pipeline configuration */
    pipeline: PropTypes.instanceOf(Immutable.Map).isRequired,
    /** Routing props */
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

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

  handleDownload = (pipelineName) => {
    const { pipeline } = this.props;
    const version = pipeline.getIn(['versions', ]).keySeq().toJS()[0]
    const configuration = pipeline.getIn(['versions', version, 'configuration']);
    const cpacVersion = pipeline.getIn(['versions', version, 'version']);

    const blob = new Blob(
      [cpac.pipeline.dump(
        configuration.toJS(), pipelineName, version, cpacVersion
      )],
      { type: 'text/yaml;charset=utf-8' }
    );

    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.download = `${pipelineName}.yml`;
    anchor.click();
  }

  handleOpen = (pipeline) => {
    this.props.history.push(`/pipelines/${pipeline}`);
  }

  render() {
    const { classes, pipeline } = this.props;

    const pipelineIsADefault = isADefault(pipeline.get('id'));
    let versionId = '0';
    const versions = pipeline.get('versions');
    if (!versions.has('0')) {
      versionId = versions.keySeq().max();
    }

    const version = versions.get(versionId);
    const configuration = version.getIn(['configuration']);

    let derivatives = [];
    Object.keys(configuration.toJS()).forEach(step => {
      if (step === 'FROM') {
        configuration.importedPipeline = configuration.getIn([step]);
      } else {
        const tabStep = configuration.getIn([step]);
        if (Map.isMap(tabStep)) {
          const [...stepKeys] = tabStep.keys();
          if (stepKeys.includes('run')) {
            const runswitch = configuration.getIn([step, 'run']);
            if (
              !cardSteps.includes(step)
              && runswitch
              && (
                typeof runswitch === 'boolean'
                || (Array.isArray(runswitch) && runswitch.includes(true))
              )
            ) { derivatives.push(step); }
          }
        } else {
          console.warn(`Tab "${step}" seems to be malformed in pipeline "${pipeline.get('name')}"`);
        }
      }
    });
    derivatives = Array.from(derivatives);
    derivatives = derivatives ? derivatives.length : 0;
    let cardSubheader = `C-PAC ${version.get('version')}`;
    if (Object.prototype.hasOwnProperty.call(configuration, 'importedPipeline')) {
      cardSubheader = `FROM '${configuration.importedPipeline}' (${cardSubheader})`;
    }
    if (semver.gte(stripDevSuffix(version.get('version')), '1.8.0')) {
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={(
              <Avatar className={classes.avatar}>
                <PipelineIcon />
              </Avatar>
            )}
            title={pipeline.get('name')}
            subheader={cardSubheader}
          />
          <CardContent className={classes.info}>
            <List>
              {cardSteps.map(step => {
                const runKey = 'run';
                return (
                  <PipelineStep
                    {...{ classes }}
                    stepKey={configuration.getIn([step, runKey], true)}
                    label={formatLabel(step)}
                    key={step}
                  />
                );
              })}
              <PipelineStep
                {...{ classes }}
                stepKey={Boolean(derivatives)}
                label={`${derivatives} derivative${derivatives === 1 ? '' : 's'}`}
                key="derivatives"
              />
            </List>
          </CardContent>
          <CardActions className={classes.actions}>

            <Tooltip title="Duplicate">
              <IconButton onClick={() => this.props.onDuplicate(pipeline.get('id'))}>
                <DuplicateIcon />
              </IconButton>
            </Tooltip>

            { !pipelineIsADefault ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => this.props.onDelete(pipeline.get('id'))}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null }

            <Tooltip title={pipelineIsADefault ? 'View' : 'View / Edit'}>
              <IconButton className={classes.expand} onClick={() => this.handleOpen(pipeline.get('id'))}>
                {pipelineIsADefault ? <PlayArrowIcon /> : <NavigateNextIcon />}
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      );
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={(
            <Avatar className={classes.avatar}>
              <PipelineIcon />
            </Avatar>
          )}
          title={pipeline.get('name')}
          subheader={cardSubheader}
        />
        <CardContent className={classes.info}>
          <List>
            <ListItem key="deprecated">
              <ListItemIcon>
                <DeprecatedIcon />
              </ListItemIcon>
              <ListItemText primary="Deprecated" secondary="Please upgrade your pipeline configuration" />
            </ListItem>
          </List>
        </CardContent>
        <CardActions className={classes.actions}>

          <Tooltip title="Download config file">
            <IconButton onClick={() => this.handleDownload(pipeline.get('id'))}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => this.props.onDelete(pipeline.get('id'))}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

        </CardActions>
      </Card>
    );
  }
}

export default withRouter(withStyles(PipelineCard.styles)(PipelineCard));
export { cardSteps };
