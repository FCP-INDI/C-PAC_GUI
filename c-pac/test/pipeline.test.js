import fs from 'fs'
import assert from 'assert'
import yaml from 'yaml'

import { pipeline } from '..'
const { template, parse, dump } = pipeline

describe('load pipeline', () => {
  it('should parse the YAML file', () => {
    const contents = fs.readFileSync('./resources/pipeline/pipeline_config_template.yml', 'utf8');
    const pipeline = parse(contents)
    const config = pipeline.versions[Object.keys(pipeline.versions)[0]].configuration

    assert(config.anatomical.skull_stripping.enabled === true)
    assert(config.anatomical.skull_stripping.methods.afni.enabled === true)
    assert(config.anatomical.skull_stripping.methods.bet.enabled === false)

    assert(config.derivatives.timeseries_extraction.enabled)
    assert(config.functional.nuisance_regression.regressors.length == 2)
    assert(config.derivatives.timeseries_extraction.masks.length == 8)
    assert(config.derivatives.timeseries_extraction.masks[0].average)
  })

  it('should dump the YAML file', () => {
    const contents = fs.readFileSync('./resources/pipeline/pipeline_config_template.yml', 'utf8');
    const pipeline = parse(contents)
    const yamlConfig = dump(pipeline, Object.keys(pipeline.versions)[0])
    const pipeline2 = parse(yamlConfig)
    const config = pipeline2.versions[Object.keys(pipeline2.versions)[0]].configuration

    assert(config.anatomical.skull_stripping.enabled == true)
    assert(config.anatomical.skull_stripping.methods.afni.enabled == true)
    assert(config.anatomical.skull_stripping.methods.bet.enabled == false)

    assert(config.functional.nuisance_regression.regressors.length == 2)

    assert(config.derivatives.timeseries_extraction.enabled)
    assert(config.derivatives.timeseries_extraction.masks.length == 8)
    assert(config.derivatives.timeseries_extraction.masks[0].average)
    assert(config.derivatives.sca.masks.length == 1)
  })
})
