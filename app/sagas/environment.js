import { delay } from 'redux-saga'
import { select, put, call, takeEvery, all } from 'redux-saga/effects'
import { ENVIRONMENT_CHECK, ENVIRONMENT_SERVER_CHECK, ENVIRONMENT_SERVER_START,
         environmentTypedCheck, environmentChecked, environmentChecking } from '../actions/main'

const pipeline = `
# Select False if you intend to run CPAC on a single machine.
# If set to True, CPAC will attempt to submit jobs through the job scheduler / resource manager selected below.
runOnGrid :  False

maximumMemoryPerParticipant: 6
numParticipantsAtOnce: 1
maxCoresPerParticipant: 2
numParticipantsAtOnce: 1
num_ants_threads: 2


# Full path to the FSL version to be used by CPAC.
# If you have specified an FSL path in your .bashrc file, this path will be set automatically.
FSLDIR :  /usr/share/fsl/5.0


# Sun Grid Engine (SGE), Portable Batch System (PBS), or Simple Linux Utility for Resource Management (SLURM).
# Only applies if you are running on a grid or compute cluster.
resourceManager :  SGE


# SGE Parallel Environment to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
parallelEnvironment :  mpi_smp


# SGE Queue to use when running CPAC.
# Only applies when you are running on a grid or compute cluster using SGE.
queue :  all.q


# Memory to allocate per subject.
# IMPORTANT: 'Memory Per Subject' multiplied by 'Number of Subjects to Run Simultaneously' must not be more than the total amount of RAM
memoryAllocatedPerSubject :  1


# Number of cores (on a single machine) or slots on a node (cluster/grid) per subject. Slots are cores on a cluster/grid node.
# IMPORTANT: 'Number of Cores Per Subject' multiplied by 'Number of Subjects to Run Simultaneously' multiplied by 'Number of Cores for Anatomical Registration (ANTS only)' must not be greater than the total number of cores.
numCoresPerSubject :  1


# This number depends on computing resources.
# IMPORTANT: 'Number of Cores Per Subject' multiplied by 'Number of Subjects to Run Simultaneously' multiplied by 'Number of Cores for Anatomical Registration (ANTS only)' must not be greater than the total number of cores.
numSubjectsAtOnce :  1


# This number depends on computing resources.
# IMPORTANT: 'Number of Cores Per Subject' multiplied by 'Number of Subjects to Run Simultaneously' multiplied by 'Number of Cores for Anatomical Registration (ANTS only)' must not be greater than the total number of cores.
num_ants_threads :  2


# Name for this pipeline configuration - useful for identification.
pipelineName :  analysis


# Directory where CPAC should store temporary and intermediate files.
workingDirectory :  /tmp


# Directory where CPAC should write crash logs.
crashLogDirectory :  /tmp


# Directory where CPAC should place run logs.
logDirectory :  /tmp


# Directory where CPAC should place processed data.
outputDirectory : /output


# If setting the 'Output Directory' to an S3 bucket, insert the path to your AWS credentials file here.
awsOutputBucketCredentials :


# Enable server-side 256-AES encryption on data to the S3 bucket
s3Encryption :  [0]


# Create a user-friendly, well organized version of the output directory.
# We recommend all users enable this option.
runSymbolicLinks :  [0]


# Generate quality control pages containing preprocessing and derivative outputs.
generateQualityControlImages :  [0]


# Deletes the contents of the Working Directory after running.
# This saves disk space, but any additional preprocessing or analysis will have to be completely re-run.
removeWorkingDir :  True


# Uses the contents of the Working Directory to regenerate all outputs and their symbolic links.
# Requires an intact Working Directory from a previous CPAC run.
reGenerateOutputs :  False


# The resolution to which anatomical images should be transformed during registration.
# This is the resolution at which processed anatomical files will be output.
resolution_for_anat :  2mm


# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
template_brain_only_for_anat :  /usr/share/fsl/5.0/data/standard/MNI152_T1_$\{resolution_for_anat\}_brain.nii.gz


# Template to be used during registration.
# It is not necessary to change this path unless you intend to use a non-standard template.
template_skull_for_anat :  /usr/share/fsl/5.0/data/standard/MNI152_T1_$\{resolution_for_anat\}.nii.gz


# Use either ANTS or FSL (FLIRT and FNIRT) as your anatomical registration method.
regOption :  ['FSL']


# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
fnirtConfig :  T1_2_MNI152_2mm


# Configuration file to be used by FSL to set FNIRT parameters.
# It is not necessary to change this path unless you intend to use custom FNIRT parameters or a non-standard template.
ref_mask :  /usr/share/fsl/5.0/data/standard/MNI152_T1_$\{resolution_for_anat\}_brain_mask_symmetric_dil.nii.gz


# Register skull-on anatomical image to a template.
regWithSkull :  [1]


# Disables skull-stripping on the anatomical inputs if they are already skull-stripped
# outside of C-PAC. Set this to On if your input images are already skull-stripped.
already_skullstripped :  [0]


# Automatically segment anatomical images into white matter, gray matter, and
# CSF based on prior probability maps.
runSegmentationPreprocessing :  [1]


# Full path to a directory containing binarized prior probability maps.
# These maps are included as part of the 'Image Resource Files' package
# available on the Install page of the User Guide. It is not necessary
# to change this path unless you intend to use non-standard priors.
priors_path :  /usr/share/fsl/5.0/data/standard/tissuepriors/2mm


# Full path to a binarized White Matter prior probability map.
# It is not necessary to change this path unless you intend to use
# non-standard priors.
PRIORS_WHITE :  $priors_path/avg152T1_white_bin.nii.gz


# Full path to a binarized Gray Matter prior probability map.
# It is not necessary to change this path unless you intend to use
# non-standard priors.
PRIORS_GRAY :  $priors_path/avg152T1_gray_bin.nii.gz


# Full path to a binarized CSF prior probability map.
# It is not necessary to change this path unless you intend to
# use non-standard priors.
PRIORS_CSF :  $priors_path/avg152T1_csf_bin.nii.gz


# First timepoint to include in analysis.
# Default is 0 (beginning of timeseries).
startIdx :  4


# Last timepoint to include in analysis.
# Default is None or End (end of timeseries).
stopIdx :  None


# Specify the TR at which images were acquired.
# Default is None (TR information is read from image file header)
TR :  None

# Interpolate voxel time courses so they are sampled at the same time points.
slice_timing_correction :  [1]

# Acquisition strategy for acquiring image slices.
slice_timing_pattern :  ['Use NIFTI Header']

# Run Functional to Anatomical Registration
runRegisterFuncToAnat :  [1]

# Run Functional to Anatomical Registration with BB Register
runBBReg :  [1]

# Standard FSL 5.0 Scheduler used for Boundary Based Registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
boundaryBasedRegistrationSchedule :  /usr/share/fsl/5.0/etc/flirtsch/bbr.sch


# Choose whether to use the mean of the functional/EPI as the input to
# functional-to-anatomical registration or one of the volumes from the
# functional 4D timeseries that you choose.
func_reg_input :  ['Mean Functional']


# Only for when 'Use as Functional-to-Anatomical Registration Input' is
# set to 'Selected Functional Volume'. Input the index of which volume
# from the functional 4D timeseries input file you wish to use as the
# input for functional-to-anatomical registration.
func_reg_input_volume :  0


# Choose which tool to be used in functional masking - AFNI 3dAutoMask or FSL BET.
functionalMasking :  ['3dAutoMask']


# Register functional images to a standard MNI152 template.
# This option must be enabled if you wish to calculate any derivatives.
runRegisterFuncToMNI :  [1]


# The resolution (in mm) to which functional images are transformed during registration
resolution_for_func_preproc :  3mm

# The resolutions to resample the normalized functional timeseries to
resolution_for_func_derivative :  3mm


# Standard FSL Skull Stripped Template. Used as a reference image for functional registration
template_brain_only_for_func :  /usr/share/fsl/5.0/data/standard/MNI152_T1_$\{resolution_for_func_preproc\}_brain.nii.gz


# Standard FSL Anatomical Brain Image with Skull
template_skull_for_func :  /usr/share/fsl/5.0/data/standard/MNI152_T1_$\{resolution_for_func_preproc\}.nii.gz


# Matrix containing all 1's. Used as an identity matrix during registration.
# It is not necessary to change this path unless you intend to use non-standard MNI registration.
identityMatrix :  /usr/share/fsl/5.0/etc/flirtsch/ident.mat


# Resample the normalized functional timeseries to a resolution of your choice.
resample_ts :  [1]


# The resolutions to resample the normalized functional timeseries to, if you have selected to do so. Click the green + to input resolutions (in mm).
resample_ts_resolution : [3.0]


# Run Nuisance Signal Regression
runNuisance :  [1]


runEPI_DistCorr :  [0]

# Standard Lateral Ventricles Binary Mask
lateral_ventricles_mask :  /usr/share/fsl/5.0/data/atlases/HarvardOxford/HarvardOxford-lateral-ventricles-thr25-2mm.nii.gz


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
Regressors :
  -  compcor :  1
     wm :  0
     csf :  1
     global :  0
     pc1 :  0
     motion :  1
     linear :  1
     quadratic :  1
     gm :  0


# Number of Principle Components to calculate when running CompCor. We recommend 5 or 6.
nComponents : [5]


# Use the Friston 24-Parameter Model during volume realignment.
# If this option is turned off, only 6 parameters will be used.
# These parameters will also be output as a spreadsheet.
runFristonModel :  [1]


# Correct for the global signal using Median Angle Correction.
runMedianAngleCorrection :  [0]


# Target angle used during Median Angle Correction.
targetAngleDeg : [90]


# Apply a temporal band-pass filter to functional data.
runFrequencyFiltering :  [1]


# Define one or more band-pass filters by clicking the + button.
nuisanceBandpassFreq : [[0.01, 0.1]]


# Remove volumes exhibiting excessive motion.
runScrubbing :  [0]


# Specify the maximum acceptable Framewise Displacement (FD) in millimeters.
# Any volume exhibiting FD greater than this value will be removed.
scrubbingThreshold : [0.2]


# Number of volumes to remove preceeding a volume with excessive FD.
numRemovePrecedingFrames :  1


# Number of volumes to remove subsequent to a volume with excessive FD.
numRemoveSubsequentFrames :  2

# Motion Spike De-Noising. Remove or regress out volumes exhibiting
# excessive motion.
# Options: ['Off'], ['De-Spiking'], or ['Scrubbing']
runMotionSpike :  ['Off']


# (Motion Spike De-Noising only) Choose which Framewise Displacement (FD)
# calculation to apply the threshold to during de-spiking or scrubbing.
# Options: ['Jenkinson'] or ['Power']
fdCalc: ['Jenkinson']


# (Motion Spike De-Noising only) Specify the maximum acceptable Framewise
# Displacement (FD) in millimeters or in percentage (with a %). Any volume
# exhibiting FD greater than the value (or within the top percentage of the
# percent value, if given) will be regressed out or scrubbed.
# Options: float value like [0.2] or [1.5], or a percent ['5%'] or ['10%']
spikeThreshold : [0.5]

# Extract the average time series of one or more ROIs/seeds. Must be enabled if you wish to run Seed-based Correlation Analysis.
runROITimeseries :  [1]


# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'Voxel', 'SpatialReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and SpatialReg, you would enter: '/path/to/ROI.nii.gz': Avg, SpatialReg
tsa_roi_paths:
  - /cpac_resources/cpac_templates/ez_mask_pad.nii.gz: Avg
    /cpac_resources/cpac_templates/rois_3mm.nii.gz: Avg
    /cpac_resources/cpac_templates/aal_mask_pad.nii.gz: Avg
    /cpac_resources/cpac_templates/tt_mask_pad.nii.gz: Avg
    /cpac_resources/cpac_templates/PNAS_Smith09_rsn10.nii.gz: SpatialReg
    /cpac_resources/cpac_templates/CC200.nii.gz: Avg
    /cpac_resources/cpac_templates/CC400.nii.gz: Avg
    /cpac_resources/cpac_templates/ho_mask_pad.nii.gz: Avg



# By default, extracted time series are written as both a text file and a 1D file. Additional output formats are as a .csv spreadsheet or a Numpy array.
roiTSOutputs :  [True, True]


# For each extracted ROI Average time series, CPAC will generate a whole-brain correlation map.
# It should be noted that for a given seed/ROI, SCA maps for ROI Average time series will be the same.
runSCA :  [0]


# Enter paths to region-of-interest (ROI) NIFTI files (.nii or .nii.gz) to be used for time-series extraction, and then select which types of analyses to run.
# Available analyses: ['Avg', 'DualReg', 'MultReg'].
# Denote which analyses to run for each ROI path by listing the names above. For example, if you wish to run Avg and MultReg, you would enter: '/path/to/ROI.nii.gz': Avg, MultReg
sca_roi_paths:
  - /cpac_resources/cpac_templates/PNAS_Smith09_rsn10.nii.gz: DualReg
    /cpac_resources/cpac_templates/rois_3mm.nii.gz: Avg, MultReg



# Normalize each time series before running Dual Regression SCA.
mrsNorm :  True


# Calculate Voxel-mirrored Homotopic Connectivity (VMHC) for all voxels.
runVMHC :  [0]


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
template_symmetric_brain_only :  $FSLDIR/data/standard/MNI152_T1_$\{resolution_for_anat\}_brain_symmetric.nii.gz


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
template_symmetric_skull :  $FSLDIR/data/standard/MNI152_T1_$\{resolution_for_anat\}_symmetric.nii.gz


# Included as part of the 'Image Resource Files' package available on the Install page of the User Guide.
# It is not necessary to change this path unless you intend to use a non-standard symmetric template.
dilated_symmetric_brain_mask :  $FSLDIR/data/standard/MNI152_T1_$\{resolution_for_anat\}_brain_mask_symmetric_dil.nii.gz


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
templateSpecificationFile :  /cpac_resources/cpac_templates/Mask_ABIDE_85Percent_GM.nii.gz


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
eigWeightOptions :  [False, True]


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
lfcdCorrelationThresholdOption :  ['Correlation threshold']


# Based on the Threshold Type selected above, enter a Threshold Value.
# P-value for Significance Threshold
# Sparsity value for Sparsity Threshold
# Pearson's r value for Correlation Threshold
lfcdCorrelationThreshold :  0.6


# Maximum amount of RAM (in GB) to be used when calculating Degree Centrality.
# Calculating Eigenvector Centrality will require additional memory based on the size of the mask or number of ROI nodes.
memoryAllocatedForDegreeCentrality :  1.0


# Full Width at Half Maximum of the Gaussian kernel used during spatial smoothing.
# Can be a single value or multiple values separated by commas.
# Note that spatial smoothing is run as the last step in the individual-level analysis pipeline, such that all derivatives are output both smoothed and unsmoothed.
fwhm : [6]


# Decides format of outputs. Off will produce non-z-scored outputs, On will produce z-scores of outputs and non-z-scored outputs.
runZScoring :  [0]


# This number depends on computing resources.
numGPAModelsAtOnce :  1


# Use the + to add FSL model configuration to be run.
modelConfigs :  []

disable_log : False
`

function* loadEnvironment (action) {
  yield put(environmentChecking(action))
  const { environment: id } = action
  const environments = yield select((s) => s.main.config.environments);
  if (environments[id]) {
    const environment = environments[id]
    yield put(environmentChecked({
      [id]: {
        ...environment,
        status: undefined
      }
    }))
    yield put(environmentTypedCheck(id, environment.type))
  }
}

function* checkServer (action) {
  const { environment: id } = action
  const environments = yield select((s) => s.main.config.environments);
  if (environments[id]) {
    const environment = environments[id]
    try {
      if (environment.runtime) {
        const { host, port } = environment.runtime
        const check = yield call(fetch, 'http://' + host + ':' + port + '/healthz')

        if (check.ok) {
          yield put(environmentChecked({
            [id]: {
              ...environment,
              status: {
                mode: 'ONLINE'
              }
            }
          }))
          return
        }
      }
    } catch (error) {
    }

    yield put(environmentChecked({
      [id]: {
        ...environment,
        status: {
          mode: 'OFFLINE'
        }
      }
    }))
  }
}

function* start (action) {
  const { environment: id } = action
  const environments = yield select((s) => s.main.config.environments);
  if (environments[id]) {
    const environment = environments[id]
    try {
      if (environment.runtime) {
        const { host, port } = environment.runtime
        const url = 'http://' + host + ':' + port + '/jobs/test'
        const check = yield call(fetch, url, {
          method: 'POST',
          body:    JSON.stringify({ pipeline }),
          headers: { 'Content-Type': 'application/json' },
        })

        return
      }
    } catch (error) {
    }

    yield put(environmentChecked({
      [id]: {
        ...environment,
        status: {
          mode: 'OFFLINE'
        }
      }
    }))
  }
}

function* environmentSaga () {
  yield all([
    takeEvery(ENVIRONMENT_CHECK, loadEnvironment),
    takeEvery(ENVIRONMENT_SERVER_CHECK, checkServer),
    takeEvery(ENVIRONMENT_SERVER_START, start)
  ])
}

export default environmentSaga
