export default {
  id: 'default',
  name: 'Default',
  versions: {
    'default': {
      version: '1.6.0',
      configuration: {
        general: {
          environment: {
            memory: 3,
            cores: 1,
            participants: 1,
            ants_threads: 1,
            grid: false,
            resource: 'SGE',
            SGEenvironment: 'cpac',
            queue: 'all.q',
            paths: {
              fsl: '$FSLDIR',
              output: './cpac_runs/default/output',
              working: './cpac_runs/default/working',
              crash: './cpac_runs/default/crash',
              log: './cpac_runs/default/log',
            },
            outputs: {
              aws: ' ',
              s3: false,
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
                  reference_mask: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}_brain_mask_dil.nii.gz'
                }
              }
            }
          },
          preprocessing: {
            methods: {
              nlmf: {
                enabled: false,
              },
              n4: {
                enabled: false,
              },
              acpc_align: {
                enabled: false,
                acpc_brainsize: 150,
                acpc_template_skull: '$FSLDIR/data/standard/MNI152_T1_1mm.nii.gz',
                acpc_template_brain: 'None',
              },
            }
          },
          skull_stripping: {
            enabled: true,
            methods: {
              afni: {
                enabled: true,
                configuration: {
                  mask_vol: false,
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
                  skullstrip_monkey: false,
                }
              },
              bet: {
                enabled: false,
                configuration: {
                  threshold: 0.5,
                  apply_threshold: false,
                  mask: true,
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
              },
              niworkflows_ants: {
                enabled: false,
                ants_templates: {
                  niworkflows_ants_template_path: '/ants_template/oasis/T_template0.nii.gz',
                  niworkflows_ants_mask_path: '/ants_template/oasis/T_template0_BrainCerebellumProbabilityMask.nii.gz',
                  niworkflows_ants_regmask_path: '/ants_template/oasis/T_template0_BrainCerebellumRegistrationMask.nii.gz',
                }
              },
              unet: {
                enabled: false,
                unet_model: 's3://fcp-indi/resources/cpac/resources/Site-All-T-epoch_36.model',
              }
            }
          },
          tissue_segmentation: {
            enabled: true,
            configuration: {
              priors: {
                enabled: true,
                priors: {
                  white_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
                  gray_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_gray_bin.nii.gz',
                  cerebrospinal_fluid: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_csf_bin.nii.gz',
                }
              },
              fast_threshold: {
                enabled: true,
              },
              custom_threshold: {
                enabled: false,
                threshold: {
                  white_matter: 0.95,
                  gray_matter: 0.95,
                  cerebrospinal_fluid: 0.95,
                }
              },
              erosion: {
                enabled: false,
                proportion: 0.6
              },
              template_based_seg: {
                enabled: false,
                methods: 'epi_template_based', // or 't1_templated_based'
                tissue_path: {
                  white_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_white_bin.nii.gz',
                  gray_matter: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_gray_bin.nii.gz',
                  cerebrospinal_fluid: '${environment.paths.fsl_dir}/data/standard/tissuepriors/2mm/avg152T1_csf_bin.nii.gz',
                }
              },
              ANTs_prior_based_seg: {
                enabled: false,
                template_brain_list: [
                ], 
                template_segmentation_list: [
                ], 
                CSF_label: 24,
                left_GM_label: 3,
                right_GM_label: 42,
                left_WM_label: 2,         
                right_WM_label: 41,
              }
            }
          }
        },
        functional: {
          enabled: true,
          preprocessing: {
            n4_mean_epi: {
              enabled: false,
            },
            scaling: {
              enabled: false,
              factor: 10
            },
            motion_stats: {
              enabled: false,
            },
            motion_correction: {
              method: {
                'volreg': true,
                'mcflirt': false,
              },
              reference: {
                'mean': true,
                'median': false,
                'selected_volume': false,
              },
              reference_volume: 0
            },
            despike: {
              enabled: false,
            }
          },
          slice_timing_correction: {
            enabled: true,
            pattern: 'header',
            repetition_time: '',
            first_timepoint: 0,
            last_timepoint: '',
            two_pass: true,
          },
          distortion_correction: {
            enabled: false,
            method: {
              phasediff: {
                enabled: true,
                skull_stripping: 'afni',
                threshold: 0.6, //would be displaced by threshold_bet or threshold_afni
                threshold_bet: 0.5,
                threshold_afni: 0.6,
                delta_te: 2.46,
                dwell_time: 0.0005,
                dwell_to_assymetric_ratio: 0.93902439,
                phase_encoding_direction: 'x'
              },
              blip: {
                enabled: false
              }
            }
          },
          anatomical_registration: {
            enabled: true,
            bb_registration: false,
            bb_registration_scheduler: '${environment.paths.fsl_dir}/etc/flirtsch/bbr.sch',
            registration_input: 'mean',
            functional_volume: 0,
            functional_masking: {
              fsl: {
                enabled: false,
                configuration: {
                  functional_mean: false,
                  threshold: 0.3,
                  apply_threshold: false,
                  mask: true,
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
              },              
              afni: false,
              fsl_afni: false,
              anat_refined: false,
            },
          },
          template_registration: {
            enabled: true,
            functional_resolution: 3,
            derivative_resolution: 3,
            template_for_resample: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_1mm_brain.nii.gz',
            identity_matrix: '${environment.paths.fsl_dir}/etc/flirtsch/ident.mat',
            methods: {
              ants: {
                interpolation: 'sinc',
                ANTs_para_T1_registration:
                {
                  collapse_output_transforms: 0,
                  dimensionality: 3,
                  initial_moving_transform: {
                    initializationFeature: 0,
                  },
                  transforms: {
                    Rigid: {
                      enabled: true,
                      gradientStep: 0.1,
                      metric: {
                        type: {
                          MI: {
                            enabled: true,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: false,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence: {
                        iteration: '1000x500x250x100',
                        convergenceThreshold: 1e-08,
                        convergenceWindowSize: 10,
                      },
                      smoothing_sigmas: '3.0x2.0x1.0x0.0',
                      shrink_factors: '8x4x2x1',
                      use_histogram_matching: true,
                    },

                    Affine: {
                      enabled: true,
                      gradientStep: 0.1,
                      metric: {
                        type: {
                          MI: {
                            enabled: true,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: false,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence: {
                        iteration: '1000x500x250x100',
                        convergenceThreshold: 1e-08,
                        convergenceWindowSize: 10,
                      },
                      smoothing_sigmas: '3.0x2.0x1.0x0.0',
                      shrink_factors: '8x4x2x1',
                      use_histogram_matching: true,
                    },

                    SyN: {
                      enabled: true,
                      gradientStep: 0.1,
                      updateFieldVarianceInVoxelSpace: 3.0,
                      totalFieldVarianceInVoxelSpace: 0.0,
                      metric: {
                        type: {
                          MI: {
                            enabled: false,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: true,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence: {
                        iteration: '100x100x70x20',
                        convergenceThreshold: 1e-09,
                        convergenceWindowSize: 15,
                      },
                      smoothing_sigmas: '3.0x2.0x1.0x0.0',
                      shrink_factors: '6x4x2x1',
                      use_histogram_matching: true,
                      winsorize_image_intensities: {
                        lowerQuantile: 0.01,
                        upperQuantile: 0.99,
                      },
                    },
                  },
                },
              },
              fsl: {
                interpolation: 'sinc',
              },
            },
            epi_template: {
              enabled: false,
              template_epi: 's3://fcp-indi/resources/cpac/resources/epi_hbn.nii.gz',
              ANTs_para_EPI_registration: 
                {
                  collapse_output_transforms: 0,
                  dimensionality: 3,
                  initial_moving_transform: {
                    initializationFeature: 0,
                  },
                  transforms: {
                    Rigid: {
                      enabled: true,
                      gradientStep: 0.1,
                      metric: {
                        type: {
                          MI: {
                            enabled: true,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: false,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence:{
                        iteration: '1000x500x250x100',
                        convergenceThreshold: 1e-08,
                        convergenceWindowSize: 10,
                      },
                      smoothing_sigmas : '3.0x2.0x1.0x0.0',
                      shrink_factors : '8x4x2x1',
                      use_histogram_matching:true,
                    },

                    Affine:{
                      enabled: true,
                      gradientStep: 0.1,
                      metric: {
                        type: {
                          MI: {
                            enabled: true,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: false,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence: {
                        iteration: '1000x500x250x100',
                        convergenceThreshold: 1e-08,
                        convergenceWindowSize: 10,
                      },
                      smoothing_sigmas: '3.0x2.0x1.0x0.0',
                      shrink_factors: '8x4x2x1',
                      use_histogram_matching: true,
                    },

                    SyN: {
                      enabled: true,
                      gradientStep: 0.1,
                      updateFieldVarianceInVoxelSpace: 3.0,
                      totalFieldVarianceInVoxelSpace: 0.0,
                      metric: {
                        type: {
                          MI: {
                            enabled: false,
                            metricWeight: 1,
                            numberOfBins: 32,
                            samplingStrategy: 'Regular',
                            samplingPercentage: 0.25,
                          },
                          CC: {
                            enabled: true,
                            metricWeight: 1,
                            radius: 4,
                          },
                        },
                      },
                      convergence: {
                        iteration: '100x100x70x20',
                        convergenceThreshold: 1e-09,
                        convergenceWindowSize: 15,
                      },
                      smoothing_sigmas: '3.0x2.0x1.0x0.0',
                      shrink_factors: '6x4x2x1',
                      use_histogram_matching: true,
                      winsorize_image_intensities:{
                        lowerQuantile: 0.01,
                        upperQuantile: 0.99,
                      },  
                    },
                  },
                },
              
            },
            t1_template: {
              enabled: true,
              brain_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}_brain.nii.gz',
              skull_template: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}.nii.gz',
            },
          },
          nuisance_regression: {
            enabled: true,
            lateral_ventricles_mask: '${environment.paths.fsl_dir}/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz',
            regressors: [
              {
                GrayMatter: {
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
                    filter: ' ',
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
                    filter: ' ',
                    method: 'PC',
                    components: 5,
                  },
                  degree: 1,
                  threshold: '1.5SD',
                  by_slice: true,
                  include_delayed: false,
                  include_squared: false,
                  include_delayed_squared: false,
                  erode_mask: false,
                  erode_mask_mm: false,
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
        longitudinal: {
          enabled: true,
          run_anatomical: false,
          run_functional: false,
          average_method: 'median',
          dof: 12,
          interpolation: 'trilinear',
          cost_function: 'corratio',
          thread_pool: 2,
          convergence_threshold: -1,
        },
        derivatives: {
          enabled: true,
          timeseries_extraction: {
            enabled: true,
            masks: [
            ],
            realignment: {
              roi_to_func: true,
              func_to_roi: false,
            },
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
            symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}_brain_symmetric.nii.gz',
            symmetric_skull: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}_symmetric.nii.gz',
            dilated_symmetric_brain: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.anatomical.registration.resolution}_brain_mask_symmetric_dil.nii.gz',
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
          pypeer: {
            enabled: true,
            eye_scan_names: '',
            data_scan_names: '',
            eye_mask_path: '${environment.paths.fsl_dir}/data/standard/MNI152_T1_${pipeline.functional.template_registration.functional_resolution}_eye_mask.nii.gz',
            stimulus_path: '',
            gsr: true,
            scrub: {
              enabled: false,
              threshold: 0.2
            }
          }
        }
      }
    }
  }
}
