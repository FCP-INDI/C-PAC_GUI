
import cpac from '@internal/c-pac'

import { logs } from './execution.default.logs'

    // @TODO install moment.js

export const executions = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    note: 'Derivatives for ABIDE',
    start: (new Date().getTime()) - (3600 * 2),
    finish: null,
    status: 'unknown',
    scheduler: { id: 'local', backend: 'docker' },
    pipeline: { id: 'default', version: '1' },
    dataset: { id: 'abide', version: '1', view: 'site-nyu' },
    progress: {
      summary: { all: 1000, run: 592, error: 10 },
      nodes: logs.map((l, i) => ({...l, start: i})).reduce((o, l) => ({...o, [l.id]: l}), {}),
    }
  },
  // {
  //   id: '00000000-0000-0000-0000-000000000001',
  //   note: 'Rockland Breathhold',
  //   start: (new Date().getTime()) - (3600 * 4),
  //   finish: (new Date().getTime()) - (3600 * 2),
  //   status: 'success',
  //   scheduler: { id: 'local', backend: 'singularity' },
  //   pipeline: { id: 'default', version: '' },
  //   dataset: { id: 'abide', version: '', view: 'default' },
  //   progress: {
  //     summary: { all: 1000, run: 592, error: 10 },
  //     nodes: logs.reduce((o, l) => ({...o, [l.id]: l}), {}),
  //   }
  // },
  // {
  //   id: '00000000-0000-0000-0000-000000000002',
  //   note: 'Broke run',
  //   start: (new Date().getTime()) - (3600 * 3),
  //   finish: (new Date().getTime()) - (3600 * 1),
  //   status: 'error',
  //   scheduler: { id: 'local', backend: 'docker' },
  //   pipeline: { id: 'default', version: '' },
  //   dataset: { id: 'abide', version: '', view: 'default' },
  //   progress: {
  //     summary: { all: 1000, run: 592, error: 10 },
  //     nodes: logs.reduce((o, l) => ({...o, [l.id]: l}), {}),
  //   }
  // },
]