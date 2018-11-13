import {
  CONFIG_LOADED,
  ENVIRONMENT_CHECKED,
  ENVIRONMENT_SELECT,

  PROJECT_LOADED,
  PROJECT_OPEN,

  PIPELINE_CONFIG_UPDATE_KEY,
  PIPELINE_NAME_UPDATE
} from '../actions/main'

export default function main(state, action) {
  if (!state) {
    return {}
  }

  switch (action.type) {
    case CONFIG_LOADED:
      return { ...state, config: action.config }
    case ENVIRONMENT_CHECKED:
      return {
        ...state,
        config: {
          ...state.config,
          environments: {
            ...state.config.environments,
            ...action.environment
          }
        }
      }
    case ENVIRONMENT_SELECT:
      if (state.config.environments[action.environment]) {
        return { ...state, environment: state.config.environments[action.environment] }
      } else {
        return { ...state, environment: undefined }
      }


    case PROJECT_LOADED:
      return { ...state, project: action.project }
    case PROJECT_OPEN:
      if (state.config.projects[action.project]) {
        return {
          ...state,
          project: {
            ...state.config.projects[action.project],
            dirty: false
          }
        }
      } else {
        return { ...state, project: undefined }
      }

    case PIPELINE_NAME_UPDATE: {
      const { pipeline: id, name } = action
      const pipeline = state.config.pipelines.find((p) => p.id == id)

      pipeline.name = name

      return state
    }

    case PIPELINE_CONFIG_UPDATE_KEY: {
      const { pipeline: id, key, value } = action
      const pipeline = state.config.pipelines.find((p) => p.id == id)

      // @TODO ASH review version
      const version = Object.keys(pipeline.versions)[0]
      const path = key.split(".")

      let i
      let obj = pipeline.versions[version].configuration
      for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

      obj[path[i]] = value

      return state
    }

    default:
      return state
  }
}
