import fs from 'fs'
import assert from 'assert'

import { data_config } from '..'
const { parse, dump, template } = data_config

describe('managing data config', async () => {
  it('should parse config', async () => {
    const contents = fs.readFileSync('./resources/data_config/data_config_test_1.yml', 'utf8')
    const parsed = parse(contents)

    console.log(parsed.sets[parsed.subject_ids[0]])
  })
})
