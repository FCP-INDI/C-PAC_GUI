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

export const CPACPY_SCHEDULER_ADDNEW = 'CPACPY_SCHEDULER_ADDNEW'
export const CPACPY_SCHEDULER_TEST_TEMP_CONNECTION = 'CPACPY_SCHEDULER_TEST_TEMP_CONNECTION'
export const CPACPY_SCHEDULER_TEST_TEMP_CONNECTION_SUCCESS = 'CPACPY_SCHEDULER_TEST_TEMP_CONNECTION_SUCCESS'
export const CPACPY_SCHEDULER_TEST_TEMP_CONNECTION_FAILED = 'CPACPY_SCHEDULER_TEST_TEMP_CONNECTION_FAILED'
export const CPACPY_SCHEDULER_DELETE = 'CPACPY_SCHEDULER_DELETE'

export const CPACPY_CONFIG_LOAD = 'CPACPY_CONFIG_LOAD'
export const CPACPY_CONFIG_LOAD_SUCCESS = 'CPACPY_CONFIG_LOAD_SUCCESS'
export const CPACPY_CONFIG_LOAD_ERROR = 'CPACPY_CONFIG_LOAD_ERROR'
export const CPACPY_CONFIG_SAVE = 'CPACPY_CONFIG_SAVE'
export const CPACPY_CONFIG_SAVE_SUCCESS = 'CPACPY_CONFIG_SAVE_SUCCESS'
export const CPACPY_CONFIG_SAVE_ERROR = 'CPACPY_CONFIG_SAVE_ERROR'
export const CPACPY_CONFIG_CLEAR = 'CPACPY_CONFIG_CLEAR'
export const CPACPY_CONFIG_CLEAR_SUCCESS = 'CPACPY_CONFIG_CLEAR_SUCCESS'
export const CPACPY_CONFIG_CLEAR_ERROR = 'CPACPY_CONFIG_CLEAR_ERROR'

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

export function detect(scheduler, authKey='', poll=true, current=false) {
  return {
    type: CPACPY_SCHEDULER_DETECT,
    scheduler, authKey, poll, current,
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
      watchers: ['Spawn', 'Start', 'End', 'Status', 'Result', 'Log']
    }
  }
}

export function call(scheduler, method='GET', endpoint, data, { success, error }, headers = {}) {
  return {
    type: CPACPY_SCHEDULER_CALL,
    scheduler,
    method,
    endpoint,
    data,
    response: {
      success,
      error,
    },
    headers,
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

export function schedulePipeline(scheduler, dataConfig, pipeline, profile, { success, error }){
  return schedule(
    scheduler,
    {
      type: 'pipeline',
      data_config: dataConfig,
      pipeline,
      profile,
    },
    { success, error }
  )
}

export function fetchResults(scheduler, schedule, result, { success, error }, { start, end } = { start: 0, end: null }) {
  return call(
    scheduler,
    'GET',
    `/schedule/${schedule}/result/${result}`,
    null,
    {
      success: (body, headers) => {
        let name = null
        if (headers.get('content-disposition')) {
          const disposition = headers.get('content-disposition')
          if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              name = matches[1].replace(/['"]/g, '');
            }
          }
        }
        return success(body, name)
      },
      error
    },
    {
      Range: `bytes=${start}-${end ? end : ''}`
    }
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

export function addNew(name, ip, port, authKey) {
  return {
    type: CPACPY_SCHEDULER_ADDNEW,
    payload: {newName: name, newIP: ip, newPort: port, newAuthKey: authKey},
  }
}

export function test(name, ip, port, authKey) {
  return {
    type: CPACPY_SCHEDULER_TEST_TEMP_CONNECTION,
    name, ip, port, authKey
  }
}

export function testFailed(error) {
  return {
    type: CPACPY_SCHEDULER_TEST_TEMP_CONNECTION_FAILED,
    error
  }
}

export function deleteScheduler(id) {
  return  {
    type: CPACPY_SCHEDULER_DELETE,
    id,
  }
}
