import React, { Component } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Modal from '@material-ui/core/Modal'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from 'components/Box'


import {
  BulletIcon,
  SchedulerIcon,
} from 'components/icons'

import {
  watchCancel as cpacpyWatchCancel,
  detect as cpacpyDetect,
} from 'actions/cpacpy'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from 'reducers/cpacpy'
import { fromJS } from 'immutable'


class CpacpySchedulerSelector extends Component {

  static styles = theme => ({
    button: {
      padding: '5px 15px',
      border: `1px solid ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
      boxSizing: 'border-box',
      minWidth: 64,
      padding: '6px 16px',
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
        duration: theme.transitions.duration.short,
      }),

      '&$disabled': {
        border: `1px solid ${theme.palette.action.disabledBackground}`,
        color: theme.palette.action.disabled,
      },
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
        '&$disabled': {
          backgroundColor: 'transparent',
        },
      },
    },
    bullet: {
      fontSize: theme.typography.fontSize,
      marginRight: theme.spacing(),
    },
    detecting: {
      strokeWidth: 0,
      strokeOpacity: 0,
      stroke: '#DDD',
      animation: `$shinebrightlikeadiamond 1s linear infinite`,
    },
    online: {
      color: '#32CD32'
    },
    offline: {
      color: '#CD3232'
    },
    unknown: {
      color: '#666666'
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
    },
    '@keyframes shinebrightlikeadiamond': {
      '0%': { strokeWidth: 0, strokeOpacity: 0 },
      '50%': { strokeWidth: 10, strokeOpacity: 0.5 },
      '100%': { strokeWidth: 0, strokeOpacity: 0 },
    },
  });

  static mapStateToProps = ({ cpacpy: state }, props) => {
    if (!state || !state.get('schedulers')) {
      return {
        schedulers: fromJS([]),
        scheduler: null,
      }
    }

    return {
      schedulers: selectSchedulers()(state),
      scheduler: props.scheduler || selectCurrentScheduler()(state).get('id'),
    }
  }

  static mapDispatchToProps = {
    stop: cpacpyWatchCancel,
    detect: cpacpyDetect,
  }

  state = {
    fullSelector: false,
    selector: false,
    selectorAnchor: null,
  }

  constructor(props) {
    super(props)
    this.state.scheduler = props.scheduler
  }

  toggleSelector = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: !this.state.selector, selectorAnchor: e.target })
  }

  handleClose = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: false })
  }

  handleSelect = (scheduler) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: false, scheduler })
    this.props.detect(scheduler, false)
    this.props.onSelect && this.props.onSelect(scheduler)
  }

  render() {
    const { classes, schedulers, watch, stop, buttonProps, buttonMenuProps, popoverProps } = this.props
    const { selector, selectorAnchor, fullSelector, scheduler: selectedScheduler } = this.state

    if (!schedulers) {
      return null
    }

    const scheduler = schedulers.find((s) => s.get('id') == selectedScheduler)

    return (
      <>
        <Modal
          disableAutoFocus
          disableEnforceFocus
          open={fullSelector}
          onClose={this.toggleSelector}
        >
          <Paper className={classes.paper}>
            <Box
              title="Schedulers"
              avatar={<SchedulerIcon />}
              classes={{
                content: classes.content
              }}
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

        <Popover
          open={selector}
          anchorEl={selectorAnchor}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          {...popoverProps}
        >
          { schedulers.map((s) => (
            <ListItem button key={s.get('id')} onClick={this.handleSelect(s.get('id'))} {...buttonMenuProps}>
              <ListItemIcon>
                <BulletIcon className={clsx(
                  classes.bullet,
                  (scheduler.get('detecting') || scheduler.get('polling')) ? classes.detecting : null,
                  s.get('online') === null ? classes.unknown : (s.get('online') ? classes.online : classes.offline)
                )} />
              </ListItemIcon>
              <ListItemText primary={s.get('name')} />
            </ListItem>
          ))}
        </Popover>

        <ButtonBase component='a' className={classes.button} onClick={this.toggleSelector} {...buttonProps}>
          <BulletIcon className={clsx(
            classes.bullet,
            (scheduler.get('detecting') || scheduler.get('polling')) ? classes.detecting : null,
            scheduler.get('online') === null ? classes.unknown : (scheduler.get('online') ? classes.online : classes.offline)
          )} />
          { scheduler.get('name') }
        </ButtonBase>
      </>
    )
  }
}

export default connect(CpacpySchedulerSelector.mapStateToProps, CpacpySchedulerSelector.mapDispatchToProps)(
  withStyles(CpacpySchedulerSelector.styles)(
    CpacpySchedulerSelector
  )
);
