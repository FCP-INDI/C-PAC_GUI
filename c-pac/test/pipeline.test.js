import fs from 'fs'
import assert from 'assert'

import { template, parse, dump } from '../pipeline'

describe('load pipeline', () => {
  it('should parse the YAML file', () => {
    var contents = fs.readFileSync('./test/data/pipeline_config_template.yml', 'utf8');
    const pipeline = parse(contents)
    const config = pipeline.versions['0'].configuration

    assert(config.anatomical.skull_stripping.enabled === false)
    assert(config.anatomical.skull_stripping.methods.afni.enabled === true)
    assert(config.anatomical.skull_stripping.methods.bet.enabled === false)

    assert(config.derivatives.timeseries_extraction.enabled)
    assert(config.functional.nuisance_regression.regressors.length == 2)
    assert(config.derivatives.timeseries_extraction.masks.length == 8)
    assert(config.derivatives.timeseries_extraction.masks[0].average)
  })

  it('should dump the YAML file', () => {
    const yamlConfig = parse(template)

    console.log(yamlConfig)
  })
})
