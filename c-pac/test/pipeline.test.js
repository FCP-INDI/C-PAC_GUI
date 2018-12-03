import fs from 'fs'
import assert from 'assert'

import { loadPipeline } from '..'

describe('load pipeline', () => {
  it('should parse the YAML file', () => {
    var contents = fs.readFileSync('./test/data/pipeline_config_template.yml', 'utf8');
    const pipeline = loadPipeline(contents)
    const config = pipeline.versions['0'].configuration

    assert(config.anatomical.skull_stripping.enabled === false)
    assert(config.anatomical.skull_stripping.methods.afni.enabled === true)
    assert(config.anatomical.skull_stripping.methods.bet.enabled === false)

    assert(config.functional.nuisance_regression.regressors.length == 2)

  })
})
