import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';

import Help from 'components/Help'
import FormControlLabelled from 'components/FormControlLabelled'


class GeneralPage extends Component {

  static styles = theme => ({
    sectionTitle: {
      paddingTop: 6,
      paddingLeft: 6,
    },
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <React.Fragment>
        <Accordion expanded>
          <AccordionSummary disabled>
            <Typography variant="h6" className={classes.sectionTitle}>
              Execution
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Help
                  type="pipeline"
                  regex={/^maximumMemoryPerParticipant/}
                  help={`The maximum amount of memory each participant's workflow can allocate. Use this to place an upper bound of memory usage. Warning: 'Memory Per Participant' multiplied by 'Number of Participants to Run Simultaneously' must not be more than the total amount of RAM. Conversely, using too little RAM can impede the speed of a pipeline run. It is recommended that you set this to a value that when multiplied by 'Number of Participants to Run Simultaneously' is as much RAM you can safely allocate.`}
                  fullWidth
                >
                  <TextField
                    label="Maximum Memory per Participant (GB)" fullWidth margin="normal" variant="outlined"
                    name="general.environment.memory"
                    value={configuration.getIn(['general', 'environment', 'memory'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^maxCoresPerParticipant/}
                  help={`The maximum amount of cores (on a single machine) or slots on a node (on a cluster/grid) to allocate per participant. Setting this above 1 will parallelize each participant's workflow where possible. If you wish to dedicate multiple cores to ANTS-based anatomical registration (below), this value must be equal or higher than the amount of cores provided to ANTS. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of participants set to run in parallel (the 'Number of Participants to Run Simultaneously' setting).`}
                  fullWidth
                >
                  <TextField
                    label="Maximum Cores per Participant" fullWidth margin="normal" variant="outlined"
                    name="general.environment.cores"
                    value={configuration.getIn(['general', 'environment', 'cores'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^numParticipantsAtOnce/}
                  help={`The number of participant workflows to run at the same time. The maximum number of cores your run can possibly employ will be this setting multiplied by the number of cores dedicated to each participant (the 'Maximum Number of Cores Per Participant' setting).`}
                  fullWidth
                >
                  <TextField
                    label="Number of Participants to Run Simultaneously" fullWidth margin="normal" variant="outlined"
                    name="general.environment.participants"
                    value={configuration.getIn(['general', 'environment', 'participants'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^num_ants_threads/}
                  help={`The number of cores to allocate to ANTS-based anatomical registration per participant. Multiple cores can greatly speed up this preprocessing step. This number cannot be greater than the number of cores per participant.`}
                  fullWidth
                >
                  <TextField
                    label="Number of Cores for Anatomical Registration (ANTS only)" fullWidth margin="normal" variant="outlined"
                    name="general.environment.ants_threads"
                    value={configuration.getIn(['general', 'environment', 'ants_threads'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^FSLDIR/}
                  help={`Full path to the FSL version to be used by CPAC. If you have specified an FSL path in your .bashrc file, this path will be set automatically.`}
                  fullWidth
                >
                  <TextField
                    label="FSL directory" fullWidth margin="normal" variant="outlined"
                    name="general.environment.paths.fsl"
                    value={configuration.getIn(['general', 'environment', 'paths', 'fsl'])}
                    onChange={onChange}
                  />
                </Help>
                <FormGroup row>
                  <Help
                    type="pipeline"
                    regex={/^runOnGrid/}
                    help={`Select False if you intend to run CPAC on a single machine.`}
                  >
                    <FormControlLabelled label="Run CPAC on a Cluster/Grid">
                      <Switch
                        name="general.environment.grid"
                        checked={configuration.getIn(['general', 'environment', 'grid'])}
                        onChange={onChange}
                        color="primary"
                      />
                    </FormControlLabelled>
                  </Help>
                </FormGroup>

                <Help
                  type="pipeline"
                  regex={/^resourceManager/}
                  help={`SGE, PBS, or SLURM. Only applies if you are running on a grid or compute cluster.`}
                  fullWidth
                >
                  <TextField
                    select
                    label="Resource Manager"
                    fullWidth margin="normal" variant="outlined"
                    className={classes.textField} onChange={onChange}
                    name="general.environment.resource"
                    value={configuration.getIn(['general', 'environment', 'resource'])}
                    helperText=''
                  >
                    <MenuItem value={"SGE"}>Sun Grid Engine (SGE)</MenuItem>
                    <MenuItem value={"PBS"}>Portable Batch System (PBS)</MenuItem>
                    <MenuItem value={"SLURM"}>SLURM</MenuItem>
                  </TextField>
                </Help>

                <Help
                  type="pipeline"
                  regex={/^parallelEnvironment/}
                  help={`Only applies when you are running on a grid or compute cluster using SGE. `}
                  fullWidth
                >
                  <TextField
                    label="SGE Parallel Environment" fullWidth margin="normal" variant="outlined"
                    name="general.environment.SGEenvironment"
                    value={configuration.getIn(['general', 'environment', 'SGEenvironment'])}
                    onChange={onChange}
                  />
                </Help>

                <Help
                  type="pipeline"
                  regex={/^queue/}
                  help={`Only applies when you are running on a grid or compute cluster using SGE.`}
                  fullWidth
                >
                  <TextField
                    label="SGE Queue" fullWidth margin="normal" variant="outlined"
                    name="general.environment.queue"
                    value={configuration.getIn(['general', 'environment', 'queue'])}
                    onChange={onChange}
                  />
                </Help>

              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded>
          <AccordionSummary disabled>
            <Typography variant="h6" className={classes.sectionTitle}>
              Outputs
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <Help
                  type="pipeline"
                  regex={/^workingDirectory/}
                  help={`Directory where CPAC should store temporary and intermediate files.`}
                  fullWidth
                >
                  <TextField
                    label="Working directory" fullWidth margin="normal" variant="outlined"
                    name="general.environment.paths.working"
                    value={configuration.getIn(['general', 'environment', 'paths', 'working'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^outputDirectory/}
                  help={`Directory where CPAC should place processed data.`}
                  fullWidth
                >
                  <TextField
                    label="Output directory" fullWidth margin="normal" variant="outlined"
                    name="general.environment.paths.output"
                    value={configuration.getIn(['general', 'environment', 'paths', 'output'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^logDirectory/}
                  help={`Directory where CPAC should place run logs.`}
                  fullWidth
                >
                  <TextField
                    label="Log directory" fullWidth margin="normal" variant="outlined"
                    name="general.environment.paths.log"
                    value={configuration.getIn(['general', 'environment', 'paths', 'log'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^crashLogDirectory/}
                  help={`Directory where CPAC should write crash logs.`}
                  fullWidth
                >
                  <TextField
                    label="Crash log directory" fullWidth margin="normal" variant="outlined"
                    name="general.environment.paths.crash"
                    value={configuration.getIn(['general', 'environment', 'paths', 'crash'])}
                    onChange={onChange}
                  />
                </Help>
                <Help
                  type="pipeline"
                  regex={/^awsOutputBucketCredentials/}
                  help={`If setting the 'Output Directory' to an S3 bucket, insert the path to your AWS credentials file here.`}
                  fullWidth
                >
                  <TextField
                    label="AWS Output Bucket Credentials (optional)" fullWidth margin="normal" variant="outlined"
                    name="general.environment.outputs.aws"
                    value={configuration.getIn(['general', 'environment', 'outputs', 'aws'])}
                    onChange={onChange}
                  />
                </Help>
                <FormControl fullWidth>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^s3Encryption/}
                      help={`Enable server-side 256-AES encryption on data to the S3 bucket.`}
                    >
                      <FormControlLabelled label="S3 Encryption">
                        <Switch
                          name="general.environment.outputs.s3"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 's3'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>

                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^write_func_outputs/}
                      help={`Include extra versions and intermediate steps of functional preprocessing in the output directory.`}
                    >
                      <FormControlLabelled label="Write extra functional outputs">
                        <Switch
                          name="general.environment.outputs.extra"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'extra'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>

                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^write_debugging_outputs/}
                      help={`Include extra outputs in the output directory that may be of interest when more information is needed.`}
                    >
                      <FormControlLabelled label="Write debugging outputs">
                        <Switch
                          name="general.environment.outputs.debug"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'debug'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^run_logging/}
                      help={`Whether to write log details of the pipeline. run to the logging files.`}
                    >
                      <FormControlLabelled label="Enable logging">
                        <Switch
                          name="general.environment.outputs.logging"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'logging'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^removeWorkingDir/}
                      help={`Deletes the contents of the Working Directory after running. This saves disk space, but any additional preprocessing or analysis will have to be completely re-run.`}
                    >
                      <FormControlLabelled label="Remove working directory">
                        <Switch
                          name="general.environment.outputs.remove_working"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'remove_working'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^runSymbolicLinks/}
                      help={`Create a user-friendly, well organized version of the output directory.`}
                    >
                      <FormControlLabelled label="Create organized output directory">
                        <Switch
                          name="general.environment.outputs.organized"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'organized'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^reGenerateOutputs/}
                      help={`Uses the contents of the Working Directory to regenerate all outputs and their symbolic links. Requires an intact Working Directory from a previous CPAC run.`}
                    >
                      <FormControlLabelled label="Regenerate outputs">
                        <Switch
                          name="general.environment.outputs.regenerate"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'regenerate'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                  <FormGroup row>
                    <Help
                      type="pipeline"
                      regex={/^generateQualityControlImages/}
                      help={`Generate quality control pages containing preprocessing and derivative outputs.`}
                    >
                      <FormControlLabelled label="Enable quality control interface">
                        <Switch
                          name="general.environment.outputs.quality_control"
                          checked={configuration.getIn(['general', 'environment', 'outputs', 'quality_control'])}
                          onChange={onChange}
                          color="primary"
                        />
                      </FormControlLabelled>
                    </Help>
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    )
  }
}

export default withStyles(GeneralPage.styles)(GeneralPage);
