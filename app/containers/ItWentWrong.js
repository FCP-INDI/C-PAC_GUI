import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'

import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from 'components/Tooltip'

import Box from 'components/Box'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
        <Grid item md={12} sm={12} className={classes.cell}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(ItWentWrong.styles)(ItWentWrong)))
