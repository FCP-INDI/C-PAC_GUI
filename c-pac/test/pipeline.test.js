import fs from 'fs'
import assert from 'assert'

import { pipeline } from '..'
const { template, parse, dump, normalize } = pipeline

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

  it('should convert to new format', () => {
    const oldPipeline = {
      id: 'default',
      name: 'Default',
      versions: {
        '0': {
          version: '1.3.0',
          configuration: {
            anatomical: {
              registration: {
                methods: {
                  ants: {
                    configuration: {

                    }
                  }
                }
              }
            },
            functional: {
              enabled: true,
              slice_timing_correction: {},
              nuisance_regression: {
                enabled: true,
                lateral_ventricles_mask: '${environment.paths.fsl_dir}/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz',
                compcor_components: 10,
                friston_motion_regressors: true,
                spike_denoising: {
                  no_denoising: true,
                  despiking: true,
                  scrubbing: false,
                },
                fd_calculation: 'power',
                fd_threshold: 0.2,
                pre_volumes: 2,
                post_volumes: 3,
                regressors: [
                  {
                    gray_matter: false,
                    white_matter: false,
                    cerebrospinal_fluid: true,
                    compcor: true,
                    global: true,
                    principal_component: false,
                    motion: true,
                    linear: true,
                    quadratic: true,
                  },
                  {
                    gray_matter: false,
                    white_matter: false,
                    cerebrospinal_fluid: true,
                    compcor: true,
                    global: false,
                    principal_component: false,
                    motion: true,
                    linear: true,
                    quadratic: true,
                  }
                ]
              },
              temporal_filtering: {
                enabled: true,
                filters: [
                  {
                    low: 0.1,
                    high: 0.01
                  },
                  {
                    low: 20.1,
                    high: 20.01
                  },
                ]
              },
            },
          }
        }
      }
    }

    const newPipeline = normalize(oldPipeline)

    assert(newPipeline.versions[Object.keys(newPipeline.versions)[0]].version == '1.4.1')
    assert(newPipeline.versions[Object.keys(newPipeline.versions)[0]].configuration.functional.temporal_filtering === undefined)

    oldPipeline.id = 'myPipeline'
    const myNewPipeline = normalize(oldPipeline)

    const lastVersion = Math.max.apply(null, Object.keys(myNewPipeline.versions))

    assert(lastVersion > 0)
    assert(myNewPipeline.versions[lastVersion].version == '1.4.1')
    assert(myNewPipeline.versions[lastVersion].configuration.functional.temporal_filtering === undefined)

    const myNewPipeline_nuisance_regression = myNewPipeline.versions[lastVersion].configuration.functional.nuisance_regression
    assert(myNewPipeline_nuisance_regression.regressors.length === 8)

    assert(myNewPipeline_nuisance_regression.regressors[0].GlobalSignal !== undefined)
    assert(myNewPipeline_nuisance_regression.regressors[0].Motion.include_delayed)
    assert(myNewPipeline_nuisance_regression.regressors[0].Motion.include_squared)
    assert(myNewPipeline_nuisance_regression.regressors[0].Motion.include_delayed_squared)
    assert(myNewPipeline_nuisance_regression.regressors[0].aCompCor.summary.components === 10)

    let regi = 0

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 0.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 0.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 0.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 0.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 20.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 20.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 20.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 20.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.method === 'SpikeRegression')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.type === 'FD_P')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.value === 0.2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_previous_trs_to_censor === 2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_subsequent_trs_to_censor === 3)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 0.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 0.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.method === 'SpikeRegression')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.type === 'FD_P')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.value === 0.2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_previous_trs_to_censor === 2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_subsequent_trs_to_censor === 3)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 0.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 0.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.method === 'SpikeRegression')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.type === 'FD_P')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.value === 0.2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_previous_trs_to_censor === 2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_subsequent_trs_to_censor === 3)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 20.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 20.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.method === 'SpikeRegression')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.type === 'FD_P')
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.threshold.value === 0.2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_previous_trs_to_censor === 2)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Censor.number_of_subsequent_trs_to_censor === 3)
    assert(myNewPipeline_nuisance_regression.regressors[regi].GlobalSignal.enabled === false)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.enabled === true)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.bottom_frequency === 20.01)
    assert(myNewPipeline_nuisance_regression.regressors[regi].Bandpass.top_frequency === 20.1)
    regi++

    assert(myNewPipeline_nuisance_regression.regressors.length === regi)
  })
})
