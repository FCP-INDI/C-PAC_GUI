export default {
  id: 'default',
  name: 'Default',
  versions: {
    'default': {
      version: '1.3.0',
      configuration: {
        general: {
          environment: {
            memory: 3,
            cores: 1,
            participants: 1,
            ants_threads: 1,
            paths: {
              fsl: '',
              output: './cpac_runs/default/output',
              working: './cpac_runs/default/working',
              crash: './cpac_runs/default/crash',
              log: './cpac_runs/default/log',
            },
            outputs: {
              extra: false,
              debug: false,
              logging: true,
              regenerate: false,
              quality_control: true,
              create_symbolic_links: true,
              remove_working: false,
            },
          },
        },
        anatomical: {
          enabled: true,
          registration: {
            resolution: 1,
            brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm_brain.nii.gz',
            skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}mm.nii.gz',
            methods: {
              ants: { enabled: true, configuration: { skull_on: false } },
              fsl: {
                enabled: true,
                configuration: {
                  config_file: 'T1_2_MNI152_2mm',
                  reference_mask: '$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_dil.nii.gz'
                }
              }
            }
          },
          skull_stripping: {
            enabled: true,
            methods: {
              afni: {
                enabled: true,
                configuration: {
                  shrink_factor: {
                    vary: true,
                    threshold: 0.6,
                    bottom_limit: 0.4
                  },
                  multiplier: 1,
                  iterations: 250,
                  avoid_eyes: true,
                  avoid_ventricles: true,
                  use_edge: true,
                  use_skull: false,
                  pushout: true,
                  touchup: true,
                  push_to_edge: false,
                  fill_hole: 10,
                  nearest_neighbors_smooth: 72,
                  final_smooth: 20,
                  fractional_expansion: 0.1,
                  intersections: {
                    ratio: 0,
                    iterations: 4
                  },
                  blur_fwhm: 0,
                }
              },
              bet: {
                enabled: false,
                configuration: {
                  threshold: 0.5,
                  apply_threshold: false,
                  mask: false,
                  mesh: false,
                  skull: false,
                  surfaces: false,
                  surface_outline: false,
                  padding: false,
                  radius: 0,
                  reduce_bias: false,
                  remove_eyes: false,
                  robust_brain_center: false,
                  vertical_gradient: 0.0,
                }
              }
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
            first_timepoint: 0,
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
            brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}_brain.nii.gz',
            skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}.nii.gz',
            identity_matrix: '${environment.paths.fsl_dir}/etc/flirtsch/ident.mat',

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
                low: 0.1,
                high: 0.01
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
              threshold_type: 'sparsity',
              threshold: 0.001
            },
            eigenvector: {
              binarized: true,
              weighted: true,
              threshold_type: 'sparsity',
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
    }
  }
}
