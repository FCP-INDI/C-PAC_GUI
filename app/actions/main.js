export const CONFIG_LOAD = 'CONFIG_LOAD'
export const CONFIG_LOADING = 'CONFIG_LOADING'
export const CONFIG_LOADED = 'CONFIG_LOADED'

export function configLoad() {
  return {
    type: CONFIG_LOAD
  }
}

export function configLoading() {
  return {
    type: CONFIG_LOADING
  }
}

export function configLoaded(config) {
  return {
    type: CONFIG_LOADED,
    config
  }
}

export const CONFIG_SAVE = 'CONFIG_SAVE'
export const CONFIG_SAVED = 'CONFIG_SAVED'

export function configSave() {
  return {
    type: CONFIG_SAVE
  }
}

export function configSaved() {
  return {
    type: CONFIG_SAVED
  }
}

export const CONFIG_CLEAR = 'CONFIG_CLEAR'
export const CONFIG_CLEARED = 'CONFIG_CLEARED'

export function configClear() {
  return {
    type: CONFIG_CLEAR
  }
}

export function configCleared() {
  return {
    type: CONFIG_CLEARED
  }
}

export const SETTINGS_UPDATE = 'SETTINGS_UPDATE'

export function settingsUpdate(settings) {
  return {
    type: SETTINGS_UPDATE,
    settings
  }
}
