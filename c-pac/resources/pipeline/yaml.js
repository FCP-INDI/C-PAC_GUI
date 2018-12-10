export default (config) => `
# CPAC Pipeline Configuration YAML file
# Version 1.3.0
#
# http://fcp-indi.github.io for more info.
#
# Tip: This file can be edited manually with a text editor for quick modifications.


# Select False if you intend to run CPAC on a single machine.
# If set to True, CPAC will attempt to submit jobs through the job scheduler / resource manager selected below.
${ config.runOnGrid }

# Full path to the FSL version to be used by CPAC.
# If you have specified an FSL path in your .bashrc file, this path will be set automatically.
${ config.FSLDIR }

# Sun Grid Engine (SGE), Portable Batch System (PBS), or Simple Linux Utility for Resource Management (SLURM).
# Only applies if you are running on a grid or compute cluster.
${ config.resourceManager }

# SGE Parallel Environment to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
${ config.parallelEnvironment }

# SGE Queue to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
${ config.queue }

# The maximum amount of memory each participant's workflow can allocate. Use this to place an upper bound of memory usage. Warning: 'Memory Per Participant' multiplied by 'Number of Participants to Run Simultaneously' must not be more than the total amount of RAM. Conversely, using too little RAM can impede the speed of a pipeline run. It is recommended that you set this to a value that when multiplied by 'Number of Participants to Run Simultaneously' is as much RAM you can safely allocate.
${ config.maximumMemoryPerParticipant }

# The maximum amount of cores (on a single machine) or slots on a node (on a cluster/grid) to allocate per participant. Setting this above 1 will parallelize each participant's workflow where possible. If you wish to dedicate multiple cores to ANTS-based anatomical registration (below), this value must be equal or higher than the amount of cores provided to ANTS. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of participants set to run in parallel (the 'Number ofParticipants to Run Simultaneously' setting).
${ config.maxCoresPerParticipant }

# The number of participant workflows to run at the same time. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of cores dedicated to each participant (the 'Maximum Number of Cores Per Participant' setting).
${ config.numParticipantsAtOnce }

# The number of cores to allocate to ANTS-based anatomical registration per participant. Multiple cores can greatly speed up this preprocessing step. This number cannot be greater than the number of cores per participant.
${ config.num_ants_threads }

# Name for this pipeline configuration - useful for identification.
${ config.pipelineName }

# Directory where CPAC should store temporary and intermediate files.
${ config.workingDirectory }

# Directory where CPAC should write crash logs.
${ config.crashLogDirectory }

# Directory where CPAC should place run logs.
${ config.logDirectory }

# Directory where CPAC should place processed data.
${ config.outputDirectory }

# If setting the 'Output Directory' to an S3 bucket, insert the path to your AWS credentials file here.
${ config.awsOutputBucketCredentials }

# Enable server-side 256-AES encryption on data to the S3 bucket
${ config.s3Encryption }

# Include extra versions and intermediate steps of functional preprocessing in the output directory.
${ config.write_func_outputs }

# Include extra outputs in the output directory that may be of interest when more information is needed.
${ config.write_debugging_outputs }

# Generate quality control pages containing preprocessing and derivative outputs.
${ config.generateQualityControlImages }

# Deletes the contents of the Working Directory after running.
# This saves disk space, but any additional preprocessing or analysis will have to be completely re-run.
${ config.removeWorkingDir }

# Whether to write log details of the pipeline. run to the logging files.
${ config.run_logging }

# Uses the contents of the Working Directory to regenerate all outputs and their symbolic links.
# Requires an intact Working Directory from a previous CPAC run.
${ config.reGenerateOutputs }

# Create a user-friendly, well organized version of the output directory.
${ config.runSymbolicLinks }

# Disables skull-stripping on the anatomical inputs if they are already skull-stripped outside of C-PAC. Set this to On if your input images are already skull-stripped.
${ config.already_skullstripped }

# Choice of using AFNI or FSL-BET to perform SkullStripping
${ config.skullstrip_option }

# Set the threshold value controlling the brain vs non-brain voxels. Default is 0.6.
${ config.skullstrip_shrink_factor }

# Vary the shrink factor at every iteration of the algorithm. This prevents the likelihood of surface getting stuck in large pools of CSF before reaching the outer surface of the brain. Default is On.
${ config.skullstrip_var_shrink_fac }

# The shrink factor bottom limit sets the lower threshold when varying the shrink factor. Default is 0.4, for when edge detection is used (which is On by default), otherwise the default value is 0.65.
${ config.skullstrip_shrink_factor_bot_lim }

# Avoids ventricles while skullstripping.
${ config.skullstrip_avoid_vent }

# Set the number of iterations. Default is 250.The number of iterations should depend upon the density of your mesh.
${ config.skullstrip_n_iterations }

# While expanding, consider the voxels above and not only the voxels below
${ config.skullstrip_pushout }

# Perform touchup operations at the end to include areas not covered by surface expansion.
${ config.skullstrip_touchup }

# Give the maximum number of pixels on either side of the hole that can be filled. The default is 10 only if 'Touchup' is On - otherwise, the default is 0.
${ config.skullstrip_fill_hole }

# Perform nearest neighbor coordinate interpolation every few iterations. Default is 72.
${ config.skullstrip_NN_smooth }

# Perform final surface smoothing after all iterations. Default is 20.
${ config.skullstrip_smooth_final }

# Avoid eyes while skull stripping. Default is On.
${ config.skullstrip_avoid_eyes }

# Use edge detection to reduce leakage into meninges and eyes. Default is On.
${ config.skullstrip_use_edge }

# Speed of expansion.
${ config.skullstrip_exp_frac }

# Perform aggressive push to edge. This might cause leakage. Default is Off.
${ config.skullstrip_push_to_edge }

# Use outer skull to limit expansion of surface into the skull in case of very strong shading artifacts. Use this only if you have leakage into the skull.
${ config.skullstrip_use_skull }

# Percentage of segments allowed to intersect surface. It is typically a number between 0 and 0.1, but can include negative values (which implies no testing for intersection).
${ config.skullstrip_perc_int }

# Number of iterations to remove intersection problems. With each iteration, the program automatically increases the amount of smoothing to get rid of intersections. Default is 4.
${ config.skullstrip_max_inter_iter }

# Multiply input dataset by FAC if range of values is too small.
${ config.skullstrip_fac }

# Blur dataset after spatial normalization. Recommended when you have lots of CSF in brain and when you have protruding gyri (finger like). If so, recommended value range is 2-4. Otherwise, leave at 0.
${ config.skullstrip_blur_fwhm }

# Set the threshold value controling the brain vs non-brain voxels, default is 0.5
${ config.bet_frac }

# Mask created along with skull stripping
${ config.bet_mask_boolean }

# Mesh created along with skull stripping
${ config.bet_mesh_boolean }

# Create a surface outline image
${ config.bet_outline }

# Add padding to the end of the image, improving BET.Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
${ config.bet_padding }

# Integer value of head radius
${ config.bet_radius }

# Reduce bias and cleanup neck. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
${ config.bet_reduce_bias }

# Eyes and optic nerve cleanup. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
${ config.bet_remove_eyes }

# Robust brain center estimation. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
${ config.bet_robust }

# Create a skull image
${ config.bet_skull }

# Gets additional skull and scalp surfaces by running bet2 and betsurf. This is mutually exclusive with reduce_bias, robust, padding, remove_eyes
${ config.bet_surfaces }

# Apply thresholding to segmented brain image and mask
${ config.bet_threshold }

# Vertical gradient in fractional intensity threshold (-1,1)
${ config.bet_vertical_gradient }

# The resolution to which anatomical images should be transformed during registration.
# This is the resolution at which processed anatomical files will be output.
${ config.resolution_for_anat }

# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
${ config.template_brain_only_for_anat }

# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
${ config.template_skull_for_anat }

# Use either ANTS or FSL (FLIRT and FNIRT) as your anatomical registration method.
${ config.regOption }

# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
${ config.fnirtConfig }

# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
${ config.ref_mask }

# Register skull-on anatomical image to a template.
${ config.regWithSkull }

# Automatically segment anatomical images into white matter, gray matter, and CSF based on prior probability maps.
${ config.runSegmentationPreprocessing }

# Full path to a directory containing binarized prior probability maps.
# These maps are included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use non-standard priors.
${ config.priors_path }

# Full path to a binarized White Matter prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
${ config.PRIORS_WHITE }

# Full path to a binarized Gray Matter prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
${ config.PRIORS_GRAY }

# Full path to a binarized CSF prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
${ config.PRIORS_CSF }

# Interpolate voxel time courses so they are sampled at the same time points.
${ config.slice_timing_correction }

# Specify the TR (in seconds) at which images were acquired.
# Default is None- TR information is then read from scan parameters in the data configuration file, or the image file header if there is no scan information in the data configuration.
# Note: the selection chosen here applies to all scans of all participants.
${ config.TR }

# Acquisition strategy for acquiring image slices.
# Slice acquisition information is read from scan parameters in the data configuration file- if this is not provided, then this option will apply.
# Note: the selection here applies to all scans of all participants.
${ config.slice_timing_pattern }

# First timepoint to include in analysis.
# Default is 0 (beginning of timeseries).
# First timepoint selection in the scan parameters in the data configuration file, if present, will over-ride this selection.
# Note: the selection here applies to all scans of all participants.
${ config.startIdx }

# Last timepoint to include in analysis.
# Default is None or End (end of timeseries).
# Last timepoint selection in the scan parameters in the data configuration file, if present, will over-ride this selection.
# Note: the selection here applies to all scans of all participants.
${ config.stopIdx }

# Perform field map correction using a single phase difference image, a subtraction of the two phase images from each echo. Default scanner for this method is SIEMENS.
${ config.runEPI_DistCorr }

# Since the quality of the distortion heavily relies on the skull-stripping step, we provide a choice of method (AFNI 3dSkullStrip or FSL BET).
${ config.fmap_distcorr_skullstrip }

# Set the threshold value for the skull-stripping of the magnitude file. Depending on the data, a tighter extraction may be necessary in order to prevent noisy voxels from interfering with preparing the field map.
# The default value is 0.5.
${ config.fmap_distcorr_threshold }

# Set the Delta-TE value, used for preparing field map, time delay between the first and second echo images. Default value is 2.46 ms.
${ config.fmap_distcorr_deltaTE }

# Set the Dwell Time for the fugue input. This is the time between scans, default value is 0.0005s.
${ config.fmap_distcorr_dwell_time }

# Set the asymmetric ratio value for FSL Fugue input.
${ config.fmap_distcorr_dwell_asym_ratio }

# Set the phase-encoding direction. The options are: x, y, z, -x, -y, -z.
${ config.fmap_distcorr_pedir }

# Run Functional to Anatomical Registration
${ config.runRegisterFuncToAnat }

# Run Functional to Anatomical Registration with BB Register
${ config.runBBReg }

# Standard FSL 5.0 Scheduler used for Boundary Based Registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
${ config.boundaryBasedRegistrationSchedule }

# Choose whether to use the mean of the functional/EPI as the input to functional-to-anatomical registration or one of the volumes from the functional 4D timeseries that you choose.
${ config.func_reg_input }

# Only for when 'Use as Functional-to-Anatomical Registration Input' is set to 'Selected Functional Volume'. Input the index of which volume from the functional 4D timeseries input file you wish to use as the input for functional-to-anatomical registration.
${ config.func_reg_input_volume }

# Choose which tool to be used in functional masking - AFNI 3dAutoMask or FSL BET.
${ config.functionalMasking }

# Register functional images to a standard MNI152 template.
# This option must be enabled if you wish to calculate any derivatives. If set to On [1], only the template-space files will be output. If set to On/Off [1,0], both template-space and native-space files will be output.
${ config.runRegisterFuncToMNI }

# The resolution (in mm) to which the preprocessed, registered functional timeseries outputs are written into. Note that selecting a 1 mm or 2 mm resolution might substantially increase your RAM needs- these resolutions should be selected with caution. For most cases, 3 mm or 4 mm resolutions are suggested.
${ config.resolution_for_func_preproc }

# The resolution (in mm) to which the registered derivative outputs are written into.
${ config.resolution_for_func_derivative }

# Standard FSL Skull Stripped Template. Used as a reference image for functional registration
${ config.template_brain_only_for_func }

# Standard FSL Anatomical Brain Image with Skull
${ config.template_skull_for_func }

# Matrix containing all 1's. Used as an identity matrix during registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
${ config.identityMatrix }

# Run ICA-AROMA de-noising.
${ config.runICA }

# Types of denoising strategy: i)nonaggr-patial component regression, ii)aggr-aggressive denoising
${ config.aroma_denoise_type }

# Run Nuisance Signal Regression
${ config.runNuisance }

# Standard Lateral Ventricles Binary Mask
${ config.lateral_ventricles_mask }

# Select which nuisance signal corrections to apply:
# compcor = CompCor
# wm = White Matter
# csf = CSF
# gm = Gray Matter
# global = Global Mean Signal
# pc1 = First Principle Component
# motion = Motion
# linear = Linear Trend
# quadratic = Quadratic Trend
${ config.Regressors }

# Number of Principle Components to calculate when running CompCor. We recommend 5 or 6.
${ config.nComponents }

# Use the Friston 24-Parameter Model during volume realignment.
# If this option is turned off, only 6 parameters will be used.
# These parameters will also be output as a spreadsheet.
${ config.runFristonModel }

# Remove or regress out volumes exhibiting excessive motion.
# Each of these options are mutually exclusive, and selecting more than one will create a new pipeline fork for each option. For example, de-spiking and scrubbing will not run within the same pipeline strategy.
${ config.runMotionSpike }

# (Motion Spike De-Noising only) Choose which Framewise Displacement (FD) calculation to apply the threshold to during de-spiking or scrubbing.
${ config.fdCalc }

# (Motion Spike De-Noising only) Specify the maximum acceptable Framewise Displacement (FD) in millimeters.
# Any volume exhibiting FD greater than the value will be regressed out or scrubbed.
${ config.spikeThreshold }

# (Motion Spike De-Noising only) Number of volumes to de-spike or scrub preceding a volume with excessive FD.
${ config.numRemovePrecedingFrames }

# (Motion Spike De-Noising only) Number of volumes to de-spike or scrub subsequent to a volume with excessive FD.
${ config.numRemoveSubsequentFrames }

# Correct for the global signal using Median Angle Correction.
${ config.runMedianAngleCorrection }

# Target angle used during Median Angle Correction.
${ config.targetAngleDeg }

# Apply a temporal band-pass filter to functional data.
${ config.runFrequencyFiltering }

# Define one or more band-pass filters by clicking the + button.
${ config.nuisanceBandpassFreq }

# Extract the average time series of one or more ROIs/seeds. Must be enabled if you wish to run Seed-based Correlation Analysis.
${ config.runROITimeseries }

# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'Voxel', 'SpatialReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and SpatialReg, you would enter: '/path/to/ROI.nii.gz': Avg, SpatialReg
${ config.tsa_roi_paths }

# By default, extracted time series are written as both a text file and a 1D file. Additional output formats are as a .csv spreadsheet or a Numpy array.
${ config.roiTSOutputs }

# For each extracted ROI Average time series, CPAC will generate a whole-brain correlation map.
# It should be noted that for a given seed/ROI, SCA maps for ROI Average time series will be the same.
${ config.runSCA }

# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'DualReg', 'MultReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and MultReg, you would enter: '/path/to/ROI.nii.gz': Avg, MultReg
${ config.sca_roi_paths }

# Normalize each time series before running Dual Regression SCA.
${ config.mrsNorm }

# Calculate Voxel-mirrored Homotopic Connectivity (VMHC) for all voxels.
${ config.runVMHC }

# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
${ config.template_symmetric_brain_only }

# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
${ config.template_symmetric_skull }

# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
${ config.dilated_symmetric_brain_mask }

# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
${ config.configFileTwomm }

# Calculate Amplitude of Low Frequency Fluctuations (ALFF) and and fractional ALFF (f/ALFF) for all voxels.
${ config.runALFF }

# Frequency cutoff (in Hz) for the high-pass filter used when calculating f/ALFF.
${ config.highPassFreqALFF }

# Frequency cutoff (in Hz) for the low-pass filter used when calculating f/ALFF
${ config.lowPassFreqALFF }

# Calculate Regional Homogeneity (ReHo) for all voxels.
${ config.runReHo }

# Number of neighboring voxels used when calculating ReHo
# 7 (Faces)
# 19 (Faces + Edges)
# 27 (Faces + Edges + Corners)
${ config.clusterSize }

# Calculate Degree, Eigenvector Centrality, or Functional Connectivity Density.
${ config.runNetworkCentrality }

# Full path to a NIFTI file describing the mask. Centrality will be calculated for all voxels within the mask.
${ config.templateSpecificationFile }

# Enable/Disable degree centrality by selecting the connectivity weights
${ config.degWeightOptions }

# Select the type of threshold used when creating the degree centrality adjacency matrix.
${ config.degCorrelationThresholdOption }

# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
${ config.degCorrelationThreshold }

# Enable/Disable eigenvector centrality by selecting the connectivity weights
${ config.eigWeightOptions }

# Select the type of threshold used when creating the eigenvector centrality adjacency matrix.
${ config.eigCorrelationThresholdOption }

# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
${ config.eigCorrelationThreshold }

# Enable/Disable lFCD by selecting the connectivity weights
${ config.lfcdWeightOptions }

# Select the type of threshold used when creating the lFCD adjacency matrix.
${ config.lfcdCorrelationThresholdOption }

# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
${ config.lfcdCorrelationThreshold }

# Maximum amount of RAM (in GB) to be used when calculating Degree Centrality.
# Calculating Eigenvector Centrality will require additional memory based on the size of the mask or number of ROI nodes.
${ config.memoryAllocatedForDegreeCentrality }

# Smooth the derivative outputs.
# On - Run smoothing and output only the smoothed outputs.
# On/Off - Run smoothing and output both the smoothed and non-smoothed outputs.
# Off - Don't run smoothing.
${ config.run_smoothing }

# Full Width at Half Maximum of the Gaussian kernel used during spatial smoothing.
# Can be a single value or multiple values separated by commas.
# Note that spatial smoothing is run as the last step in the individual-level analysis pipeline, such that all derivatives are output both smoothed and unsmoothed.
${ config.fwhm }

# Choose whether to smooth outputs before or after z-scoring.
${ config.smoothing_order }

# z-score standardize the derivatives. This is required for group-level analysis.
# On - Run z-scoring and output only the z-scored outputs.
# On/Off - Run z-scoring and output both the z-scored and raw score versions of the outputs.
# Off - Don't run z-scoring.
${ config.runZScoring }

# Run FSL FEAT group-level analysis.
${ config.run_fsl_feat }

# This number depends on computing resources.
${ config.numGPAModelsAtOnce }

# Use the + to add FSL model configuration to be run.
${ config.modelConfigs }

# Run Bootstrap Analysis of Stable Clusters
${ config.run_basc }


${ config.basc_resolution }

# Maximum amount of processors to use while performing BASC.
${ config.basc_proc }

# Maximum amount of RAM (in GB) to be used when running BASC.
${ config.basc_memory }

# Full path to a mask file to be used when running BASC. Voxels outside this mask will be excluded from analysis.
# If you do not wish to use a mask, set this field to None.
# Note: BASC is very computationally intensive, we strongly recommend you limit your analysis to specific brain areas of interest.
${ config.basc_roi_mask_file }


${ config.basc_cross_cluster_mask_file }


${ config.basc_similarity_metric_list }

# Number of bootstraps to apply to individual time series.
${ config.basc_timeseries_bootstrap_list }

# Number of bootstraps to apply to the original dataset.
${ config.basc_dataset_bootstrap_list }

# Number of clusters to create during clustering at both the individual and group levels.
${ config.basc_n_clusters_list }

${ config.basc_affinity_thresh }

${ config.basc_output_sizes }

${ config.basc_cross_cluster }

${ config.basc_blocklength_list }

${ config.basc_group_dim_reduce }

# Full path to a text file listing which participant IDs you want included in the analysis, with one ID on each line.
# Tip: A sample group-level participant inclusion text file is generated when you first create your data configuration.
${ config.basc_inclusion }

# If there are multiple pipeline output directories, and you only want to run BASC on one or some of them, you can list them here - pipeline names separated by commas (check the output directory of your individual-level analysis run to see which pipeline directories are available).
# If nothing is listed, all available pipelines will be run.
${ config.basc_pipeline }

# If there are multiple series or scans in any of the pipeline outputs for which PyBASC is being run, and you only want to run for some of them, you can list them here - scan labels separated by commas (ex. 'rest_run-1, rest_run-3').
# If nothing is listed, all available pipelines will be run.
${ config.basc_scan_inclusion }

# Used to determine if Multivariate Distance Matrix Regression (MDMR) will be added to the pipeline or not.
${ config.runMDMR }

# Inclusion list text file listing the participant IDs you wish to include in the MDMR analysis. If left as None, will include all subjects.
${ config.mdmr_inclusion }

# Path to a mask file. Voxels outside of the mask will be excluded from MDMR.
${ config.mdmr_roi_file }

# Path to a CSV file containing the phenotypic regressor.
${ config.mdmr_regressor_file }

# Name of the participants column in your regressor file.
${ config.mdmr_regressor_participant_column }

# Columns from the CSV file indicating factor variables. Other columns will be handled as covariates. Separated by commas.
${ config.mdmr_regressor_columns }

# Number of permutation tests to run on the Pseudo-F statistics.
${ config.mdmr_permutations }

# Number of Nipype nodes created while computing MDMR. Dependent upon computing resources.
${ config.mdmr_parallel_nodes }

`
