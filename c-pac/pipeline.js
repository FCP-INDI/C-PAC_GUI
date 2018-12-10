import yaml from 'yaml'

import template from './resources/pipeline/config'
import yamlTemplate from './resources/pipeline/yaml'


export function parse(content) {
  const config = yaml.parse(content)

  const t = JSON.parse(JSON.stringify(template))
  const c = t.versions['0'].configuration

  t.name = config.pipelineName
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

  if (config.regOption.includes("FSL")) {
    c.anatomical.registration.methods.fsl.enabled = true
  }
  c.anatomical.registration.methods.fsl.configuration.config_file = config.fnirtConfig
  c.anatomical.registration.methods.fsl.configuration.reference_mask =
    config.ref_mask
      .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  c.anatomical.tissue_segmentation.enabled = config.runSegmentationPreprocessing.includes(1)
  c.anatomical.tissue_segmentation.priors.white_matter = config.PRIORS_WHITE.replace("$priors_path", "${environment.paths.segmentation_priors}")
  c.anatomical.tissue_segmentation.priors.grate_matter = config.PRIORS_GRAY.replace("$priors_path", "${environment.paths.segmentation_priors}")
  c.anatomical.tissue_segmentation.priors.cerebrospinal_fluid = config.PRIORS_CSF.replace("$priors_path", "${environment.paths.segmentation_priors}")

  c.functional.slice_timing_correction.enabled = config.slice_timing_correction.includes(1)
  c.functional.slice_timing_correction.repetition_time = !config.TR || config.TR == "None" ? '' : config.TR
  c.functional.slice_timing_correction.pattern = config.slice_timing_pattern == "Use NIFTI Header" ? "pattern" : config.slice_timing_pattern

  c.functional.slice_timing_correction.first_timepoint = config.startIdx
  c.functional.slice_timing_correction.last_timepoint = !config.stopIdx || config.stopIdx == "None" ? '' : config.stopIdx

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

  c.functional.nuisance_regression.compcor_components = config.nComponents
  c.functional.nuisance_regression.friston_motion_regressors = config.runFristonModel.includes(1)
  c.functional.nuisance_regression.spike_denoising.no_denoising = config.runMotionSpike.includes('None')
  c.functional.nuisance_regression.spike_denoising.despiking = config.runMotionSpike.includes('De-Spiking')
  c.functional.nuisance_regression.spike_denoising.scrubbing = config.runMotionSpike.includes('Scrubbing')
  c.functional.nuisance_regression.fd_calculation = config.fdCalc.includes('Jenkinson') ? 'jenkinson' : 'power'
  c.functional.nuisance_regression.fd_threshold = config.spikeThreshold[0]
  c.functional.nuisance_regression.pre_volumes = config.numRemovePrecedingFrames
  c.functional.nuisance_regression.post_volumes = config.numRemoveSubsequentFrames

  c.functional.nuisance_regression.regressors = []
  for (const regressor of config.Regressors) {
    c.functional.nuisance_regression.regressors.push({
      gray_matter: regressor.gm == 1,
      white_matter: regressor.wm == 1,
      cerebrospinal_fluid: regressor.csf == 1,
      compcor: regressor.compcor == 1,
      global: regressor.global == 1,
      principal_component: regressor.pc1 == 1,
      motion: regressor.motion == 1,
      linear: regressor.linear == 1,
      quadratic: regressor.quadratic == 1,
    })
  }

  c.functional.median_angle_correction.enable = config.runMedianAngleCorrection.includes(1)
  c.functional.median_angle_correction.target_angle = config.targetAngleDeg[0]

  c.functional.temporal_filtering.enable = config.runFrequencyFiltering.includes(1)
  c.functional.temporal_filtering.filters = []
  for (const frequencies of config.nuisanceBandpassFreq) {
    c.functional.temporal_filtering.filters.push({
      low: frequencies[0],
      high: frequencies[1],
    })
  }

  c.functional.aroma.enable = config.runICA.includes(1)
  c.functional.aroma.denoising_strategy =
    config.aroma_denoise_type === 'nonaggr' ? 'non-aggressive' : 'aggressive'

  c.functional.smoothing.enable = config.run_smoothing.includes(1)
  c.functional.smoothing.kernel_fwhm = config.fwhm[0]
  c.functional.smoothing.before_zscore = config.smoothing_order[0] == 'Before'
  c.functional.smoothing.zscore_derivatives = config.runZScoring.includes(1)

  c.derivatives.timeseries_extraction.enable = config.runROITimeseries.includes(1)

  if (config.tsa_roi_paths instanceof Array && config.tsa_roi_paths.length > 0) {
    config.tsa_roi_paths = config.tsa_roi_paths[0]
  }
  if (config.tsa_roi_paths) {
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


  c.derivatives.sca.enable = config.runSCA.includes(1)

  if (config.sca_roi_paths instanceof Array && config.sca_roi_paths.length > 0) {
    config.sca_roi_paths = config.sca_roi_paths[0]
  }
  if (config.sca_roi_paths) {
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

  c.derivatives.vmhc.enable = config.runVMHC.includes(1)
  c.derivatives.vmhc.symmetric_brain = config.template_symmetric_brain_only
  c.derivatives.vmhc.symmetric_skull = config.template_symmetric_skull
  c.derivatives.vmhc.dilated_symmetric_brain = config.dilated_symmetric_brain_mask
  c.derivatives.vmhc.flirt_configuration_file = config.configFileTwomm

  c.derivatives.alff.enable = config.runALFF.includes(1)
  c.derivatives.alff.cutoff.low = config.lowPassFreqALFF[0]
  c.derivatives.alff.cutoff.high = config.highPassFreqALFF[0]

  c.derivatives.reho.enable = config.runReHo.includes(1)
  c.derivatives.reho.cluster_size = config.clusterSize


  c.derivatives.network_centrality.enable = config.runNetworkCentrality.includes(1)
  c.derivatives.network_centrality.mask = config.templateSpecificationFile

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


export function dump(pipeline, version=0) {

  // TODO verify version
  const c = pipeline.versions[version].configuration

  const config = {}

  config.runOnGrid = false
  config.FSLDIR = "FSLDIR"
  config.resourceManager = "SGE"
  config.parallelEnvironment = "cpac"
  config.queue = "all.q"
  config.maximumMemoryPerParticipant = 3
  config.maxCoresPerParticipant = 1
  config.numParticipantsAtOnce = 1
  config.num_ants_threads = 1
  config.pipelineName = "cpac_default"
  config.workingDirectory = "./cpac_runs/default/working"
  config.crashLogDirectory = "./cpac_runs/default/crash"
  config.logDirectory = "./cpac_runs/default/log"
  config.outputDirectory = "./cpac_runs/default/output"
  config.awsOutputBucketCredentials = ""
  config.s3Encryption = [1]
  config.write_func_outputs = [0]
  config.write_debugging_outputs = [0]
  config.generateQualityControlImages = [1]
  config.removeWorkingDir = false
  config.run_logging = true
  config.reGenerateOutputs = false
  config.runSymbolicLinks = [1]

  config.already_skullstripped = [c.anatomical.skull_stripping.enabled ? 0 : 1]
  config.skullstrip_option = []
    .concat(c.anatomical.skull_stripping.methods.afni.enabled ? ["AFNI"] : [])
    .concat(c.anatomical.skull_stripping.methods.bet.enabled ? ["BET"] : [])

  config.skullstrip_shrink_factor = 0.6
  config.skullstrip_var_shrink_fac = true
  config.skullstrip_shrink_factor_bot_lim = 0.4
  config.skullstrip_avoid_vent = true
  config.skullstrip_n_iterations = 250
  config.skullstrip_pushout = true
  config.skullstrip_touchup = true
  config.skullstrip_fill_hole = 10
  config.skullstrip_NN_smooth = 72
  config.skullstrip_smooth_final = 20
  config.skullstrip_avoid_eyes = true
  config.skullstrip_use_edge = true
  config.skullstrip_exp_frac = 0.1
  config.skullstrip_push_to_edge = false
  config.skullstrip_use_skull = false
  config.skullstrip_perc_int = 0
  config.skullstrip_max_inter_iter = 4
  config.skullstrip_fac = 1
  config.skullstrip_blur_fwhm = 0
  config.bet_frac = 0.5
  config.bet_mask_boolean = false
  config.bet_mesh_boolean = false
  config.bet_outline = false
  config.bet_padding = false
  config.bet_radius = 0
  config.bet_reduce_bias = false
  config.bet_remove_eyes = false
  config.bet_robust = false
  config.bet_skull = false
  config.bet_surfaces = false
  config.bet_threshold = false
  config.bet_vertical_gradient = 0.0

  config.resolution_for_anat = c.anatomical.registration.resolution + "mm"
  config.template_brain_only_for_anat = c.anatomical.registration.brain_template
  config.template_skull_for_anat = c.anatomical.registration.skull_template
  config.regOption = ['ANTS']

  config.regOption = []
    .concat(c.anatomical.registration.methods.ants.enabled ? ["ANTS"] : [])
    .concat(c.anatomical.registration.methods.fsl.enabled ? ["FSL"] : [])

  config.fnirtConfig = c.anatomical.registration.methods.fsl.configuration.config_file
  config.ref_mask = c.anatomical.registration.methods.fsl.configuration.reference_mask

  config.regWithSkull = [c.anatomical.registration.methods.ants.configuration.skull_on ? 1 : 0]

  config.runSegmentationPreprocessing = [c.anatomical.tissue_segmentation.enabled ? 1 : 0]
  config.priors_path = ""
  config.PRIORS_WHITE = c.anatomical.tissue_segmentation.priors.white_matter
  config.PRIORS_GRAY = c.anatomical.tissue_segmentation.priors.grate_matter
  config.PRIORS_CSF = c.anatomical.tissue_segmentation.priors.cerebrospinal_fluid

  // @TODO review pattern and stop idx
  config.slice_timing_correction = [c.functional.slice_timing_correction.enabled ? 1 : 0]
  config.TR = c.functional.slice_timing_correction.repetition_time.trim() === "" ? null : c.functional.slice_timing_correction.repetition_time
  config.slice_timing_pattern =
    c.functional.slice_timing_correction.pattern === "pattern" ?
      "Use NIFTI Header": c.functional.slice_timing_correction.pattern

  config.startIdx = c.functional.slice_timing_correction.first_timepoint === "" ?
    0 : parseInt(c.functional.slice_timing_correction.first_timepoint)

  config.stopIdx = c.functional.slice_timing_correction.last_timepoint === "" ?
    null : parseInt(c.functional.slice_timing_correction.last_timepoint)

  config.runEPI_DistCorr = [c.functional.distortion_correction.enabled ? 1 : 0]
  config.fmap_distcorr_skullstrip = [c.functional.distortion_correction.skull_stripping === 'bet' ? 'BET' : 'AFNI']
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
    .concat(c.functional.anatomical_registration.functional_masking.bet ? ["BET"] : [])
    .concat(c.functional.anatomical_registration.functional_masking.afni ? ["3dAutoMask"] : [])

  config.runRegisterFuncToMNI = [c.functional.template_registration.enabled ? 1 : 0]
  config.resolution_for_func_preproc = c.functional.template_registration.functional_resolution + "mm"
  config.resolution_for_func_derivative = c.functional.template_registration.derivative_resolution + "mm"
  config.template_brain_only_for_func = c.functional.template_registration.brain_template
  config.template_skull_for_func = c.functional.template_registration.skull_template
  config.identityMatrix = c.functional.template_registration.identity_matrix

  config.runICA = [c.functional.aroma.enable ? 1 : 0]
  config.aroma_denoise_type = c.functional.aroma.denoising_strategy === 'non-aggressive' ? "nonaggr" : "aggr"

  config.runNuisance = [c.functional.nuisance_regression.enabled ? 1 : 0]
  config.lateral_ventricles_mask = c.functional.nuisance_regression.lateral_ventricles_mask

  config.Regressors = []
  for (const regressor of c.functional.nuisance_regression.regressors) {
    config.Regressors.push({
      compcor: regressor.compcor ? 1 : 0,
      wm: regressor.white_matter ? 1 : 0,
      gm: regressor.gray_matter ? 1 : 0,
      csf: regressor.cerebrospinal_fluid ? 1 : 0,
      global: regressor.global ? 1 : 0,
      pc1: regressor.principal_component ? 1 : 0,
      motion: regressor.motion ? 1 : 0,
      linear: regressor.linear ? 1 : 0,
      quadratic: regressor.quadratic ? 1 : 0,
    })
  }

  config.nComponents = c.functional.nuisance_regression.compcor_components

  config.runFristonModel = [c.functional.nuisance_regression.friston_motion_regressors ? 1 : 0]

  c.functional.nuisance_regression.spike_denoising.no_denoising = config.runMotionSpike.includes('None')
  c.functional.nuisance_regression.spike_denoising.despiking = config.runMotionSpike.includes('De-Spiking')
  c.functional.nuisance_regression.spike_denoising.scrubbing = config.runMotionSpike.includes('Scrubbing')

  config.runMotionSpike = []
    .concat(c.functional.nuisance_regression.spike_denoising.no_denoising ? ['None'] : [])
    .concat(c.functional.nuisance_regression.spike_denoising.despiking ? ['De-Spiking'] : [])
    .concat(c.functional.nuisance_regression.spike_denoising.scrubbing ? ['Scrubbing'] : [])

  config.fdCalc = c.functional.nuisance_regression.fd_calculation == 'jenkinson' ?
    'Jenkinson' : 'Power'

  config.spikeThreshold = [c.functional.nuisance_regression.fd_threshold]

  config.numRemovePrecedingFrames = c.functional.nuisance_regression.pre_volumes
  config.numRemoveSubsequentFrames = c.functional.nuisance_regression.post_volumes

  config.runMedianAngleCorrection = [c.functional.median_angle_correction.enable ? 1 : 0]
  config.targetAngleDeg = [c.functional.median_angle_correction.target_angle]

  config.runFrequencyFiltering = [c.functional.temporal_filtering.enable ? 1 : 0]
  config.nuisanceBandpassFreq = []
  for (const frequencies of c.functional.temporal_filtering.filters) {
    config.nuisanceBandpassFreq.push([
      frequencies[0],
      frequencies[1],
    ])
  }

  config.runROITimeseries = [c.derivatives.timeseries_extraction.enable ? 1 : 0]


  if (config.tsa_roi_paths) {
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

  config.tsa_roi_paths = [{}]

  for (const mask of c.derivatives.timeseries_extraction.masks) {

    let maskFeatures = []
      .concat(mask.average ? ['Avg'] : [])
      .concat(mask.voxel ? ['Voxel'] : [])
      .concat(mask.spatial_regression ? ['SpatialReg'] : [])
      .concat(mask.pearson_correlation ? ['PearsonCorr'] : [])
      .concat(mask.partial_correlation ? ['PartialCorr'] : [])

    if (mask.length > 0) {
      config.tsa_roi_paths[0][mask] = maskFeatures.join(", ")
    }
  }

  config.roiTSOutputs = [
    c.derivatives.timeseries_extraction.outputs.csv,
    c.derivatives.timeseries_extraction.outputs.numpy
  ]

  config.runSCA = [1]
  config.sca_roi_paths = []
  config.mrsNorm = true

  config.runVMHC = [1]
  config.template_symmetric_brain_only = "$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_symmetric.nii.gz"
  config.template_symmetric_skull = "$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_symmetric.nii.gz"
  config.dilated_symmetric_brain_mask = "$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_symmetric_dil.nii.gz"
  config.configFileTwomm = "$FSLDIR/etc/flirtsch/T1_2_MNI152_2mm.cnf"

  config.runALFF = [1]
  config.highPassFreqALFF = [0.01]
  config.lowPassFreqALFF = [0.1]

  config.runReHo = [1]
  config.clusterSize = 27

  config.runNetworkCentrality = [1]
  config.templateSpecificationFile = "s3://fcp-indi/resources/cpac/resources/mask-thr50-3mm.nii.gz"
  config.degWeightOptions = [true, true]
  config.degCorrelationThresholdOption = ['Significance threshold']
  config.degCorrelationThreshold = 0.001
  config.eigWeightOptions = [true, true]
  config.eigCorrelationThresholdOption = ['Significance threshold']
  config.eigCorrelationThreshold = 0.001
  config.lfcdWeightOptions = [true, true]
  config.lfcdCorrelationThresholdOption = ['Significance threshold']
  config.lfcdCorrelationThreshold = 0.001
  config.memoryAllocatedForDegreeCentrality = 3.0

  config.run_smoothing = [1]
  config.fwhm = [4]
  config.smoothing_order = ['Before']
  config.runZScoring = [1]

  config.run_fsl_feat = [0]
  config.numGPAModelsAtOnce = 1
  config.modelConfigs = []

  config.run_basc = [0]
  config.basc_resolution = "4mm"
  config.basc_proc = 2
  config.basc_memory = 4
  config.basc_roi_mask_file = null
  config.basc_cross_cluster_mask_file = null
  config.basc_similarity_metric_list = ['correlation']
  config.basc_timeseries_bootstrap_list = 100
  config.basc_dataset_bootstrap_list = 30
  config.basc_n_clusters_list = 2
  config.basc_affinity_thresh = [0.0]
  config.basc_output_sizes = 800
  config.basc_cross_cluster = true
  config.basc_blocklength_list = 1
  config.basc_group_dim_reduce = false
  config.basc_inclusion = null
  config.basc_pipeline = null
  config.basc_scan_inclusion = null

  config.runMDMR = [0]
  config.mdmr_inclusion = null
  config.mdmr_roi_file = null
  config.mdmr_regressor_file = null
  config.mdmr_regressor_participant_column = null
  config.mdmr_regressor_columns = null
  config.mdmr_permutations = 500
  config.mdmr_parallel_nodes = 1

  const configYamled = {}
  for (let k of Object.keys(config)) {
    configYamled[k] = yaml.stringify({ [k]: config[k] })
  }

  return yamlTemplate(configYamled)
}
