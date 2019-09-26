export default {
  id: 'default',
  name: 'Default',
  versions: {
    'default': {
      version: '1.4.3',
      configuration: {
        general: {
          environment: {
            memory: 3,
            cores: 1,
            participants: 1,
            ants_threads: 1,
            paths: {
              fsl: '$FSLDIR',
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
              organized: true,
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
              ants: {
                enabled: true,
                interpolation: 'sinc', 
                configuration: {
                  skull_on: false,
                  lesion_mask: true,
                }
              },
              fsl: {
                enabled: false,
                interpolation: 'sinc',
                configuration: {
                  linear_only: false,
                  config_file: 'T1_2_MNI152_2mm',
                  reference_mask: '$FSLDIR/data/standard/MNI152_T1_${resolution_for_anat}_brain_mask_dil.nii.gz'
                }
              }
            }
          },
          preprocessing: {
            enabled: true,
            methods: {
              nlmf: {
                enabled: false
              },
              n4: {
                enabled: false
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
            two_pass: true,
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
              fsl: false,
              afni: false,
              fsl_afni: false,
            },
          },
          template_registration: {
            enabled: true,
            functional_resolution: 3,
            derivative_resolution: 3,
            methods: {
              ants: {
                interpolation: 'sinc',
              },
              fsl: {
                interpolation: 'sinc',
              },
            },
            brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}_brain.nii.gz',
            skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}.nii.gz',
            identity_matrix: '${environment.paths.fsl_dir}/etc/flirtsch/ident.mat',

          },
          nuisance_regression: {
            enabled: true,
            lateral_ventricles_mask: '${environment.paths.fsl_dir}/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz',
            regressors: [
              {
                GreyMatter: {
                  enabled: true,
                  summary: {
                    method: 'Mean',
                  },
                  erode_mask: true,
                  extraction_resolution: 2,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                WhiteMatter: {
                  enabled: true,
                  summary: {
                    method: 'Mean',
                  },
                  erode_mask: true,
                  extraction_resolution: 2,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                CerebrospinalFluid: {
                  enabled: true,
                  summary: {
                    method: 'Mean',
                  },
                  erode_mask: false,
                  extraction_resolution: 2,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                aCompCor: {
                  enabled: true,
                  summary: {
                    method: 'DetrendPC',
                    components: 5,
                  },
                  tissues: ['WhiteMatter'],
                  extraction_resolution: 2,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                tCompCor: {
                  enabled: false,
                  summary: {
                    method: 'PC',
                    components: 5,
                  },
                  threshold: '1.5SD',
                  by_slice: true,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                GlobalSignal: {
                  enabled: true,
                  summary: {
                    method: 'Mean',
                  },
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                },
                Motion: {
                  enabled: true,
                  include_delayed: true,
                  include_squared: true,
                  include_delayed_squared: true,
                },
                PolyOrt: {
                  enabled: true,
                  degree: 2,
                },
                Bandpass: {
                  enabled: true,
                  bottom_frequency: 0.01,
                  top_frequency: 0.1,
                },
                Censor: {
                  enabled: false,
                  method: 'Kill',
                  threshold: {
                    type: 'FD_P',
                    value: 0.0,
                  },
                  number_of_previous_trs_to_censor: 1,
                  number_of_subsequent_trs_to_censor: 2,
                },
              }
            ]
          },
          median_angle_correction: {
            enabled: true,
            target_angle: 90
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
