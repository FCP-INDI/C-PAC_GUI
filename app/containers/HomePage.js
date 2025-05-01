import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@mui/styles'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'

// import GroupAnalysisList from 'containers/GroupAnalysisList'

import PipelineList from 'containers/PipelineList'
import PipelineListTools from 'containers/PipelineListTools.platform'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import Box from 'components/Box'

import {
  PipelineIcon,
  GroupIcon,
  RunIcon,
  HelpIcon,
} from 'components/icons'

class HomePage extends Component {

  static styles = theme => ({
    title: {
      marginBottom: 10
    },
    paper: {
      margin: 0,
      padding: 20,
      flexGrow: 1,
    },
    cell: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    expand: {
      flexGrow: 1
    }
  })

  render() {
    const { classes, pipelines } = this.props

    return (
      <Grid container>
        <Grid size={{ sm: 12, md: 8 }} className={classes.cell}>
          <Box title="Pipelines"
              avatar={<PipelineIcon />}
              tools={<PipelineListTools />}
              className={classes.expand}>
            <PipelineList />
          </Box>
        </Grid>
        <Grid size={{ sm: 12, md: 4 }} className={classes.cell}>
          <Box title="About C-PAC"
               avatar={<HelpIcon />}
               className={classes.expand}>
            <Typography paragraph>
              The Configurable Pipeline for the Analysis of Connectomes (C-PAC) is an
              open-source software pipeline for automated preprocessing and analysis
              of resting-state fMRI data.
            </Typography>
            <Typography paragraph>
              C-PAC builds upon a robust set of existing
              software packages including AFNI, FSL, and ANTS, and makes it easy for
              both novice users and experts to explore their data using a wide array
              of analytic tools.
            </Typography>
            <Typography paragraph>
              Users define analysis pipelines by specifying a
              combination of preprocessing options and analyses to be run on an
              arbitrary number of subjects. Results can then be compared across
              groups using the integrated group statistics feature.
            </Typography>
          </Box>
        </Grid>
        {/* <Grid item md={8} sm={12} className={classes.cell}>
          <Box title="Group Analyses"
              avatar={<GroupIcon />}
              tools={<PipelineListTools />}
              className={classes.expand}>
            <GroupAnalysisList />
          </Box>
        </Grid> */}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(HomePage.styles)(HomePage))
