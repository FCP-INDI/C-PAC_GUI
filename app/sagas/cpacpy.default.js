import {fromJS} from "immutable";
import { scheduler } from 'consts'

export const cpacpyConfig = fromJS({
  schedulers: [
    // { id: 'local', name: 'Local', version: 'unknown', backends: [], address: scheduler.local, polling: false, detecting: false, online: null, connected: false, connect: { callbacks: {} }, authKey: null },
  ],
  // id for the latest used scheduler
  latestScheduler: 'local',

  testingScheduler: {address: null, success: false, detecting: false, error: null}
})

