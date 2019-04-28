export default (config) => `
# CPAC Pipeline Configuration YAML file
# Version 1.4.2
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


# If a lesion mask is available for a T1w image, use it to improve the ANTs' registration
${ config.use_lesion_mask }


# Use only FLIRT, without FNIRT, for anatomical-to-template registration.
${ config.fsl_linear_reg_only }


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


# Run functional preproceessing
${ config.runFunctional }

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


# Select which nuisance signal corrections to apply
${ config.Regressors }



# Correct for the global signal using Median Angle Correction.
${ config.runMedianAngleCorrection }


# Target angle used during Median Angle Correction.
${ config.targetAngleDeg }


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


`

// TODO load from file
// export { default as raw } from './pipeline_config_template.raw'
export const raw = `
# CPAC Pipeline Configuration YAML file
# Version 1.4.2
#
# http://fcp-indi.github.io for more info.
#
# Tip: This file can be edited manually with a text editor for quick modifications.


# Select False if you intend to run CPAC on a single machine.
# If set to True, CPAC will attempt to submit jobs through the job scheduler / resource manager selected below.
runOnGrid :  False


# Full path to the FSL version to be used by CPAC.
# If you have specified an FSL path in your .bashrc file, this path will be set automatically.
FSLDIR :  FSLDIR


# Sun Grid Engine (SGE), Portable Batch System (PBS), or Simple Linux Utility for Resource Management (SLURM).
# Only applies if you are running on a grid or compute cluster.
resourceManager :  SGE


# SGE Parallel Environment to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
parallelEnvironment :  cpac


# SGE Queue to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
queue :  all.q


# The maximum amount of memory each participant's workflow can allocate. Use this to place an upper bound of memory usage. Warning: 'Memory Per Participant' multiplied by 'Number of Participants to Run Simultaneously' must not be more than the total amount of RAM. Conversely, using too little RAM can impede the speed of a pipeline run. It is recommended that you set this to a value that when multiplied by 'Number of Participants to Run Simultaneously' is as much RAM you can safely allocate.
maximumMemoryPerParticipant :  3


# The maximum amount of cores (on a single machine) or slots on a node (on a cluster/grid) to allocate per participant. Setting this above 1 will parallelize each participant's workflow where possible. If you wish to dedicate multiple cores to ANTS-based anatomical registration (below), this value must be equal or higher than the amount of cores provided to ANTS. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of participants set to run in parallel (the 'Number ofParticipants to Run Simultaneously' setting).
maxCoresPerParticipant :  1


# The number of participant workflows to run at the same time. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of cores dedicated to each participant (the 'Maximum Number of Cores Per Participant' setting).
numParticipantsAtOnce :  1


# The number of cores to allocate to ANTS-based anatomical registration per participant. Multiple cores can greatly speed up this preprocessing step. This number cannot be greater than the number of cores per participant.
num_ants_threads :  1


# Name for this pipeline configuration - useful for identification.
pipelineName :  cpac_default


# Directory where CPAC should store temporary and intermediate files.
workingDirectory :  ./cpac_runs/default/working


# Directory where CPAC should write crash logs.
crashLogDirectory :  ./cpac_runs/default/crash


# Directory where CPAC should place run logs.
logDirectory :  ./cpac_runs/default/log


# Directory where CPAC should place processed data.
outputDirectory :  ./cpac_runs/default/output


# If setting the 'Output Directory' to an S3 bucket, insert the path to your AWS credentials file here.
awsOutputBucketCredentials :


# Enable server-side 256-AES encryption on data to the S3 bucket
s3Encryption :  [1]


# Include extra versions and intermediate steps of functional preprocessing in the output directory.
write_func_outputs :  [0]


# Include extra outputs in the output directory that may be of interest when more information is needed.
write_debugging_outputs :  [0]


# Generate quality control pages containing preprocessing and derivative outputs.
generateQualityControlImages :  [1]


# Deletes the contents of the Working Directory after running.
# This saves disk space, but any additional preprocessing or analysis will have to be completely re-run.
removeWorkingDir :  False


# Whether to write log details of the pipeline. run to the logging files.
run_logging :  True


# Uses the contents of the Working Directory to regenerate all outputs and their symbolic links.
# Requires an intact Working Directory from a previous CPAC run.
reGenerateOutputs :  False


# Create a user-friendly, well organized version of the output directory.
runSymbolicLinks :  [1]


# Disables skull-stripping on the anatomical inputs if they are already skull-stripped outside of C-PAC. Set this to On if your input images are already skull-stripped.
already_skullstripped :  [0]


# Choice of using AFNI or FSL-BET to perform SkullStripping
skullstrip_option :  ['AFNI']


# Set the threshold value controlling the brain vs non-brain voxels. Default is 0.6.
skullstrip_shrink_factor :  0.6


# Vary the shrink factor at every iteration of the algorithm. This prevents the likelihood of surface getting stuck in large pools of CSF before reaching the outer surface of the brain. Default is On.
skullstrip_var_shrink_fac :  True


# The shrink factor bottom limit sets the lower threshold when varying the shrink factor. Default is 0.4, for when edge detection is used (which is On by default), otherwise the default value is 0.65.
skullstrip_shrink_factor_bot_lim :  0.4


# Avoids ventricles while skullstripping.
skullstrip_avoid_vent :  True


# Set the number of iterations. Default is 250.The number of iterations should depend upon the density of your mesh.
skullstrip_n_iterations :  250


# While expanding, consider the voxels above and not only the voxels below
skullstrip_pushout :  True


# Perform touchup operations at the end to include areas not covered by surface expansion.
skullstrip_touchup :  True


# Give the maximum number of pixels on either side of the hole that can be filled. The default is 10 only if 'Touchup' is On - otherwise, the default is 0.
skullstrip_fill_hole :  10


# Perform nearest neighbor coordinate interpolation every few iterations. Default is 72.
skullstrip_NN_smooth :  72


# Perform final surface smoothing after all iterations. Default is 20.
skullstrip_smooth_final :  20


# Avoid eyes while skull stripping. Default is On.
skullstrip_avoid_eyes :  True


# Use edge detection to reduce leakage into meninges and eyes. Default is On.
skullstrip_use_edge :  True


# Speed of expansion.
skullstrip_exp_frac :  0.1


# Perform aggressive push to edge. This might cause leakage. Default is Off.
skullstrip_push_to_edge :  False


# Use outer skull to limit expansion of surface into the skull in case of very strong shading artifacts. Use this only if you have leakage into the skull.
skullstrip_use_skull :  Off


# Percentage of segments allowed to intersect surface. It is typically a number between 0 and 0.1, but can include negative values (which implies no testing for intersection).
skullstrip_perc_int :  0


# Number of iterations to remove intersection problems. With each iteration, the program automatically increases the amount of smoothing to get rid of intersections. Default is 4.
skullstrip_max_inter_iter :  4


# Multiply input dataset by FAC if range of values is too small.
skullstrip_fac :  1


# Blur dataset after spatial normalization. Recommended when you have lots of CSF in brain and when you have protruding gyri (finger like). If so, recommended value range is 2-4. Otherwise, leave at 0.
skullstrip_blur_fwhm :  0


# Set the threshold value controling the brain vs non-brain voxels, default is 0.5
bet_frac :  0.5


# Mask created along with skull stripping
bet_mask_boolean :  Off


# Mesh created along with skull stripping
bet_mesh_boolean :  Off


# Create a surface outline image
bet_outline :  Off


# Add padding to the end of the image, improving BET.Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
bet_padding :  Off


# Integer value of head radius
bet_radius :  0


# Reduce bias and cleanup neck. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
bet_reduce_bias :  Off


# Eyes and optic nerve cleanup. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
bet_remove_eyes :  Off


# Robust brain center estimation. Mutually exclusive with functional,reduce_bias,robust,padding,remove_eyes,surfaces
bet_robust :  Off


# Create a skull image
bet_skull :  Off


# Gets additional skull and scalp surfaces by running bet2 and betsurf. This is mutually exclusive with reduce_bias, robust, padding, remove_eyes
bet_surfaces :  Off


# Apply thresholding to segmented brain image and mask
bet_threshold :  Off


# Vertical gradient in fractional intensity threshold (-1,1)
bet_vertical_gradient : 0.0


# The resolution to which anatomical images should be transformed during registration.
# This is the resolution at which processed anatomical files will be output.
resolution_for_anat :  2mm


# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
template_brain_only_for_anat :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}_brain.nii.gz


# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
template_skull_for_anat :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}.nii.gz


# Use either ANTS or FSL (FLIRT and FNIRT) as your anatomical registration method.
regOption :  ['FSL']


# If a lesion mask is available for a T1w image, use it to improve the ANTs' registration
use_lesion_mask : [1]


# Use only FLIRT, without FNIRT, for anatomical-to-template registration.
fsl_linear_reg_only :  [0]


# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
fnirtConfig :  T1_2_MNI152_2mm


# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
ref_mask :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}_brain_mask_dil.nii.gz


# Register skull-on anatomical image to a template.
regWithSkull :  [0]


# Automatically segment anatomical images into white matter, gray matter, and CSF based on prior probability maps.
runSegmentationPreprocessing :  [1]


# Full path to a directory containing binarized prior probability maps.
# These maps are included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use non-standard priors.
priors_path :  $FSLDIR/data/standard/tissuepriors/2mm


# Full path to a binarized White Matter prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
PRIORS_WHITE :  $priors_path/avg152T1_white_bin.nii.gz


# Full path to a binarized Gray Matter prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
PRIORS_GRAY :  $priors_path/avg152T1_gray_bin.nii.gz


# Full path to a binarized CSF prior probability map.
# It is not necessary to change this path unless you intend to use non-standard priors.
PRIORS_CSF :  $priors_path/avg152T1_csf_bin.nii.gz


# Run functional preproceessing
runFunctional: [1]

# Interpolate voxel time courses so they are sampled at the same time points.
slice_timing_correction :  [0]


# Specify the TR (in seconds) at which images were acquired.
# Default is None- TR information is then read from scan parameters in the data configuration file, or the image file header if there is no scan information in the data configuration.
# Note: the selection chosen here applies to all scans of all participants.
TR :  None


# Acquisition strategy for acquiring image slices.
# Slice acquisition information is read from scan parameters in the data configuration file- if this is not provided, then this option will apply.
# Note: the selection here applies to all scans of all participants.
slice_timing_pattern :  Use NIFTI Header


# First timepoint to include in analysis.
# Default is 0 (beginning of timeseries).
# First timepoint selection in the scan parameters in the data configuration file, if present, will over-ride this selection.
# Note: the selection here applies to all scans of all participants.
startIdx :  0


# Last timepoint to include in analysis.
# Default is None or End (end of timeseries).
# Last timepoint selection in the scan parameters in the data configuration file, if present, will over-ride this selection.
# Note: the selection here applies to all scans of all participants.
stopIdx :  None


# Perform field map correction using a single phase difference image, a subtraction of the two phase images from each echo. Default scanner for this method is SIEMENS.
runEPI_DistCorr :  [0]


# Since the quality of the distortion heavily relies on the skull-stripping step, we provide a choice of method (AFNI 3dSkullStrip or FSL BET).
fmap_distcorr_skullstrip :  ['BET']


# Set the threshold value for the skull-stripping of the magnitude file. Depending on the data, a tighter extraction may be necessary in order to prevent noisy voxels from interfering with preparing the field map.
# The default value is 0.5.
fmap_distcorr_frac : [0.5]


# Set the threshold value for the skull-stripping of the magnitude file. Depending on the data, a tighter extraction may be necessary in order to prevent noisy voxels from interfering with preparing the field map.
# The default value is 0.5.
fmap_distcorr_threshold :  0.6


# Set the Delta-TE value, used for preparing field map, time delay between the first and second echo images. Default value is 2.46 ms.
fmap_distcorr_deltaTE : [2.46]


# Set the Dwell Time for the fugue input. This is the time between scans, default value is 0.0005s.
fmap_distcorr_dwell_time : [0.0005]


# Set the asymmetric ratio value for FSL Fugue input.
fmap_distcorr_dwell_asym_ratio : [0.93902439]


# Set the phase-encoding direction. The options are: x, y, z, -x, -y, -z.
fmap_distcorr_pedir :  -y


# Run Functional to Anatomical Registration
runRegisterFuncToAnat :  [1]


# Run Functional to Anatomical Registration with BB Register
runBBReg :  [1]


# Standard FSL 5.0 Scheduler used for Boundary Based Registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
boundaryBasedRegistrationSchedule :  $FSLDIR/etc/flirtsch/bbr.sch


# Choose whether to use the mean of the functional/EPI as the input to functional-to-anatomical registration or one of the volumes from the functional 4D timeseries that you choose.
func_reg_input :  ['Mean Functional']


# Only for when 'Use as Functional-to-Anatomical Registration Input' is set to 'Selected Functional Volume'. Input the index of which volume from the functional 4D timeseries input file you wish to use as the input for functional-to-anatomical registration.
func_reg_input_volume :  0


# Choose which tool to be used in functional masking - AFNI 3dAutoMask or FSL BET.
functionalMasking :  ['3dAutoMask']


# Register functional images to a standard MNI152 template.
# This option must be enabled if you wish to calculate any derivatives. If set to On [1], only the template-space files will be output. If set to On/Off [1,0], both template-space and native-space files will be output.
runRegisterFuncToMNI :  [1]


# The resolution (in mm) to which the preprocessed, registered functional timeseries outputs are written into. Note that selecting a 1 mm or 2 mm resolution might substantially increase your RAM needs- these resolutions should be selected with caution. For most cases, 3 mm or 4 mm resolutions are suggested.
resolution_for_func_preproc :  3mm


# The resolution (in mm) to which the registered derivative outputs are written into.
resolution_for_func_derivative :  3mm


# Standard FSL Skull Stripped Template. Used as a reference image for functional registration
template_brain_only_for_func :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_func_preproc}_brain.nii.gz


# Standard FSL Anatomical Brain Image with Skull
template_skull_for_func :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_func_preproc}.nii.gz


# Matrix containing all 1's. Used as an identity matrix during registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
identityMatrix :  $FSLDIR/etc/flirtsch/ident.mat


# Run ICA-AROMA de-noising.
runICA :  [1]


# Types of denoising strategy: i)nonaggr-patial component regression, ii)aggr-aggressive denoising
aroma_denoise_type :  nonaggr


# Run Nuisance Signal Regression
runNuisance :  [1]


# Standard Lateral Ventricles Binary Mask
lateral_ventricles_mask :  $FSLDIR/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz


# Select which nuisance signal corrections to apply
Regressors :

 - Motion:
     include_delayed: true
     include_squared: true
     include_delayed_squared: true

   aCompCor:
     summary:
       method: DetrendPC
       components: 5
     tissues:
       - WhiteMatter
       - CerebrospinalFluid
     extraction_resolution: 2

   CerebrospinalFluid:
     summary: Mean
     extraction_resolution: 2
     erode_mask: true

   GlobalSignal:
     summary: Mean

   PolyOrt:
    degree: 2

   Bandpass:
     bottom_frequency: 0.01
     top_frequency: 0.1


 - Motion:
     include_delayed: true
     include_squared: true
     include_delayed_squared: true

   aCompCor:
     summary:
       method: DetrendPC
       components: 5
     tissues:
       - WhiteMatter
       - CerebrospinalFluid
     extraction_resolution: 2

   CerebrospinalFluid:
     summary: Mean
     extraction_resolution: 2
     erode_mask: true

   PolyOrt:
    degree: 2

   Bandpass:
     bottom_frequency: 0.01
     top_frequency: 0.1


# Correct for the global signal using Median Angle Correction.
runMedianAngleCorrection :  [0]


# Target angle used during Median Angle Correction.
targetAngleDeg : [90]


# Extract the average time series of one or more ROIs/seeds. Must be enabled if you wish to run Seed-based Correlation Analysis.
runROITimeseries :  [0]


# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'Voxel', 'SpatialReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and SpatialReg, you would enter: '/path/to/ROI.nii.gz': Avg, SpatialReg
tsa_roi_paths:
  - s3://fcp-indi/resources/cpac/resources/CC400.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/ez_mask_pad.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/aal_mask_pad.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/CC200.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/tt_mask_pad.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/PNAS_Smith09_rsn10.nii.gz: SpatialReg
    s3://fcp-indi/resources/cpac/resources/ho_mask_pad.nii.gz: Avg
    s3://fcp-indi/resources/cpac/resources/rois_3mm.nii.gz: Avg


# By default, extracted time series are written as both a text file and a 1D file. Additional output formats are as a .csv spreadsheet or a Numpy array.
roiTSOutputs :  [True, True]


# For each extracted ROI Average time series, CPAC will generate a whole-brain correlation map.
# It should be noted that for a given seed/ROI, SCA maps for ROI Average time series will be the same.
runSCA :  [0]


# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'DualReg', 'MultReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and MultReg, you would enter: '/path/to/ROI.nii.gz': Avg, MultReg
sca_roi_paths:
  - s3://fcp-indi/resources/cpac/resources/PNAS_Smith09_rsn10.nii.gz: DualReg



# Normalize each time series before running Dual Regression SCA.
mrsNorm :  True


# Calculate Voxel-mirrored Homotopic Connectivity (VMHC) for all voxels.
runVMHC :  [0]


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
template_symmetric_brain_only :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}_brain_symmetric.nii.gz


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
template_symmetric_skull :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}_symmetric.nii.gz


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
dilated_symmetric_brain_mask :  $FSLDIR/data/standard/MNI152_T1_\${resolution_for_anat}_brain_mask_symmetric_dil.nii.gz


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
configFileTwomm :  $FSLDIR/etc/flirtsch/T1_2_MNI152_2mm.cnf


# Calculate Amplitude of Low Frequency Fluctuations (ALFF) and and fractional ALFF (f/ALFF) for all voxels.
runALFF :  [0]


# Frequency cutoff (in Hz) for the high-pass filter used when calculating f/ALFF.
highPassFreqALFF : [0.01]


# Frequency cutoff (in Hz) for the low-pass filter used when calculating f/ALFF
lowPassFreqALFF : [0.1]


# Calculate Regional Homogeneity (ReHo) for all voxels.
runReHo :  [0]


# Number of neighboring voxels used when calculating ReHo
# 7 (Faces)
# 19 (Faces + Edges)
# 27 (Faces + Edges + Corners)
clusterSize :  27


# Calculate Degree, Eigenvector Centrality, or Functional Connectivity Density.
runNetworkCentrality :  [0]


# Full path to a NIFTI file describing the mask. Centrality will be calculated for all voxels within the mask.
templateSpecificationFile :  s3://fcp-indi/resources/cpac/resources/mask-thr50-3mm.nii.gz


# Enable/Disable degree centrality by selecting the connectivity weights
degWeightOptions :  [True, True]


# Select the type of threshold used when creating the degree centrality adjacency matrix.
degCorrelationThresholdOption :  ['Sparsity threshold']


# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
degCorrelationThreshold :  0.001


# Enable/Disable eigenvector centrality by selecting the connectivity weights
eigWeightOptions :  [True, True]


# Select the type of threshold used when creating the eigenvector centrality adjacency matrix.
eigCorrelationThresholdOption :  ['Sparsity threshold']


# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
eigCorrelationThreshold :  0.001


# Enable/Disable lFCD by selecting the connectivity weights
lfcdWeightOptions :  [True, True]


# Select the type of threshold used when creating the lFCD adjacency matrix.
lfcdCorrelationThresholdOption :  ['Significance threshold']


# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
lfcdCorrelationThreshold :  0.001


# Maximum amount of RAM (in GB) to be used when calculating Degree Centrality.
# Calculating Eigenvector Centrality will require additional memory based on the size of the mask or number of ROI nodes.
memoryAllocatedForDegreeCentrality :  3.0


# Smooth the derivative outputs.
# On - Run smoothing and output only the smoothed outputs.
# On/Off - Run smoothing and output both the smoothed and non-smoothed outputs.
# Off - Don't run smoothing.
run_smoothing :  [1]


# Full Width at Half Maximum of the Gaussian kernel used during spatial smoothing.
# Can be a single value or multiple values separated by commas.
# Note that spatial smoothing is run as the last step in the individual-level analysis pipeline, such that all derivatives are output both smoothed and unsmoothed.
fwhm : [4]


# Choose whether to smooth outputs before or after z-scoring.
smoothing_order :  ['Before']


# z-score standardize the derivatives. This is required for group-level analysis.
# On - Run z-scoring and output only the z-scored outputs.
# On/Off - Run z-scoring and output both the z-scored and raw score versions of the outputs.
# Off - Don't run z-scoring.
runZScoring :  [1]

`
