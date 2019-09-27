import yaml from 'js-yaml'
import semver from 'semver'
import deepmerge from 'deepmerge'

import { default as defaultTemplate } from './resources/pipeline/config'
import yamlTemplate, { raw } from './resources/pipeline/yaml'

const template = parse(raw)
template.name = 'Default'

export { yamlTemplate, template, raw as rawTemplate }

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

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

  const newVersionKey = new Date().getTime().toString()
  const newVersion = {
    version: '1.4.3',
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
        type: {'jenkinson': 'FD_J', 'power': 'FD_P'}[nuisanceRegression.fd_calculation],
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
        type: {'jenkinson': 'FD_J', 'power': 'FD_P'}[nuisanceRegression.fd_calculation],
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
  const newver = `${new Date().getTime()}`
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

  if (c.anatomical.registration.resolution.includes("x")) {
    temp = config.resolution_for_anat.split("x")
    c.anatomical.registration.resolution = []

    for (i = 0; i < 3; i++) {
      c.anatomical.registration.resolution.push(parseFloat(temp[i]))
    }
  } else {
    c.anatomical.registration.resolution = []

    for (i = 0; i < 3; i++) {
      c.anatomical.registration.resolution.push(parseFloat(config.resolution_for_anat))
    }
  }
  
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

  switch (config.anatRegANTSinterpolation) {
    case 'LanczosWindowedSinc':
      c.anatomical.registration.methods.ants.interpolation = 'sinc'
      break;
    case 'Linear':
      c.anatomical.registration.methods.ants.interpolation = 'linear'
      break;
    case 'BSpline':
      c.anatomical.registration.methods.ants.interpolation = 'spline'
      break;
  }
  
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
  
  c.anatomical.tissue_segmentation.enabled = config.runSegmentationPreprocessing.includes(1)

  let priors_path = ''
  if (config.priors_path) {
    priors_path = config.priors_path.replace("$FSLDIR", "${environment.paths.fsl_dir}")
  }

  c.anatomical.tissue_segmentation.priors.white_matter = config.PRIORS_WHITE.replace("$priors_path", priors_path)
  c.anatomical.tissue_segmentation.priors.gray_matter = config.PRIORS_GRAY.replace("$priors_path", priors_path)
  c.anatomical.tissue_segmentation.priors.cerebrospinal_fluid = config.PRIORS_CSF.replace("$priors_path", priors_path)

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
  c.functional.anatomical_registration.functional_masking.fsl = config.functionalMasking.includes('FSL')
  c.functional.anatomical_registration.functional_masking.afni = config.functionalMasking.includes('AFNI')
  c.functional.anatomical_registration.functional_masking.fsl_afni = config.functionalMasking.includes('FSL_AFNI')

  c.functional.template_registration.enabled = config.runRegisterFuncToMNI.includes(1)
  c.functional.template_registration.functional_resolution = config.resolution_for_func_preproc.replace("mm", "")
  c.functional.template_registration.derivative_resolution = config.resolution_for_func_derivative.replace("mm", "")

  if (config.regOption.includes("ANTS")) {
    switch (config.funcRegANTSinterpolation) {
      case 'LanczosWindowedSinc':
        c.functional.template_registration.methods.ants.interpolation = 'sinc'
        break;
      case 'Linear':
        c.functional.template_registration.methods.ants.interpolation = 'linear'
        break;
      case 'BSpline':
        c.functional.template_registration.methods.ants.interpolation = 'spline'
        break;
    }
  } else {
    switch (config.funcRegFSLinterpolation) {
      case 'sinc':
        c.functional.template_registration.methods.fsl.interpolation = 'sinc'
        break;
      case 'trilinear':
        c.functional.template_registration.methods.fsl.interpolation = 'linear'
        break;
      case 'spline':
        c.functional.template_registration.methods.fsl.interpolation = 'spline'
        break;
    }
  }

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
        if (typeof(newRegressor[k].summary) === "string") {
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


export function dump(pipeline, version='0') {

  function replacements(yaml, pipeline, environment) {
    return eval('`' + yaml.replace(/`/g,'\\`') +'`')
  }

  const c = pipeline.versions[version].configuration

  const config = {}

  config.runOnGrid = false
  config.FSLDIR = "FSLDIR"
  config.resourceManager = "SGE"
  config.parallelEnvironment = "cpac"
  config.queue = "all.q"
  config.maximumMemoryPerParticipant = c.general.environment.memory
  config.maxCoresPerParticipant = c.general.environment.cores
  config.numParticipantsAtOnce = c.general.environment.participants
  config.num_ants_threads = c.general.environment.ants_threads
  config.pipelineName = slugify(pipeline.name)
  config.workingDirectory = c.general.environment.paths.output
  config.crashLogDirectory = c.general.environment.paths.working
  config.logDirectory = c.general.environment.paths.crash
  config.outputDirectory = c.general.environment.paths.log
  config.awsOutputBucketCredentials = ""
  config.s3Encryption = [1]
  config.write_func_outputs = [c.general.environment.outputs.extra ? 1 : 0]
  config.write_debugging_outputs = [c.general.environment.outputs.debug ? 1 : 0]
  config.generateQualityControlImages = [c.general.environment.outputs.quality_control ? 1 : 0]
  config.removeWorkingDir = c.general.environment.outputs.remove_working
  config.run_logging = c.general.environment.outputs.logging
  config.reGenerateOutputs = c.general.environment.outputs.regenerate
  config.runSymbolicLinks = [c.general.environment.outputs.organized ? 1 : 0]

  config.already_skullstripped = [c.anatomical.skull_stripping.enabled ? 0 : 1]
  config.skullstrip_option = []
    .concat(c.anatomical.skull_stripping.methods.afni.enabled ? ["AFNI"] : [])
    .concat(c.anatomical.skull_stripping.methods.bet.enabled ? ["BET"] : [])

  config.skullstrip_shrink_factor = c.anatomical.skull_stripping.methods.afni.configuration.shrink_factor.threshold
  config.skullstrip_var_shrink_fac = c.anatomical.skull_stripping.methods.afni.configuration.shrink_factor.vary
  config.skullstrip_shrink_factor_bot_lim = c.anatomical.skull_stripping.methods.afni.configuration.shrink_factor.bottom_limit
  config.skullstrip_avoid_vent = c.anatomical.skull_stripping.methods.afni.configuration.avoid_ventricles
  config.skullstrip_n_iterations = c.anatomical.skull_stripping.methods.afni.configuration.iterations
  config.skullstrip_pushout = c.anatomical.skull_stripping.methods.afni.configuration.pushout
  config.skullstrip_touchup = c.anatomical.skull_stripping.methods.afni.configuration.touchup
  config.skullstrip_fill_hole = c.anatomical.skull_stripping.methods.afni.configuration.fill_hole
  config.skullstrip_NN_smooth = c.anatomical.skull_stripping.methods.afni.configuration.nearest_neighbors_smooth
  config.skullstrip_smooth_final = c.anatomical.skull_stripping.methods.afni.configuration.final_smooth
  config.skullstrip_avoid_eyes = c.anatomical.skull_stripping.methods.afni.configuration.avoid_eyes
  config.skullstrip_use_edge = c.anatomical.skull_stripping.methods.afni.configuration.use_edge
  config.skullstrip_exp_frac = c.anatomical.skull_stripping.methods.afni.configuration.use_skull
  config.skullstrip_push_to_edge = c.anatomical.skull_stripping.methods.afni.configuration.push_to_edge
  config.skullstrip_use_skull = c.anatomical.skull_stripping.methods.afni.configuration.use_skull
  config.skullstrip_perc_int = c.anatomical.skull_stripping.methods.afni.configuration.intersections.ratio
  config.skullstrip_max_inter_iter = c.anatomical.skull_stripping.methods.afni.configuration.intersections.iterations
  config.skullstrip_fac = c.anatomical.skull_stripping.methods.afni.configuration.multiplier
  config.skullstrip_blur_fwhm = c.anatomical.skull_stripping.methods.afni.configuration.blur_fwhm

  config.bet_frac = c.anatomical.skull_stripping.methods.bet.configuration.threshold
  config.bet_mask_boolean = c.anatomical.skull_stripping.methods.bet.configuration.mask
  config.bet_mesh_boolean = c.anatomical.skull_stripping.methods.bet.configuration.mesh
  config.bet_outline = c.anatomical.skull_stripping.methods.bet.configuration.surface_outline
  config.bet_padding = c.anatomical.skull_stripping.methods.bet.configuration.padding
  config.bet_radius = c.anatomical.skull_stripping.methods.bet.configuration.radius
  config.bet_reduce_bias = c.anatomical.skull_stripping.methods.bet.configuration.reduce_bias
  config.bet_remove_eyes = c.anatomical.skull_stripping.methods.bet.configuration.remove_eyes
  config.bet_robust = c.anatomical.skull_stripping.methods.bet.configuration.robust_brain_center
  config.bet_skull = c.anatomical.skull_stripping.methods.bet.configuration.skull
  config.bet_surfaces = c.anatomical.skull_stripping.methods.bet.configuration.surfaces
  config.bet_threshold = c.anatomical.skull_stripping.methods.bet.configuration.apply_threshold
  config.bet_vertical_gradient = c.anatomical.skull_stripping.methods.bet.configuration.vertical_gradient

  config.resolution_for_anat = c.anatomical.registration.resolution + "mm"
  config.template_brain_only_for_anat = c.anatomical.registration.brain_template
  config.template_skull_for_anat = c.anatomical.registration.skull_template
  config.regOption = ['ANTS']

  config.regOption = []
    .concat(c.anatomical.registration.methods.ants.enabled ? ["ANTS"] : [])
    .concat(c.anatomical.registration.methods.fsl.enabled ? ["FSL"] : [])

  config.use_lesion_mask = [c.anatomical.registration.methods.ants.configuration.lesion_mask ? 1 : 0]

  config.fsl_linear_reg_only = [c.anatomical.registration.methods.fsl.configuration.linear_only ? 1 : 0]

  config.fnirtConfig = c.anatomical.registration.methods.fsl.configuration.config_file
  config.ref_mask = c.anatomical.registration.methods.fsl.configuration.reference_mask

  switch (c.anatomical.registration.methods.ants.interpolation) {
    case 'linear':
      config.funcRegANTSinterpolation = 'Linear'
      break;
  
    case 'sinc':
      config.funcRegANTSinterpolation = 'LanczosWindowedSinc'
      break;

    case 'spline':
      config.funcRegANTSinterpolation = 'BSpline'
      break;
  } 

  switch (c.anatomical.registration.methods.fsl.interpolation) {
    case 'linear':
      config.funcRegFSLinterpolation = 'trilinear'
      break;
  
    case 'sinc':
      config.funcRegFSLinterpolation = 'sinc'
      break;

    case 'spline':
      config.funcRegFSLinterpolation = 'spline'
      break;
  } 
  config.regWithSkull = [c.anatomical.registration.methods.ants.configuration.skull_on ? 1 : 0]

  config.runSegmentationPreprocessing = [c.anatomical.tissue_segmentation.enabled ? 1 : 0]
  config.priors_path = "$FSLDIR/data/standard/tissuepriors/2mm"
  config.PRIORS_WHITE = c.anatomical.tissue_segmentation.priors.white_matter
  config.PRIORS_GRAY = c.anatomical.tissue_segmentation.priors.gray_matter
  config.PRIORS_CSF = c.anatomical.tissue_segmentation.priors.cerebrospinal_fluid

  config.runFunctional = c.functional.enabled ? [1] : [0]

  // @TODO review pattern and stop idx
  config.slice_timing_correction = [c.functional.slice_timing_correction.enabled ? 1 : 0]
  config.TR = c.functional.slice_timing_correction.repetition_time.trim() === "" ? null : c.functional.slice_timing_correction.repetition_time
  config.slice_timing_pattern =
    c.functional.slice_timing_correction.pattern === "header" ?
      "Use NIFTI Header": c.functional.slice_timing_correction.pattern

  config.startIdx = c.functional.slice_timing_correction.first_timepoint === "" ?
    0 : parseInt(c.functional.slice_timing_correction.first_timepoint)

  config.stopIdx = c.functional.slice_timing_correction.last_timepoint === "" ?
    null : parseInt(c.functional.slice_timing_correction.last_timepoint)

  config.functional_volreg_twopass = c.functional.slice_timing_correction.two_pass

  config.runEPI_DistCorr = [c.functional.distortion_correction.enabled ? 1 : 0]
  config.fmap_distcorr_skullstrip = [c.functional.distortion_correction.skull_stripping === 'bet' ? 'BET' : 'AFNI']
  config.fmap_distcorr_frac = c.functional.distortion_correction.threshold
  config.fmap_distcorr_threshold = c.functional.distortion_correction.threshold
  config.fmap_distcorr_deltaTE = [c.functional.distortion_correction.delta_te]
  config.fmap_distcorr_dwell_time = [c.functional.distortion_correction.dwell_time]
  config.fmap_distcorr_dwell_asym_ratio = [c.functional.distortion_correction.dwell_to_assymetric_ratio]
  config.fmap_distcorr_pedir = c.functional.distortion_correction.phase_encoding_direction

  config.runRegisterFuncToAnat = [c.functional.anatomical_registration.enabled ? 1 : 0]
  config.runBBReg = [c.functional.anatomical_registration.bb_registration ? 1 : 0]
  config.boundaryBasedRegistrationSchedule = c.functional.anatomical_registration.bb_registration_scheduler
  config.func_reg_input = [c.functional.anatomical_registration.registration_input === 'mean' ?
    "Mean Functional" : "Selected Functional Volume"]

  config.func_reg_input_volume = c.functional.anatomical_registration.functional_volume
  config.functionalMasking = []
    .concat(c.functional.anatomical_registration.functional_masking.fsl ? ["FSL"] : [])
    .concat(c.functional.anatomical_registration.functional_masking.afni ? ["AFNI"] : []
    .concat(c.functional.anatomical_registration.functional_masking.fsl_afni ? ["FSL_AFNI"] : [])

  config.runRegisterFuncToMNI = [c.functional.template_registration.enabled ? 1 : 0]
  config.resolution_for_func_preproc = c.functional.template_registration.functional_resolution + "mm"
  config.resolution_for_func_derivative = c.functional.template_registration.derivative_resolution + "mm"
  
  switch (c.functional.template_registration.methods.ants.interpolation) {
    case 'linear':
      config.funcRegANTSinterpolation = 'Linear'
      break;
  
    case 'sinc':
      config.funcRegANTSinterpolation = 'LanczosWindowedSinc'
      break;

    case 'spline':
      config.funcRegANTSinterpolation = 'BSpline'
      break;
  } 
  
  switch (c.functional.template_registration.methods.fsl.interpolation) {
    case 'linear':
      config.funcRegFSLinterpolation = 'trilinear'
      break;
  
    case 'sinc':
      config.funcRegFSLinterpolation = 'sinc'
      break;

    case 'spline':
      config.funcRegFSLinterpolation = 'spline'
      break;
  } 
  config.template_brain_only_for_func = c.functional.template_registration.brain_template
  config.template_skull_for_func = c.functional.template_registration.skull_template
  config.identityMatrix = c.functional.template_registration.identity_matrix

  config.runICA = [c.functional.aroma.enabled ? 1 : 0]
  config.aroma_denoise_type = c.functional.aroma.denoising_strategy === 'non-aggressive' ? "nonaggr" : "aggr"

  config.runNuisance = [c.functional.nuisance_regression.enabled ? 1 : 0]
  config.lateral_ventricles_mask = c.functional.nuisance_regression.lateral_ventricles_mask

  config.Regressors = []
  for (const regressor of c.functional.nuisance_regression.regressors) {

    const newRegressor = {}

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
    ]){
      if (!regressor[k].enabled) {
        continue
      }
      newRegressor[k] = clone(regressor[k])
      delete newRegressor[k].enabled
    }

    config.Regressors.push(newRegressor)
  }

  config.runMedianAngleCorrection = [c.functional.median_angle_correction.enabled ? 1 : 0]
  config.targetAngleDeg = [c.functional.median_angle_correction.target_angle]

  config.runROITimeseries = [c.derivatives.timeseries_extraction.enabled ? 1 : 0]

  config.tsa_roi_paths = [{}]

  for (const mask of c.derivatives.timeseries_extraction.masks) {
    let maskFeatures = []
      .concat(mask.average ? ['Avg'] : [])
      .concat(mask.voxel ? ['Voxel'] : [])
      .concat(mask.spatial_regression ? ['SpatialReg'] : [])
      .concat(mask.pearson_correlation ? ['PearsonCorr'] : [])
      .concat(mask.partial_correlation ? ['PartialCorr'] : [])

    if (maskFeatures.length > 0) {
      config.tsa_roi_paths[0][mask.mask] = maskFeatures.join(", ")
    }
  }

  config.roiTSOutputs = [
    c.derivatives.timeseries_extraction.outputs.csv,
    c.derivatives.timeseries_extraction.outputs.numpy
  ]

  config.runSCA = [c.derivatives.sca.enabled ? 1 : 0]

  config.sca_roi_paths = [{}]

  for (const mask of c.derivatives.sca.masks) {

    let maskFeatures = []
      .concat(mask.average ? ['Avg'] : [])
      .concat(mask.dual_regression ? ['DualReg'] : [])
      .concat(mask.multiple_regression ? ['MultReg'] : [])

    if (maskFeatures.length > 0) {
      config.sca_roi_paths[0][mask.mask] = maskFeatures.join(", ")
    }
  }

  config.mrsNorm = c.derivatives.sca.normalize

  config.runVMHC = [c.derivatives.vmhc.enabled ? 1 : 0]
  config.template_symmetric_brain_only = c.derivatives.vmhc.symmetric_brain
  config.template_symmetric_skull = c.derivatives.vmhc.symmetric_skull
  config.dilated_symmetric_brain_mask = c.derivatives.vmhc.dilated_symmetric_brain
  config.configFileTwomm = c.derivatives.vmhc.flirt_configuration_file

  config.runALFF = [c.derivatives.alff.enabled ? 1 : 0]
  config.highPassFreqALFF = [c.derivatives.alff.cutoff.high]
  config.lowPassFreqALFF = [c.derivatives.alff.cutoff.low]

  config.runReHo = [c.derivatives.reho.enabled ? 1 : 0]
  config.clusterSize = c.derivatives.reho.cluster_size

  config.runNetworkCentrality = [c.derivatives.network_centrality.enabled ? 1 : 0]
  config.templateSpecificationFile = c.derivatives.network_centrality.mask

  const thresholdType = {
    significance: "Significance threshold",
    sparsity: "Sparsity threshold",
    correlation: "Correlation threshold",
  }

  config.degWeightOptions = [
    c.derivatives.network_centrality.degree_centrality.binarized,
    c.derivatives.network_centrality.degree_centrality.weighted
  ]
  config.degCorrelationThresholdOption = [thresholdType[c.derivatives.network_centrality.degree_centrality.threshold_type]]
  config.degCorrelationThreshold = c.derivatives.network_centrality.degree_centrality.threshold

  config.eigWeightOptions = [
    c.derivatives.network_centrality.eigenvector.binarized,
    c.derivatives.network_centrality.eigenvector.weighted
  ]
  config.eigCorrelationThresholdOption = [thresholdType[c.derivatives.network_centrality.eigenvector.threshold_type]]
  config.eigCorrelationThreshold = c.derivatives.network_centrality.eigenvector.threshold

  config.lfcdWeightOptions = [
    c.derivatives.network_centrality.local_connectivity_density.binarized,
    c.derivatives.network_centrality.local_connectivity_density.weighted
  ]
  config.lfcdCorrelationThresholdOption = [thresholdType[c.derivatives.network_centrality.local_connectivity_density.threshold_type]]
  config.lfcdCorrelationThreshold = c.derivatives.network_centrality.local_connectivity_density.threshold

  config.memoryAllocatedForDegreeCentrality = 3.0

  config.run_smoothing = [c.functional.smoothing.enabled ? 1 : 0]
  config.fwhm = [c.functional.smoothing.kernel_fwhm]
  config.smoothing_order = [c.functional.smoothing.before_zscore ? "Before" : "After"]
  config.runZScoring = [c.functional.smoothing.zscore_derivatives ? 1 : 0]

  const yamled = yamlTemplate(config)
      .replace(/\$\{resolution_for_anat\}/g, "${pipeline.anatomical.registration.resolution}mm")
      .replace(/\$\{resolution_for_func_preproc\}/g, "${pipeline.functional.template_registration.functional_resolution}mm")

  const e = {
    paths: {
      fsl_dir: '$FSLDIR',
    }
  }

  return replacements(yamled, c, e)
}
