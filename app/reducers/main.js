import {
  CONFIG_LOADED,

  SETTINGS_UPDATE,

  ENVIRONMENT_CHECKED,
  ENVIRONMENT_SELECT,

} from '../actions/main'

import {
  PIPELINE_NAME_UPDATE,
  PIPELINE_VERSION_DIRTY_UPDATE,
  PIPELINE_VERSION_DIRTY_SAVE,
  PIPELINE_VERSION_DIRTY_REVERT,
  PIPELINE_DUPLICATE,
  PIPELINE_IMPORT,
  PIPELINE_DELETE,
} from '../actions/pipeline'

import uuid from 'uuid/v4'
import { fromJS } from 'immutable'

import cpac from '@internal/c-pac'
import { loadYaml } from '../../c-pac/resources/pipeline/yaml'
import { versionRe } from '../../c-pac/pipeline'

/**
 * Function to persist C-PAC version tag across updates
 * @param {!number} i
 * @param {Map<string, object>} state
 * @returns {Map<string, object>} Semantic Version of C-PAC for which pipeline config is sytactically specified.
 */
const persistVersion = (i, state) => state.getIn([
  'config', 'pipelines', i, 'versions', Math.max(
    ...Array.from(state.getIn([
      'config', 'pipelines', i, 'versions'
    ]).keySeq()).map(k => parseInt(k))
  ).toString(), 'version'
]);

export default function main(state, action) {
  if (!state) {
    return fromJS({})
  }

  if (!action) {
    return state
  }

  switch (action.type) {
    case CONFIG_LOADED:
      return state.set('config', fromJS(action.config))

    case SETTINGS_UPDATE: {
      const { settings } = action

      return state.setIn(
        ['config', 'settings'],
        fromJS(settings)
      )
    }

    case PIPELINE_NAME_UPDATE: {
      const { pipeline: id, name } = action
      const i = state.getIn(['config', 'pipelines']).findIndex((p) => p.get('id') === id)

      return state.setIn([
        'config', 'pipelines', i, 'name'
      ], name.trim())
    }

    case PIPELINE_VERSION_DIRTY_UPDATE: {
      const { pipeline: id, configuration } = action
      const i = state.getIn(['config', 'pipelines'])
                     .findIndex((p) => p.get('id') == id);
      return state.setIn(
        ['config', 'pipelines', i, 'versions', '0'],
        fromJS({
          version: persistVersion(i, state),
          configuration
        })
      )
    }

    case PIPELINE_VERSION_DIRTY_SAVE: {
      const { pipeline: id } = action
      const i = state.getIn(['config', 'pipelines'])
                     .findIndex((p) => p.get('id') == id)

      if (!state.getIn(['config', 'pipelines', i, 'versions']).has("0")) {
        return state
      }

      return state
        .setIn([
          'config', 'pipelines', i, 'versions', new Date().getTime().toString()
        ], fromJS({
          version: persistVersion(i, state),
          configuration: state.getIn(['config', 'pipelines', i, 'versions', '0', 'configuration'])
        }))
        .deleteIn(['config', 'pipelines', i, 'versions', '0'])
    }

    case PIPELINE_VERSION_DIRTY_REVERT: {
      const { pipeline: id } = action

      const i = state.getIn(['config', 'pipelines'])
                     .findIndex((p) => p.get('id') == id)

      if (!state.getIn(['config', 'pipelines', i, 'versions']).has("0")) {
        return state
      }

      return state
        .deleteIn(['config', 'pipelines', i, 'versions', '0'])
    }

    case PIPELINE_IMPORT: {
      const { content } = action
      const pipelines = state.getIn(['config', 'pipelines'])
      const newPipelineId = uuid()
      const newPipeline = {
        'id': newPipelineId,
        'pipeline': fromJS(loadYaml(content))
      };
      let name = '[Unnamed]';
      try { // C-PAC v1.8+
        name = newPipeline.pipeline.getIn(['pipeline_setup', 'pipeline_name'])
      } catch { // C-PAC v1.7
        name = newPipeline.pipeline.get('name') ? newPipeline.get('name').trim() : name;
      }
      let iName = 2
      if (pipelines.filter((p) => p.get('name') == name).size > 0) {
        while(pipelines.filter((p) => p.get('name') == name + ' (' + iName + ')').size > 0) {
          iName++
        }
        name = name + ' (' + iName + ')'
      }
      newPipeline.name = name;
      newPipeline.versions = {'0': {
        configuration: newPipeline.pipeline,
        version: versionRe.exec(content)[0]
      }}
      delete newPipeline.pipeline;
      const newPipelines = pipelines.push(
        fromJS(newPipeline)
      );
      return state.setIn(['config', 'pipelines'], newPipelines)
    }

    case PIPELINE_DUPLICATE: {
      const { pipeline: id } = action

      const pipelines = state.getIn(['config', 'pipelines'])
      const pipeline = pipelines.find((p) => p.get('id') == id)
      const versions = pipeline.get('versions')

      let oldVersion = null
      if (versions.has("0")) {
        oldVersion = "0"
      } else {
        oldVersion = versions.keySeq().max()
      }

      let name = pipeline.get('name').trim()
      let matched = /.+\(([0-9]+)\)$/.exec(name)

      let iName = 2

      if (matched) {
        iName = parseInt(matched[1])
        name = name.replace(/\(([0-9]+)\)$/, '').trim()
      }

      while(pipelines.filter((p) => p.get('name') == name + ' (' + iName + ')' ).size > 0) {
        iName++
      }
      name = name + ' (' + iName + ')'

      const newVersion = new Date().getTime().toString()
      const newPipelineId = uuid()
      const newPipeline = pipeline
        .set('versions', fromJS({ [newVersion]: pipeline.getIn(['versions', oldVersion]) }))
        .set('name', name)
        .set('id', newPipelineId)

      const newPipelines = pipelines.push(newPipeline)

      return state.setIn(['config', 'pipelines'], newPipelines)
    }

    case PIPELINE_DELETE: {
      const { pipeline: id } = action

      const i = state.getIn(['config', 'pipelines'])
                     .findIndex((p) => p.get('id') == id)

      return state.deleteIn(['config', 'pipelines', i])
    }

    default:
      return state
  }
}
