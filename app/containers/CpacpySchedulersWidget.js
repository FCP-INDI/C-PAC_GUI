import React, { Component } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Box from 'components/Box'


import {
  BulletIcon,
  SchedulerIcon,
} from 'components/icons'

import {
  watchCancel as cpacpyWatchCancel,
} from '../actions/cpacpy'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from '../reducers/cpacpy'


class CpacpySchedulersWidget extends Component {

  static styles = theme => ({
    bullet: {
      fontSize: theme.typography.fontSize,
      marginRight: theme.spacing(),
    },
    online: {
      color: '#32CD32'
    },
    offline: {
      color: '#CD3232'
    },
    paper: {
      position: 'absolute',
      width: '80vw',
      height: '80vh',
      padding: theme.spacing(1),
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      display: 'flex',
      '& > *': {
        flexGrow: 1,
      }
    },
    content: {
      overflow: 'auto'
    }
  });

  state = {
    selector: false,
  }

  toggleSelector = () => {
    this.setState({ selector: !this.state.selector })
  }

  render() {
    const { classes, schedulers, scheduler, watch, stop } = this.props
    const { selector } = this.state

    return (
      <>
        <Modal
          disableAutoFocus
          disableEnforceFocus
          open={selector}
          onClose={this.toggleSelector}
        >
          <Paper className={classes.paper}>
            <Box
              title="Schedulers"
              avatar={<SchedulerIcon />}
              classes={{
                content: classes.content
              }}
                // tools={<PipelineListTools />}
                // className={classes.expand}
            >
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
              <p>Hello!</p>
            </Box>
          </Paper>
        </Modal>
        <Button onClick={() => this.toggleSelector()}>
          <BulletIcon className={clsx(
            classes.bullet,
            scheduler.get('online') ? classes.online : classes.offline
          )} />
          { scheduler.get('name') }
        </Button>
      </>
    )
  }
}

const mapStateToProps = ({ cpacpy: state }, props) => {
  if (!state || !state.get('schedulers')) {
    return {
      dataset: null
    }
  }

  return {
    schedulers: selectSchedulers()(state),
    scheduler: selectCurrentScheduler()(state),
  }
}

const mapDispatchToProps = {
  stop: cpacpyWatchCancel
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(CpacpySchedulersWidget.styles)(
    CpacpySchedulersWidget
  )
);
