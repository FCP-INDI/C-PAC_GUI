export const CPACPY_INIT = 'CPACPY_INIT'
export const CPACPY_INIT_DONE = 'CPACPY_INIT_DONE'

export const CPACPY_SCHEDULER_CALL = 'CPACPY_SCHEDULER_CALL'

export const CPACPY_SCHEDULER_POLLING = 'CPACPY_SCHEDULER_POLLING'
export const CPACPY_SCHEDULER_POLLING_CANCEL = 'CPACPY_SCHEDULER_POLLING_CANCEL'

export const CPACPY_SCHEDULER_SCHEDULER = 'CPACPY_SCHEDULER_SCHEDULER'

export const CPACPY_SCHEDULER_CONNECT = 'CPACPY_SCHEDULER_CONNECT'
export const CPACPY_SCHEDULER_CONNECT_CANCEL = 'CPACPY_SCHEDULER_CONNECT_CANCEL'
export const CPACPY_SCHEDULER_CONNECT_MESSAGE = 'CPACPY_SCHEDULER_CONNECT_MESSAGE'
export const CPACPY_SCHEDULER_CONNECT_SEND = 'CPACPY_SCHEDULER_CONNECT_SEND'
export const CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK = 'CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK'

export const CPACPY_SCHEDULER_INFO = 'CPACPY_SCHEDULER_INFO'
export const CPACPY_SCHEDULER_DETECT = 'CPACPY_SCHEDULER_DETECT'

export const CPACPY_SCHEDULER_ONLINE = 'CPACPY_SCHEDULER_ONLINE'
export const CPACPY_SCHEDULER_OFFLINE = 'CPACPY_SCHEDULER_OFFLINE'

export function init() {
  return {
    type: CPACPY_INIT,
  }
}
export function selectCurrentScheduler(scheduler) {
  return {
    type: CPACPY_SCHEDULER_SCHEDULER,
    scheduler,
  }
}

export function detect(scheduler, poll=true, current=false) {
  return {
    type: CPACPY_SCHEDULER_DETECT,
    scheduler, poll, current,
  }
}

export function poll(scheduler, current=false) {
  return {
    type: CPACPY_SCHEDULER_POLLING,
    scheduler, current,
  }
}

export function pollCancel(scheduler) {
  return {
    type: CPACPY_SCHEDULER_POLLING_CANCEL,
    scheduler,
  }
}

export function watch(scheduler) {
  return {
    type: CPACPY_SCHEDULER_CONNECT,
    scheduler,
  }
}

export function watchCancel(scheduler) {
  return {
    type: CPACPY_SCHEDULER_CONNECT_CANCEL,
    scheduler,
  }
}

export function connectSendCallback(scheduler, callbackId, callbackAction) {
  return {
    type: CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK,
    scheduler,
    callbackId,
    callbackAction
  }
}

export function connectSendCallbackCall(scheduler, callbackType, data) {
  return {
    type: callbackType,
    scheduler,
    data
  }
}

export function connectSendWatch(scheduler, schedule, { action, error }) {
  return {
    type: CPACPY_SCHEDULER_CONNECT_SEND,
    scheduler,
    action,
    error,
    message: {
      type: 'watch',
      schedule,
      watchers: ['Spawn', 'Start', 'End', 'Status']
    }
  }
}

export function call(scheduler, method='GET', endpoint, data, { success, error }) {
  return {
    type: CPACPY_SCHEDULER_CALL,
    scheduler,
    method,
    endpoint,
    data,
    response: {
      success,
      error,
    }
  }
}

export function callSuccess(scheduler, type, data) {
  return {
    type,
    scheduler,
    data
  }
}

export function callError(scheduler, type, exception) {
  return {
    type,
    scheduler,
    exception
  }
}

export function schedule(scheduler, data, { success, error }) {
  return call(
    scheduler,
    'POST',
    '/schedule',
    data,
    {
      success,
      error,
    }
  )
}

export function scheduleDataSettings(scheduler, dataSettings, { success, error }){
  return schedule(
    scheduler,
    {
      type: 'data_settings',
      data_settings: dataSettings,
    },
    { success, error }
  )
}

export function schedulePipeline(scheduler, dataConfig, pipeline, { success, error }){
  return schedule(
    scheduler,
    {
      type: 'pipeline',
      data_config: dataConfig,
      pipeline,
    },
    { success, error }
  )
}

export function fetchResults(scheduler, schedule, result, { success, error }) {
  return call(
    scheduler,
    'GET',
    `/schedule/${schedule}/result/${result}`,
    null,
    { success, error }
  )
}

export function info(scheduler, info) {
  return {
    type: CPACPY_SCHEDULER_INFO,
    scheduler, info
  }
}

export function online(scheduler) {
  return {
    type: CPACPY_SCHEDULER_ONLINE,
    scheduler
  }
}

export function offline(scheduler) {
  return {
    type: CPACPY_SCHEDULER_OFFLINE,
    scheduler
  }
}