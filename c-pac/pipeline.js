import yaml from 'js-yaml';
import yamlTemplate, { raw, loadYaml } from './resources/pipeline/yaml';

import { slugify, clone } from './utils'

import { default as defaultTemplate } from './resources/pipeline/config'
const supportedCpacVersion = defaultTemplate.versions.default.version

const template = parse(raw)
template.name = 'Default'

export { yamlTemplate, template, raw as rawTemplate, supportedCpacVersion as version }

/**
 * Takes a configuration object, pipeline name string, and version string and returns a YAML string
 * @param {object} configObj
 * @param {string} pipelineName
 * @param {string} version
 * @returns {string} YAML representation of configObj
 */
const dump = (configObj, pipelineName, version, cpacVersion) => (
  `%YAML 1.1
---
# CPAC Pipeline Configuration YAML file
# Version ${cpacVersion}
#
# http://fcp-indi.github.io for more info.
#
# Pipeline config "${pipelineName}", version GUI-${version}
# ${Date(Date.now())}
#
# Tip: This file can be edited manually with a text editor for quick modifications.

${yaml.dump(configObj)}`.replace(/\s*'':.*/gi, ''))


export function normalize(pipeline) {

  if (pipeline.id == 'default') {
    return clone(template)
  }

  const lastVersion = Math.max.apply(null, Object.keys(pipeline.versions))
  let configuration = pipeline.versions[lastVersion].configuration

  if (pipeline.versions[lastVersion].version &&
    semver.gte(pipeline.versions[lastVersion].version, '1.4.3')) {

    let nuisanceRegression = configuration.functional.nuisance_regression
    for (let regressors_i in configuration.functional.nuisance_regression.regressors) {
      let regressors = nuisanceRegression.regressors[regressors_i]
      if (regressors.Censor.thresholds) {
        if (regressors.Censor.thresholds.length) {
          regressors.Censor.threshold = regressors.Censor.thresholds[0]
        } else {
          regressors.Censor.enabled = false
          regressors.Censor.threshold = {
            type: 'FD_J',
            value: 0.0,
          }
        }
      }
    }

    return pipeline
  }

  const newVersionKey = pipeline.versions.length
  const newVersion = {
    version: supportedCpacVersion,
  }

  const newConfiguration = clone(configuration)

  let nuisanceRegression = configuration.functional.nuisance_regression

  const censorings = []
  if (nuisanceRegression.spike_denoising.no_denoising) {
    censorings.push({
      enabled: false,
      method: 'Kill',
      threshold: {
        type: 'FD_J',
        value: 0.0,
      },
      number_of_previous_trs_to_censor: 1,
      number_of_subsequent_trs_to_censor: 2,
    })
  }

  if (nuisanceRegression.spike_denoising.scrubbing) {
    censorings.push({
      enabled: true,
      method: 'Kill',
      threshold: {
        type: { 'jenkinson': 'FD_J', 'power': 'FD_P' }[nuisanceRegression.fd_calculation],
        value: nuisanceRegression.fd_threshold,
      },
      number_of_previous_trs_to_censor: nuisanceRegression.pre_volumes,
      number_of_subsequent_trs_to_censor: nuisanceRegression.post_volumes,
    })
  }

  if (nuisanceRegression.spike_denoising.despiking) {
    censorings.push({
      enabled: true,
      method: 'SpikeRegression',
      threshold: {
        type: { 'jenkinson': 'FD_J', 'power': 'FD_P' }[nuisanceRegression.fd_calculation],
        value: nuisanceRegression.fd_threshold,
      },
      number_of_previous_trs_to_censor: nuisanceRegression.pre_volumes,
      number_of_subsequent_trs_to_censor: nuisanceRegression.post_volumes,
    })
  }

  const bandpass_filters = []
  if (configuration.functional.temporal_filtering && configuration.functional.temporal_filtering.enabled) {
    for (let filters of configuration.functional.temporal_filtering.filters) {
      bandpass_filters.push({
        enabled: true,
        bottom_frequency: filters.high,
        top_frequency: filters.low,
      })
    }
  } else {
    bandpass_filters.push({
      enabled: false,
      bottom_frequency: 0.01,
      top_frequency: 0.1,
    })
  }

  delete newConfiguration.functional.temporal_filtering

  const newNuisanceRegression = {
    enabled: nuisanceRegression.enabled,
    lateral_ventricles_mask: nuisanceRegression.lateral_ventricles_mask,
    regressors: []
  }

  for (let censoring of censorings) {
    for (let bandpass_filter of bandpass_filters) {
      for (let regressors_i in nuisanceRegression.regressors) {

        let regressors = nuisanceRegression.regressors[regressors_i]
        const templateRegressors = clone(defaultTemplate.versions.default.configuration.functional.nuisance_regression.regressors[0])

        const newRegressors = {}
        newRegressors.Motion = templateRegressors.Motion
        newRegressors.Motion.enabled = regressors.motion
        if (nuisanceRegression.friston_motion_regressors) {
          newRegressors.Motion.include_delayed = true
          newRegressors.Motion.include_squared = true
          newRegressors.Motion.include_delayed_squared = true
        }

        newRegressors.GreyMatter = templateRegressors.GreyMatter
        newRegressors.GreyMatter.enabled = regressors.gray_matter

        newRegressors.WhiteMatter = templateRegressors.WhiteMatter
        newRegressors.WhiteMatter.enabled = regressors.white_matter

        newRegressors.CerebrospinalFluid = templateRegressors.CerebrospinalFluid
        newRegressors.CerebrospinalFluid.enabled = regressors.cerebrospinal_fluid

        newRegressors.aCompCor = templateRegressors.aCompCor
        newRegressors.aCompCor.summary.components = nuisanceRegression.compcor_components
        newRegressors.aCompCor.enabled = regressors.compcor

        newRegressors.tCompCor = templateRegressors.tCompCor
        newRegressors.tCompCor.enabled = false

        newRegressors.GlobalSignal = templateRegressors.GlobalSignal
        newRegressors.GlobalSignal.enabled = regressors.global
        if (regressors.principal_component) {
          newRegressors.GlobalSignal.enabled = true
          newRegressors.GlobalSignal.summary = {
            method: 'PC',
            components: 1,
          }
        }

        newRegressors.PolyOrt = templateRegressors.PolyOrt
        newRegressors.PolyOrt.enabled = false
        if (regressors.linear) {
          newRegressors.PolyOrt.enabled = true
          newRegressors.PolyOrt.degree = 1
        }
        if (regressors.quadratic) {
          newRegressors.PolyOrt.enabled = true
          newRegressors.PolyOrt.degree = 2
        }

        newRegressors.Bandpass = bandpass_filter
        newRegressors.Censor = censoring

        newNuisanceRegression.regressors.push(newRegressors)

      }
    }
  }

  newConfiguration.functional.nuisance_regression = newNuisanceRegression
  if (newConfiguration.anatomical.registration.methods.ants.configuration.lesion_mask === undefined) {
    newConfiguration.anatomical.registration.methods.ants.configuration.lesion_mask = true
  }

  if (newConfiguration.functional.slice_timing_correction.two_pass === undefined) {
    newConfiguration.functional.slice_timing_correction.two_pass = false
  }

  newVersion.configuration = newConfiguration
  pipeline.versions[newVersionKey] = newVersion

  return pipeline
}


function normalizeValues(config) {
  if (typeof config === 'object') {
    for (const key in config) {
      config[key] = normalizeValues(config[key])
    }
    return config
  } else {
    if (config === 'On') return true
    if (config === 'Off') return false
    if (config === 'None') return null
    return config
  }
}


export function parse(content) {
  const config = normalizeValues(yaml.safeLoad(content))

  const t = clone(defaultTemplate)
  const newver = `1`
  t.versions[newver] = t.versions['default']
  delete t.versions['default']
  const c = t.versions[newver].configuration

  t.name = config.pipelineName.trim()

  c.general.environment.memory = config.maximumMemoryPerParticipant
  c.general.environment.cores = config.maxCoresPerParticipant
  c.general.environment.participants = config.numParticipantsAtOnce
  c.general.environment.ants_threads = config.num_ants_threads
  c.general.environment.paths.fsl = config.FSLDIR
  c.general.environment.paths.output = config.outputDirectory
  c.general.environment.paths.working = config.workingDirectory
  c.general.environment.paths.crash = config.crashLogDirectory
  c.general.environment.paths.log = config.logDirectory

  c.general.environment.outputs.aws = config.awsOutputBucketCredentials || ''
  c.general.environment.outputs.s3 = config.s3Encryption.includes(1)
  c.general.environment.outputs.extra = config.write_func_outputs.includes(1)
  c.general.environment.outputs.debug = config.write_debugging_outputs.includes(1)
  c.general.environment.outputs.logging = config.run_logging
  c.general.environment.outputs.regenerate = config.reGenerateOutputs
  c.general.environment.outputs.quality_control = config.generateQualityControlImages.includes(1)
  c.general.environment.outputs.organized = config.runSymbolicLinks.includes(1)
  c.general.environment.outputs.remove_working = config.removeWorkingDir

  c.anatomical.skull_stripping.enabled = config.already_skullstripped.includes(0)

  if (typeof config.skullstrip_option === "string") {
    config.skullstrip_option = [config.skullstrip_option]
  }

  if (config.skullstrip_option.includes("AFNI")) {
    c.anatomical.skull_stripping.methods.afni.enabled = true
  }

  if (config.skullstrip_option.includes("BET")) {
    c.anatomical.skull_stripping.methods.bet.enabled = true
  }

  c.anatomical.registration.resolution = parseInt(config.resolution_for_anat.replace("mm", ""))
  c.anatomical.registration.brain_template = config.template_brain_only_for_anat
    .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
    .replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.anatomical.registration.skull_template = config.template_skull_for_anat
    .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
    .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  if (typeof config.regOption === "string") {
    config.regOption = [config.regOption]
  }

  if (config.regOption.includes("ANTS")) {
    c.anatomical.registration.methods.ants.enabled = true
  }
  c.anatomical.registration.methods.ants.configuration.skull_on = config.regWithSkull.includes(1)
  c.anatomical.registration.methods.ants.configuration.lesion_mask = config.use_lesion_mask.includes(1)

  if (config.regOption.includes("FSL")) {
    c.anatomical.registration.methods.fsl.enabled = true
  }

  c.anatomical.registration.methods.fsl.configuration.linear_only = config.fsl_linear_reg_only.includes(1)
  c.anatomical.registration.methods.fsl.configuration.config_file = config.fnirtConfig
  c.anatomical.registration.methods.fsl.configuration.reference_mask =
    config.ref_mask
      .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  switch (config.anatRegFSLinterpolation) {
    case 'sinc':
      c.anatomical.registration.methods.fsl.interpolation = 'sinc'
      break;
    case 'trilinear':
      c.anatomical.registration.methods.fsl.interpolation = 'linear'
      break;
    case 'spline':
      c.anatomical.registration.methods.fsl.interpolation = 'spline'
      break;
  }

  // add ants_para T1
  c.anatomical.registration.methods.ants.ANTs_para_T1_registration = {}
  if (config.ANTs_para_T1_registration && config.ANTs_para_T1_registration.length > 0) {
    const ANTs_para_T1 = config.ANTs_para_T1_registration
    for (const k of [
      ['collapse_output_transforms', 'collapse-output-transforms'],
      ['dimensionality', 'dimensionality'],
      ['initial_moving_transform', 'initial-moving-transform'],
      ['transforms', 'transforms'],
    ]) {
      let listItem = ANTs_para_T1.filter((item) => k[1] in item)  // find a config in the list of config
      if (listItem.length > 0 && k[1] != 'transforms') {  // check if it found anything
        c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]] = listItem[0][k[1]]
      }

      else if (listItem.length > 0 && k[1] == 'transforms') {
        c.anatomical.registration.methods.ants.ANTs_para_T1_registration['transforms'] = {}  // add {} to push next layer values
        c.anatomical.registration.methods.ants.ANTs_para_T1_registration['transforms']['Rigid'] = {}
        c.anatomical.registration.methods.ants.ANTs_para_T1_registration['transforms']['Affine'] = {}
        c.anatomical.registration.methods.ants.ANTs_para_T1_registration['transforms']['SyN'] = {}
        for (const t of [
          'Rigid',
          'Affine',
          'SyN',
        ]) {
          let listItem_transform = listItem[0]["transforms"].filter((item) => t in item)
          if (listItem_transform.length == 0) {
            c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['enabled'] = false
          }
          else if (listItem_transform.length > 0) {
            c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['enabled'] = true
            if (t != 'SyN') {
              for (const j of [
                ['gradientStep', 'gradientStep'],
                ['convergence', 'convergence'],
                ['smoothing_sigmas', 'smoothing-sigmas'],
                ['shrink_factors', 'shrink-factors'],
                ['use_histogram_matching', 'use-histogram-matching'],
              ])
                c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t][j[0]] = listItem_transform[0][t][j[1]]
            }
            else if (t == 'SyN') {
              for (const j of [
                ['gradientStep', 'gradientStep'],
                ['updateFieldVarianceInVoxelSpace', 'updateFieldVarianceInVoxelSpace'],
                ['totalFieldVarianceInVoxelSpace', 'totalFieldVarianceInVoxelSpace'],
                ['convergence', 'convergence'],
                ['smoothing_sigmas', 'smoothing-sigmas'],
                ['shrink_factors', 'shrink-factors'],
                ['use_histogram_matching', 'use-histogram-matching'],
                ['winsorize_image_intensities', 'winsorize-image-intensities'],
              ])
                c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t][j[0]] = listItem_transform[0][t][j[1]]
            }

            if (listItem_transform[0][t]['metric']['type'] == 'MI') {
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric'] = {}
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type'] = {}
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['MI'] = {}
              delete listItem_transform[0][t]['metric']['type']
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['MI'] = listItem_transform[0][t]['metric']
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['MI']['enabled'] = true
            }
            else if (listItem_transform[0][t]['metric']['type'] == 'CC') {
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric'] = {}
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type'] = {}
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['CC'] = {}
              delete listItem_transform[0][t]['metric']['type']
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['CC'] = listItem_transform[0][t]['metric']
              c.anatomical.registration.methods.ants.ANTs_para_T1_registration[k[0]][t]['metric']['type']['CC']['enabled'] = true
            }
          }
        }
      }
    }
  }

  c.anatomical.tissue_segmentation.enabled = config.runSegmentationPreprocessing.includes(1)

  let priors_path = ''
  if (config.priors_path) {
    priors_path = config.priors_path.replace("$FSLDIR", "${environment.paths.fsl_dir}")
  }

  c.anatomical.tissue_segmentation.configuration.priors.priors.white_matter = config.PRIORS_WHITE.replace("$priors_path", priors_path)
  c.anatomical.tissue_segmentation.configuration.priors.priors.gray_matter = config.PRIORS_GRAY.replace("$priors_path", priors_path)
  c.anatomical.tissue_segmentation.configuration.priors.priors.cerebrospinal_fluid = config.PRIORS_CSF.replace("$priors_path", priors_path)

  if (config.seg_use_threshold.includes("FSL-FAST Thresholding")) {
    c.anatomical.tissue_segmentation.configuration.fast_threshold.enabled = true
    c.anatomical.tissue_segmentation.configuration.custom_threshold.enabled = false
  } else if (config.seg_use_threshold.includes("Customized Thresholding")) {
    c.anatomical.tissue_segmentation.configuration.fast_threshold.enabled = false
    c.anatomical.tissue_segmentation.configuration.custom_threshold.enabled = true
  }

  // seg_{tissue}_threshold_value not strict to custom_threshold.enabled, avoid undefined fields in yml file
  c.anatomical.tissue_segmentation.configuration.custom_threshold.threshold.white_matter = config.seg_WM_threshold_value
  c.anatomical.tissue_segmentation.configuration.custom_threshold.threshold.gray_matter = config.seg_GM_threshold_value
  c.anatomical.tissue_segmentation.configuration.custom_threshold.threshold.cerebrospinal_fluid = config.seg_CSF_threshold_value

  c.anatomical.tissue_segmentation.configuration.erosion.enabled = config.seg_use_erosion
  c.anatomical.tissue_segmentation.configuration.erosion.proportion = config.seg_erosion_prop

  if (typeof config.template_based_segmentation === "string") {
    config.template_based_segmentation = [config.template_based_segmentation]
  }

  if (config.template_based_segmentation.includes("None")) {
    c.anatomical.tissue_segmentation.configuration.template_based_seg.enabled = false
  }

  if (config.template_based_segmentation.includes("EPI_template")) {
    c.anatomical.tissue_segmentation.configuration.template_based_seg.enabled = true
    c.anatomical.tissue_segmentation.configuration.template_based_seg.methods = 'epi_template_based'
  }

  if (config.template_based_segmentation.includes("T1_template")) {
    c.anatomical.tissue_segmentation.configuration.template_based_seg.enabled = true
    c.anatomical.tissue_segmentation.configuration.template_based_seg.methods = 't1_templated_based'
  }

  c.anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.white_matter = config.template_based_segmentation_WHITE.replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.gray_matter = config.template_based_segmentation_GRAY.replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.anatomical.tissue_segmentation.configuration.template_based_seg.tissue_path.cerebrospinal_fluid = config.template_based_segmentation_CSF.replace("$FSLDIR", "${environment.paths.fsl_dir}")

  // ANTs priors based segmentation
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.enabled = (config.ANTs_prior_based_segmentation || []).includes(1)
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.CSF_label = config.ANTs_prior_seg_CSF_label
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_GM_label = config.ANTs_prior_seg_left_GM_label
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_GM_label = config.ANTs_prior_seg_right_GM_label
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.left_WM_label = config.ANTs_prior_seg_left_WM_label
  c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.right_WM_label = config.ANTs_prior_seg_right_WM_label

  if (typeof config.ANTs_prior_seg_template_brain_list == 'object') {
    for (let mask of config.ANTs_prior_seg_template_brain_list) {
      c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_brain_list.push({
        mask,
      })
    }
  }
  if (typeof config.ANTs_prior_seg_template_segmentation_list == 'object') {
    for (let mask of config.ANTs_prior_seg_template_segmentation_list) {
      c.anatomical.tissue_segmentation.configuration.ANTs_prior_based_seg.template_segmentation_list.push({
        mask,
      })
    }
  }

  c.functional.preprocessing.n4_mean_epi.enabled = config.n4_correct_mean_EPI
  c.functional.preprocessing.motion_stats.enabled = config.runMotionStatisticsFirst.includes(1)
  c.functional.preprocessing.motion_correction.method.volreg = config.motion_correction.includes('3dvolreg')
  c.functional.preprocessing.motion_correction.method.mcflirt = config.motion_correction.includes('mcflirt')
  c.functional.preprocessing.motion_correction.reference.mean = config.motion_correction_reference.includes('mean')
  c.functional.preprocessing.motion_correction.reference.median = config.motion_correction_reference.includes('median')
  c.functional.preprocessing.motion_correction.reference.selected_volume = config.motion_correction_reference.includes('selected volume')
  c.functional.preprocessing.motion_correction.reference.reference_volume = config.motion_correction_reference_volume
  c.functional.preprocessing.despike.enabled = (config.runDespike || []).includes(1)
  c.functional.preprocessing.scaling.enabled = config.runScaling
  c.functional.preprocessing.scaling.factor = config.scaling_factor

  c.functional.slice_timing_correction.enabled = config.slice_timing_correction.includes(1)
  c.functional.slice_timing_correction.repetition_time = !config.TR || config.TR == "None" ? '' : config.TR
  c.functional.slice_timing_correction.pattern = config.slice_timing_pattern == "Use NIFTI Header" ? "pattern" : config.slice_timing_pattern

  c.functional.slice_timing_correction.first_timepoint = config.startIdx
  c.functional.slice_timing_correction.last_timepoint = !config.stopIdx || config.stopIdx == "None" ? '' : config.stopIdx

  c.functional.slice_timing_correction.two_pass = config.functional_volreg_twopass

  c.functional.distortion_correction.enabled = config.runEPI_DistCorr.includes(1)
  if (typeof config.fmap_distcorr_skullstrip === "string") {
    config.fmap_distcorr_skullstrip = [config.fmap_distcorr_skullstrip]
  }

  c.functional.distortion_correction.skull_stripping = config.fmap_distcorr_skullstrip.includes('BET') ? 'bet' : 'afni'
  c.functional.distortion_correction.threshold = config.fmap_distcorr_threshold // TODO review on CPAC; fmap_distcorr_threshold???
  c.functional.distortion_correction.delta_te = config.fmap_distcorr_deltaTE[0]
  c.functional.distortion_correction.dwell_time = config.fmap_distcorr_dwell_time[0]
  c.functional.distortion_correction.dwell_to_assymetric_ratio = config.fmap_distcorr_dwell_asym_ratio[0]
  c.functional.distortion_correction.phase_encoding_direction = config.fmap_distcorr_pedir

  c.functional.anatomical_registration.enabled = config.runRegisterFuncToAnat.includes(1)
  c.functional.anatomical_registration.bb_registration = config.runBBReg.includes(1)
  c.functional.anatomical_registration.bb_registration_scheduler =
    config.boundaryBasedRegistrationSchedule
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.functional.anatomical_registration.registration_input =
    config.func_reg_input.includes('Mean Functional') ? 'mean' : 'selected'
  c.functional.anatomical_registration.functional_volume = config.func_reg_input_volume
  c.functional.anatomical_registration.functional_masking.bet = config.functionalMasking.includes('BET')
  c.functional.anatomical_registration.functional_masking.afni = config.functionalMasking.includes('3dAutoMask')

  c.functional.template_registration.enabled = config.runRegisterFuncToMNI.includes(1)
  c.functional.template_registration.functional_resolution = config.resolution_for_func_preproc.replace("mm", "")
  c.functional.template_registration.derivative_resolution = config.resolution_for_func_derivative.replace("mm", "")
  c.functional.template_registration.brain_template =
    config.template_brain_only_for_func
      .replace("${resolution_for_func_preproc}", "${pipeline.functional.template_registration.functional_resolution}mm")
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.functional.template_registration.skull_template =
    config.template_skull_for_func
      .replace("${resolution_for_func_preproc}", "${pipeline.functional.template_registration.functional_resolution}mm")
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.functional.template_registration.identity_matrix =
    config.identityMatrix
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  c.functional.nuisance_regression.enabled = config.runNuisance.includes(1)
  c.functional.nuisance_regression.lateral_ventricles_mask =
    config.lateral_ventricles_mask
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")


  if (config.runFrequencyFiltering) {
    throw "Invalid pipeline version, please update nuisance regression."
  }

  const templateRegressors = clone(defaultTemplate.versions.default.configuration.functional.nuisance_regression.regressors[0])

  c.functional.nuisance_regression.regressors = []
  if (config.Regressors) {
    for (const regressor of config.Regressors) {

      const newRegressor = clone(templateRegressors)

      for (const k of [
        'GreyMatter',
        'WhiteMatter',
        'CerebrospinalFluid',
        'aCompCor',
        'tCompCor',
        'GlobalSignal',
        'Motion',
        'PolyOrt',
        'Bandpass',
        'Censor',
      ]) {
        if (!regressor[k]) {
          newRegressor[k].enabled = false
          continue
        }
        const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
        newRegressor[k] = deepmerge(newRegressor[k], clone(regressor[k]), { arrayMerge: overwriteMerge })
        if (typeof (newRegressor[k].summary) === "string") {
          newRegressor[k].summary = {
            method: newRegressor[k].summary
          }
        }
      }

      c.functional.nuisance_regression.regressors.push(newRegressor)
    }
  }

  c.functional.median_angle_correction.enabled = config.runMedianAngleCorrection.includes(1)
  c.functional.median_angle_correction.target_angle = config.targetAngleDeg[0]

  c.functional.aroma.enabled = (config.runICA || []).includes(1)
  c.functional.aroma.denoising_strategy =
    config.aroma_denoise_type === 'nonaggr' ? 'non-aggressive' : 'aggressive'

  c.functional.smoothing.enabled = config.run_smoothing.includes(1)
  c.functional.smoothing.kernel_fwhm = config.fwhm[0]
  c.functional.smoothing.before_zscore = config.smoothing_order[0] == 'Before'
  c.functional.smoothing.zscore_derivatives = config.runZScoring.includes(1)

  config.run_longitudinal = (config.run_longitudinal || [])

  // longitudinal
  if (config.run_longitudinal.includes("anat")) {
    c.longitudinal.run_anatomical = true
  }

  if (config.run_longitudinal.includes("func")) {
    c.longitudinal.run_functional = true
  }

  c.longitudinal.average_method = config.longitudinal_template_average_method
  c.longitudinal.dof = config.longitudinal_template_dof
  c.longitudinal.interpolation = config.longitudinal_template_interp
  c.longitudinal.cost_function = config.longitudinal_template_cost
  c.longitudinal.thread_pool = config.longitudinal_template_thread_pool
  c.longitudinal.convergence_threshold = config.longitudinal_template_convergence_threshold

  c.derivatives.timeseries_extraction.enabled = config.runROITimeseries.includes(1)

  if (config.tsa_roi_paths instanceof Array && config.tsa_roi_paths.length > 0) {
    config.tsa_roi_paths = config.tsa_roi_paths[0]
  }
  if (typeof config.tsa_roi_paths == 'object') {
    for (let mask of Object.keys(config.tsa_roi_paths)) {
      let analysis = config.tsa_roi_paths[mask]
      if (typeof analysis === "string") {
        analysis = analysis.split(",")
      }
      analysis = analysis.map(s => s.trim().toLowerCase())

      c.derivatives.timeseries_extraction.masks.push({
        mask,
        average: analysis.includes("avg"),
        voxel: analysis.includes("voxel"),
        spatial_regression: analysis.includes("spatialreg"),
        pearson_correlation: analysis.includes("pearsoncorr"),
        partial_correlation: analysis.includes("partialcorr"),
      })
    }
  }

  c.derivatives.timeseries_extraction.outputs.csv = config.roiTSOutputs[0]
  c.derivatives.timeseries_extraction.outputs.numpy = config.roiTSOutputs[1]

  c.derivatives.sca.enabled = config.runSCA.includes(1)

  if (config.sca_roi_paths instanceof Array && config.sca_roi_paths.length > 0) {
    config.sca_roi_paths = config.sca_roi_paths[0]
  }
  if (typeof config.sca_roi_paths == 'object') {
    for (let mask of Object.keys(config.sca_roi_paths)) {
      let analysis = config.sca_roi_paths[mask]
      if (typeof analysis === "string") {
        analysis = analysis.split(",")
      }
      analysis = analysis.map(s => s.trim().toLowerCase())

      c.derivatives.sca.masks.push({
        mask,
        average: analysis.includes("avg"),
        dual_regression: analysis.includes("dualreg"),
        multiple_regression: analysis.includes("multreg"),
      })
    }
  }

  c.derivatives.sca.normalize = config.mrsNorm

  c.derivatives.vmhc.enabled = config.runVMHC.includes(1)
  c.derivatives.vmhc.symmetric_brain = config.template_symmetric_brain_only
    .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
  c.derivatives.vmhc.symmetric_skull = config.template_symmetric_skull
    .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
  c.derivatives.vmhc.dilated_symmetric_brain = config.dilated_symmetric_brain_mask
    .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
  c.derivatives.vmhc.flirt_configuration_file = config.configFileTwomm

  c.derivatives.alff.enabled = config.runALFF.includes(1)
  c.derivatives.alff.cutoff.low = config.lowPassFreqALFF[0]
  c.derivatives.alff.cutoff.high = config.highPassFreqALFF[0]

  c.derivatives.reho.enabled = config.runReHo.includes(1)
  c.derivatives.reho.cluster_size = config.clusterSize

  c.derivatives.network_centrality.enabled = config.runNetworkCentrality.includes(1)
  c.derivatives.network_centrality.mask = config.templateSpecificationFile || ''

  const thresh_types = {
    "Significance threshold": 'significance',
    "Sparsity threshold": 'sparsity',
    "Correlation threshold": 'correlation',
  }

  c.derivatives.network_centrality.degree_centrality.binarized = config.degWeightOptions[0]
  c.derivatives.network_centrality.degree_centrality.weighted = config.degWeightOptions[1]
  c.derivatives.network_centrality.degree_centrality.threshold_type = thresh_types[config.degCorrelationThresholdOption[0]]
  c.derivatives.network_centrality.degree_centrality.threshold = config.degCorrelationThreshold

  c.derivatives.network_centrality.eigenvector.binarized = config.eigWeightOptions[0]
  c.derivatives.network_centrality.eigenvector.weighted = config.eigWeightOptions[1]
  c.derivatives.network_centrality.eigenvector.threshold_type = thresh_types[config.eigCorrelationThresholdOption[0]]
  c.derivatives.network_centrality.eigenvector.threshold = config.eigCorrelationThreshold

  c.derivatives.network_centrality.local_connectivity_density.binarized = config.lfcdWeightOptions[0]
  c.derivatives.network_centrality.local_connectivity_density.weighted = config.lfcdWeightOptions[1]
  c.derivatives.network_centrality.local_connectivity_density.threshold_type = thresh_types[config.lfcdCorrelationThresholdOption[0]]
  c.derivatives.network_centrality.local_connectivity_density.threshold = config.lfcdCorrelationThreshold

  return t
}

