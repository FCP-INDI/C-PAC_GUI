import fs from 'fs'
import assert from 'assert'

import { dataset } from '..'
import { clone } from '../utils'
const { parse, dump, template } = dataset

describe('managing data settings', async () => {
  it('should dump configuration', async () => {
    const settings = clone(template)
    const version = Object.keys(settings.versions)[0]
    const config = settings.versions[version].configuration
    config.options.base = 's3://fcp-indi/data/Projects/ADHD200/RawDataBIDS/WashU'
    console.log(config)
    console.log(dump(settings, version))
  })
})
