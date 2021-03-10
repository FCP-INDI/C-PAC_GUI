import {fromJS} from "immutable";
import { scheduler } from 'consts'

export const cpacpyConfig = fromJS({
  schedulers: [
    { id: 'local', name: 'Local', version: 'unknown', backends: [], address: scheduler.local, polling: false, detecting: false, online: null, connected: false, connect: { callbacks: {} } },
  ],
  // id for scheduler
  scheduler: 'local',
})

