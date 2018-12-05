import yaml from 'yaml'

export const template = {
  id: 'default',
  name: 'Default',
  versions: {
    '0': {
      version: '1.3.0',
      configuration: {
        anatomical: {
          enabled: true,
          registration: {
            resolution: 1,
            brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm_brain.nii.gz',
            skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm.nii.gz',
            methods: {
              ants: { enabled: true, configuration: { skull_on: false } },
              fsl: { enabled: true, configuration: { config_file: '', reference_mask: '' } }
            }
          },
          skull_stripping: {
            enabled: true,
            methods: {
              afni: { enabled: true },
              bet: { enabled: false }
            }
          },
          tissue_segmentation: {
            enabled: true,
            priors: {
              white_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
              gray_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_gray_bin.nii.gz',
              cerebrospinal_fluid: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_csf_bin.nii.gz',
            }
          }
        },
        functional: {
          enabled: true,
          slice_timing_correction: {
            enabled: true,
            pattern: 'header',
            repetition_time: '',
            first_timepoint: '',
            last_timepoint: '',
          },
          distortion_correction: {
            enabled: true,
            skull_stripping: 'afni',
            threshold: 0.6,
            delta_te: 2.46,
            dwell_time: 0.0005,
            dwell_to_assymetric_ratio: 0.93902439,
            phase_encoding_direction: 'x',
          },
          anatomical_registration: {
            enabled: true,
            bb_registration: false,
            bb_registration_scheduler: '${environment.paths.fsl_dir}/etc/flirtsch/bbr.sch',
            registration_input: 'mean',
            functional_volume: 0,
            functional_masking: {
              bet: false,
              afni: false,
            },
          },
          template_registration: {
            enabled: true,
            functional_resolution: 3,
            derivative_resolution: 3,
            brain_template: '',
            skull_template: '',
            identity_matrix: '',

          },
          nuisance_regression: {
            enabled: true,
            lateral_ventricles_mask: '${environment.paths.fsl_dir}/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz',
            compcor_components: 5,
            friston_motion_regressors: true,
            spike_denoising: {
              no_denoising: true,
              despiking: false,
              scrubbing: false,
            },
            fd_calculation: 'jenkinson',
            fd_threshold: 0.2,
            pre_volumes: 1,
            post_volumes: 1,
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
          median_angle_correction: {
            enabled: true,
            target_angle: 90
          },
          temporal_filtering: {
            enabled: true,
            filters: [
              {
                low: 0.01,
                high: 0.1
              },
            ]
          },
          aroma: {
            enabled: true,
            denoising_strategy: 'non-aggressive'
          },
          smoothing: {
            enabled: true,
            kernel_fwhm: 4,
            before_zscore: false,
            zscore_derivatives: false,
          }
        },
        derivatives: {
          enabled: true,
          timeseries_extraction: {
            enabled: true,
            masks: [
            ],
            outputs: {
              csv: true,
              numpy: true,
            }
          },
          sca: {
            enabled: false,
            masks: [
            ],
            normalize: false,
          },
          vmhc: {
            enabled: false,
            symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_brain_symmetric.nii.gz',
            symmetric_skull: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_symmetric.nii.gz',
            dilated_symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_symmetric_dil.nii.gz',
            flirt_configuration_file: '${environment.paths.fsl_dir}/etc/flirtsch/T1_2_MNI152_2mm.cnf',
          },
          alff: {
            enabled: false,
            cutoff: {
              low: 0.01,
              high: 0.1,
            }
          },
          reho: {
            enabled: false,
            cluster_size: 7,
          },
          network_centrality: {
            enabled: false,
            mask: '',
            degree_centrality: {
              binarized: true,
              weighted: true,
              threshold_type: 'significance',
              threshold: 0.001
            },
            eigenvector: {
              binarized: true,
              weighted: true,
              threshold_type: 'significance',
              threshold: 0.001
            },
            local_connectivity_density: {
              binarized: true,
              weighted: true,
              threshold_type: 'significance',
              threshold: 0.001
            },
          },
        }
      }
    },
  }
}

export function loadPipeline(content) {
  const config = yaml.parse(content)

  const t = JSON.parse(JSON.stringify(template))
  const c = t.versions['0'].configuration

  t.name = config.pipelineName
  c.anatomical.skull_stripping.enabled = 1 in config.already_skullstripped

  if (typeof config.skullstrip_option === "string") {
    config.skullstrip_option = [config.skullstrip_option]
  }

  if ("AFNI" in config.skullstrip_option) {
    c.anatomical.skull_stripping.methods.afni.enabled = true
  }

  if ("BET" in config.skullstrip_option) {
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

  if ("ANTS" in config.regOption) {
    c.anatomical.registration.methods.ants.enabled = true
  }
  c.anatomical.registration.methods.ants.configuration.skull_on = 1 in config.regWithSkull

  if ("FSL" in config.regOption) {
    c.anatomical.registration.methods.fsl.enabled = true
  }
  c.anatomical.registration.methods.fsl.configuration.config_file = config.fnirtConfig
  c.anatomical.registration.methods.fsl.configuration.reference_mask =
    config.ref_mask
      .replace("${resolution_for_anat}", "${pipeline.anatomical.registration.resolution}mm")
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  c.anatomical.tissue_segmentation.enabled = 1 in config.runSegmentationPreprocessing
  c.anatomical.tissue_segmentation.priors.white_matter = config.PRIORS_WHITE.replace("$priors_path", "${environment.paths.segmentation_priors}")
  c.anatomical.tissue_segmentation.priors.grate_matter = config.PRIORS_GRAY.replace("$priors_path", "${environment.paths.segmentation_priors}")
  c.anatomical.tissue_segmentation.priors.cerebrospinal_fluid = config.PRIORS_CSF.replace("$priors_path", "${environment.paths.segmentation_priors}")

  c.functional.slice_timing_correction.enabled = 1 in config.slice_timing_correction
  c.functional.slice_timing_correction.repetition_time = !config.TR || config.TR == "None" ? '' : config.TR
  c.functional.slice_timing_correction.pattern = config.slice_timing_pattern == "Use NIFTI Header" ? "pattern" : config.slice_timing_pattern
  c.functional.slice_timing_correction.first_timepoint = config.startIdx
  c.functional.slice_timing_correction.last_timepoint = !config.stopIdx || config.stopIdx == "None" ? '' : config.stopIdx

  c.functional.distortion_correction.enabled = 1 in config.runEPI_DistCorr
  if (typeof config.fmap_distcorr_skullstrip === "string") {
    config.fmap_distcorr_skullstrip = [config.fmap_distcorr_skullstrip]
  }
  c.functional.distortion_correction.skull_stripping = 'BET' in config.fmap_distcorr_skullstrip ? 'bet' : 'afni'
  c.functional.distortion_correction.threshold = config.fmap_distcorr_frac[0] // TODO review on CPAC; fmap_distcorr_threshold???
  c.functional.distortion_correction.delta_te = config.fmap_distcorr_deltaTE[0]
  c.functional.distortion_correction.dwell_time = config.fmap_distcorr_dwell_time[0]
  c.functional.distortion_correction.dwell_to_assymetric_ratio = config.fmap_distcorr_dwell_asym_ratio[0]
  c.functional.distortion_correction.phase_encoding_direction = config.fmap_distcorr_pedir

  c.functional.anatomical_registration.enabled = 1 in config.runRegisterFuncToAnat
  c.functional.anatomical_registration.bb_registration = 1 in config.runBBReg
  c.functional.anatomical_registration.bb_registration_scheduler =
    config.boundaryBasedRegistrationSchedule
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")
  c.functional.anatomical_registration.registration_input =
    'Mean Functional' in config.func_reg_input ? 'mean' : 'selected'
  c.functional.anatomical_registration.functional_volume = config.func_reg_input_volume
  c.functional.anatomical_registration.functional_masking.bet = 'BET' in config.functionalMasking
  c.functional.anatomical_registration.functional_masking.afni = '3dAutoMask' in config.functionalMasking

  c.functional.template_registration.enabled = 1 in config.runRegisterFuncToMNI
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

  c.functional.nuisance_regression.enabled = 1 in config.runNuisance
  c.functional.nuisance_regression.lateral_ventricles_mask =
    config.lateral_ventricles_mask
      .replace("$FSLDIR", "${environment.paths.fsl_dir}")

  c.functional.nuisance_regression.lateral_ventricles_mask = config.nComponents
  c.functional.nuisance_regression.friston_motion_regressors = 1 in config.runFristonModel
  c.functional.nuisance_regression.spike_denoising.no_denoising = 'None' in config.runMotionSpike
  c.functional.nuisance_regression.spike_denoising.despiking = 'De-Spiking' in config.runMotionSpike
  c.functional.nuisance_regression.spike_denoising.scrubbing = 'Scrubbing' in config.runMotionSpike
  c.functional.nuisance_regression.fd_calculation = 'Jenkinson' in config.fdCalc ? 'jenkinson' : 'power'
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

  c.functional.median_angle_correction.enable = 1 in config.runMedianAngleCorrection
  c.functional.median_angle_correction.target_angle = config.targetAngleDeg[0]

  c.functional.temporal_filtering.enable = 1 in config.runFrequencyFiltering
  c.functional.temporal_filtering.filters = []
  for (const frequencies of config.nuisanceBandpassFreq) {
    c.functional.temporal_filtering.filters.push({
      low: frequencies[0],
      high: frequencies[1],
    })
  }

  c.functional.aroma.enable = 1 in config.runICA
  c.functional.aroma.denoising_strategy =
    config.aroma_denoise_type == 'nonaggr' ? 'non-aggressive' : 'aggressive'

  c.functional.smoothing.enable = 1 in config.run_smoothing
  c.functional.smoothing.kernel_fwhm = config.fwhm[0]
  c.functional.smoothing.before_zscore = config.smoothing_order[0] == 'Before'
  c.functional.smoothing.zscore_derivatives = 1 in config.runZScoring


  c.derivatives.timeseries_extraction.enable = 1 in config.runROITimeseries

  if (config.tsa_roi_paths instanceof Array) {
    config.tsa_roi_paths = config.tsa_roi_paths[0]
  }

  for (let mask of Object.keys(config.tsa_roi_paths)) {
    let analysis = config.tsa_roi_paths
    if (typeof analysis === "string") {
      analysis = analysis.split(",").map(s => s.trim().toLowerCase())
    }

    c.derivatives.timeseries_extraction.masks.push({
      mask,
      average: "avg" in analysis,
      voxel: "voxel" in analysis,
      spatial_regression: "spatialreg" in analysis,
      pearson_correlation: "pearsoncorr" in analysis,
      partial_correlation: "partialcorr" in analysis,
    })
  }

  c.derivatives.timeseries_extraction.outputs.csv = config.roiTSOutputs[0]
  c.derivatives.timeseries_extraction.outputs.numpy = config.roiTSOutputs[1]


  c.derivatives.sca.enable = 1 in config.runSCA

  if (config.sca_roi_paths instanceof Array) {
    config.sca_roi_paths = config.sca_roi_paths[0]
  }

  for (let mask of Object.keys(config.sca_roi_paths)) {
    let analysis = config.sca_roi_paths
    if (typeof analysis === "string") {
      analysis = analysis.split(",").map(s => s.trim().toLowerCase())
    }

    c.derivatives.sca.masks.push({
      mask,
      average: "avg" in analysis,
      dual_regression: "dualreg" in analysis,
      multiple_regression: "multreg" in analysis,
    })
  }

  c.derivatives.sca.normalize = config.mrsNorm


  c.derivatives.vmhc.enable = 1 in config.runVMHC
  c.derivatives.vmhc.symmetric_brain = config.template_symmetric_brain_only
  c.derivatives.vmhc.symmetric_skull = config.template_symmetric_skull
  c.derivatives.vmhc.dilated_symmetric_brain = config.dilated_symmetric_brain_mask
  c.derivatives.vmhc.flirt_configuration_file = config.configFileTwomm

  c.derivatives.alff.enable = 1 in config.runALFF
  c.derivatives.alff.cutoff.low = config.lowPassFreqALFF[0]
  c.derivatives.alff.cutoff.high = config.highPassFreqALFF[0]

  c.derivatives.reho.enable = 1 in config.runReHo
  c.derivatives.reho.cluster_size = config.clusterSize


  c.derivatives.network_centrality.enable = 1 in config.runNetworkCentrality
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
