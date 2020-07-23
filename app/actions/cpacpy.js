export const CPACPY_INIT = 'CPACPY_INIT'
export const CPACPY_INIT_DONE = 'CPACPY_INIT_DONE'

export const CPACPY_SCHEDULER_CALL = 'CPACPY_SCHEDULER_CALL'

export const CPACPY_SCHEDULER_POLLING = 'CPACPY_SCHEDULER_POLLING'
export const CPACPY_SCHEDULER_POLLING_CANCEL = 'CPACPY_SCHEDULER_POLLING_CANCEL'

export const CPACPY_SCHEDULER_CONNECT = 'CPACPY_SCHEDULER_CONNECT'
export const CPACPY_SCHEDULER_CONNECT_CANCEL = 'CPACPY_SCHEDULER_CONNECT_CANCEL'
export const CPACPY_SCHEDULER_CONNECT_MESSAGE = 'CPACPY_SCHEDULER_CONNECT_MESSAGE'
export const CPACPY_SCHEDULER_CONNECT_SEND = 'CPACPY_SCHEDULER_CONNECT_SEND'
export const CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK = 'CPACPY_SCHEDULER_CONNECT_SEND_CALLBACK'

export const CPACPY_SCHEDULER_DETECT = 'CPACPY_SCHEDULER_DETECT'
export const CPACPY_SCHEDULER_DETECT_WAIT = 'CPACPY_SCHEDULER_DETECT_WAIT'
export const CPACPY_SCHEDULER_DETECT_SUCCESS = 'CPACPY_SCHEDULER_DETECT_SUCCESS'
export const CPACPY_SCHEDULER_DETECT_FAIL = 'CPACPY_SCHEDULER_DETECT_FAIL'

export const CPACPY_SCHEDULER_ONLINE = 'CPACPY_SCHEDULER_ONLINE'
export const CPACPY_SCHEDULER_OFFLINE = 'CPACPY_SCHEDULER_OFFLINE'

export function init() {
  return {
    type: CPACPY_INIT,
  }
}

export function detect(scheduler) {
  return {
    type: CPACPY_SCHEDULER_DETECT,
    scheduler,
  }
}

export function polling(scheduler) {
  return {
    type: CPACPY_SCHEDULER_POLLING,
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