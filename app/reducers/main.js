import {
  CONFIG_LOADED,
  ENVIRONMENT_CHECKED,
  ENVIRONMENT_SELECT,

  PROJECT_LOADED,
  PROJECT_OPEN,
} from '../actions/main'

import {
  PIPELINE_NAME_UPDATE,
  PIPELINE_VERSION_DIRTY_UPDATE,
  PIPELINE_VERSION_DIRTY_SAVE,
  PIPELINE_DUPLICATE,
  PIPELINE_IMPORT,
} from '../actions/pipeline'

import uuid from 'uuid/v4'
import { fromJS } from 'immutable';
import { parse } from '@internal/c-pac'


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

    case PIPELINE_NAME_UPDATE: {
      const { pipeline: id, name } = action
      const i = state.getIn(['config', 'pipelines']).findIndex((p) => p.id == id)

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
          version: '1.3.0',
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
          version: '1.3.0',
          configuration: state.getIn(['config', 'pipelines', i, 'versions', '0', 'configuration'])
        }))
        .deleteIn(['config', 'pipelines', i, 'versions', '0'])
    }

    case PIPELINE_IMPORT: {
      const { content } = action
      parse(content)
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
      let iName = 1
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


      const newPipelines = pipelines.insert(pipelines.size, newPipeline)

      return state.setIn(['config', 'pipelines'], newPipelines)
    }

    default:
      return state
  }
}
