export const THEODORE_INIT = 'THEODORE_INIT'
export const THEODORE_INIT_DONE = 'THEODORE_INIT_DONE'

export const THEODORE_SCHEDULER_POLLING = 'THEODORE_SCHEDULER_POLLING'

export const THEODORE_SCHEDULER_WATCH = 'THEODORE_SCHEDULER_WATCH'
export const THEODORE_SCHEDULER_WATCH_CANCEL = 'THEODORE_SCHEDULER_WATCH_CANCEL'
export const THEODORE_SCHEDULER_WATCH_MESSAGE = 'THEODORE_SCHEDULER_WATCH_MESSAGE'

export const THEODORE_SCHEDULER_DETECT = 'THEODORE_SCHEDULER_DETECT'
export const THEODORE_SCHEDULER_DETECT_WAIT = 'THEODORE_SCHEDULER_DETECT_WAIT'
export const THEODORE_SCHEDULER_DETECT_SUCCESS = 'THEODORE_SCHEDULER_DETECT_SUCCESS'
export const THEODORE_SCHEDULER_DETECT_FAIL = 'THEODORE_SCHEDULER_DETECT_FAIL'

export const THEODORE_SCHEDULER_ONLINE = 'THEODORE_SCHEDULER_ONLINE'
export const THEODORE_SCHEDULER_OFFLINE = 'THEODORE_SCHEDULER_OFFLINE'

export function init() {
  return {
    type: THEODORE_INIT,
  }
}

export function detect(server) {
  return {
    type: THEODORE_SCHEDULER_DETECT,
    server,
  }
}

export function polling() {
  return {
    type: THEODORE_SCHEDULER_POLLING,
  }
}

export function watch(server) {
  return {
    type: THEODORE_SCHEDULER_WATCH,
    server,
  }
}

export function watchCancel() {
  return {
    type: THEODORE_SCHEDULER_WATCH_CANCEL
  }
}

export function online(scheduler) {
  return {
    type: THEODORE_SCHEDULER_ONLINE,
    scheduler
  }
}

export function offline(scheduler) {
  return {
    type: THEODORE_SCHEDULER_OFFLINE,
    scheduler
  }
}