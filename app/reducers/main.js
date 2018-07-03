import {
  CONFIG_LOADED,
  ENVIRONMENT_CHECKED,
  ENVIRONMENT_SELECT,

  PROJECT_LOADED,
  PROJECT_OPEN
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


    default:
      return state
  }
}
