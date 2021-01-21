import {
  CONFIG_LOADED,
  SETTINGS_UPDATE,
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
                     .findIndex((p) => p.get('id') == id)

      return state.setIn(
        ['config', 'pipelines', i, 'versions', '0'],
        fromJS({
          version: cpac.pipeline.version,
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
          'config', 'pipelines', i, 'versions', "" + state.getIn(['config', 'pipelines', i, 'versions']).size
        ], fromJS({
          version: cpac.pipeline.version,
          date: new Date().getTime(),
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
      const newPipeline = fromJS(cpac.pipeline.parse(content))
        .set('id', newPipelineId)

      let name = newPipeline.get('name').trim()
      let iName = 2
      if (pipelines.filter((p) => p.get('name') == name).size > 0) {
        while(pipelines.filter((p) => p.get('name') == name + ' (' + iName + ')').size > 0) {
          iName++
        }
        name = name + ' (' + iName + ')'
      }

      const newPipelines = pipelines.push(
        newPipeline
          .set('name', name)
      )
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
        oldVersion = `${versions.keySeq().map(i => +i).max()}`
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

      const newVersion = `${(+oldVersion) + 1}`
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
