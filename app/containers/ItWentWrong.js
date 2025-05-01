import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@mui/styles'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import Box from 'components/Box'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import {
  HelpIcon,
} from 'components/icons'

class ItWentWrong extends Component {

  static styles = theme => ({
    cell: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    expand: {
      flexGrow: 1
    }
  })

  state = {
    cleanApp: false,
  }

  handleCleanApp = () => {
    this.setState({ cleanApp: true })
  }

  handleCleanAppClose = () => {
    this.setState({ cleanApp: false })
  }

  handleCleanAppForReal = () => {
    localStorage.clear()
    window.location.href = '/'
  }


  render() {
    const { classes, projects, pipelines, datasets } = this.props

    return (
      <Grid container>
        <Grid size={{ sm: 12, md: 12 }} className={classes.cell}>
          <Box title="Something went wrong!"
               avatar={<HelpIcon />}
               className={classes.expand}>
            <Typography paragraph>
              This page didn't load correctly. We've been notified about the error. Go back to the <Link to={`/`}>home page</Link> or try to <Link to={''} onClick={this.handleCleanApp}>clean your application data</Link>.
            </Typography>
          </Box>
          <Dialog
            open={this.state.cleanApp}
            onClose={this.handleCleanAppClose}
          >
            <DialogTitle>{"Are you sure you want to wipe your application data?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                By cleaning your application data, the app will erase your pipelines and data configs that are not saved into YAML files.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCleanAppForReal} color="primary" autoFocus>
                Erase it!
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ItWentWrong.styles)(ItWentWrong))
