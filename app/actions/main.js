export const CONFIG_LOAD = 'CONFIG_LOAD';
export const CONFIG_LOADING = 'CONFIG_LOADING';
export const CONFIG_LOADED = 'CONFIG_LOADED';

export function configLoad() {
  return {
    type: CONFIG_LOAD
  };
}

export function configLoading() {
  return {
    type: CONFIG_LOADING
  };
}

export function configLoaded(config: object) {
  return {
    type: CONFIG_LOADED,
    config
  };
}

export const PIPELINE_CONFIG_UPDATE_KEY = 'PIPELINE_CONFIG_UPDATE_KEY';
export const PIPELINE_CONFIG_UPDATE_KEY_DONE = 'PIPELINE_CONFIG_UPDATE_KEY_DONE';

export function pipelineConfigUpdate(pipeline, key, value) {
  return {
    type: PIPELINE_CONFIG_UPDATE_KEY,
    pipeline, key, value
  };
}

export const PIPELINE_NAME_UPDATE = 'PIPELINE_NAME_UPDATE';
export const PIPELINE_NAME_UPDATE_DONE = 'PIPELINE_NAME_UPDATE_DONE';

export function pipelineNameUpdate(pipeline, name) {
  return {
    type: PIPELINE_NAME_UPDATE,
    pipeline, name
  };
}

export const ENVIRONMENT_CHECK = 'ENVIRONMENT_CHECK';
export const ENVIRONMENT_SERVER_CHECK = 'ENVIRONMENT_SERVER_CHECK';
export const ENVIRONMENT_CHECKING = 'ENVIRONMENT_CHECKING';
export const ENVIRONMENT_CHECKED = 'ENVIRONMENT_CHECKED';
export const ENVIRONMENT_SELECT = 'ENVIRONMENT_SELECT';
export const ENVIRONMENT_SERVER_START = 'ENVIRONMENT_SERVER_START';

export function environmentSelect(environment) {
  return {
    type: ENVIRONMENT_SELECT,
    environment
  };
}

export function environmentCheck(environment) {
  return {
    type: ENVIRONMENT_CHECK,
    environment
  };
}

export function environmentTypedCheck(environment, type) {
  switch (type) {
    case 'docker':
      return {
        type: 'DOCKER_INIT',
        environment
      };
  }
}

export function environmentServerCheck(environment) {
  return {
    type: ENVIRONMENT_SERVER_CHECK,
    environment
  };
}

export function environmentChecking() {
  return {
    type: ENVIRONMENT_CHECKING
  };
}

export function environmentChecked(environment) {
  return {
    type: ENVIRONMENT_CHECKED,
    environment
  };
}

export function environmentServerStart(environment) {
  return {
    type: ENVIRONMENT_SERVER_START,
    environment
  };
}

export const PROJECT_OPEN = 'PROJECT_OPEN';

export function projectOpen(project) {
  return {
    type: PROJECT_OPEN,
    project
  };
}
