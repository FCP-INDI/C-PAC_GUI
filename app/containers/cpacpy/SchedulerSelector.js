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
import { default as FlexBox } from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'


import {
  BulletIcon,
  SchedulerIcon,
} from 'components/icons'

import { SchedulerBackendChip } from 'components/chips'

import {
  watchCancel as cpacpyWatchCancel,
  detect as cpacpyDetect,
} from 'actions/cpacpy'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from 'reducers/cpacpy'
import { fromJS } from 'immutable'
import { Grid } from '@material-ui/core'


class CpacpySchedulerSelector extends Component {

  static styles = theme => ({
    button: {
      padding: '5px 15px',
      boxSizing: 'border-box',
      minWidth: 64,
      padding: '6px 16px',
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
      transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
        duration: theme.transitions.duration.short,
      }),

      textTransform: 'uppercase',
      fontSize: '0.9rem',
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
    outlined: {
      border: `1px solid ${
        theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
    },
    disabled: {
      border: `1px solid ${theme.palette.action.disabledBackground}`,
      color: theme.palette.action.disabled,
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
    scheduler: {
      margin: theme.spacing(0, 0, 3, 0),
    },
    description: {
      margin: theme.spacing(),
      padding: theme.spacing(1, 1, 0, 1),
    },
    content: {
      overflow: 'auto'
    },
    manage: {
      textAlign: 'center',
      '& .MuiListItemText-root': {
        color: theme.palette.secondary.main,
      },
    },
    actions: {
      padding: `${theme.spacing(0, 1, 1, 1)} !important`,
      '& > *': {
        margin: theme.spacing(),
        marginTop: 0,
        paddingTop: theme.spacing(),
        borderTop: `1px solid ${theme.palette.divider}`,
        '& > *': {
          marginRight: theme.spacing(),
        },
      },
    },
    '@keyframes shinebrightlikeadiamond': {
      '0%': { strokeWidth: 0, strokeOpacity: 1 },
      '80%': { strokeWidth: 6, strokeOpacity: 0 },
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

  toggleFullSelector = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ fullSelector: !this.state.fullSelector })
  }

  handleClose = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: false })
  }

  handleFullClose = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ fullSelector: false })
  }

  handleSelect = (scheduler) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: false, scheduler })
    this.props.detect(scheduler, false)
    this.props.onSelect && this.props.onSelect(scheduler)
  }

  handleManage = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({ selector: false, fullSelector: true })
  }

  render() {
    const { classes, schedulers, watch, stop, buttonProps: { className: buttonClassName, ...buttonProps }, buttonMenuProps, popoverProps } = this.props
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
          onClose={this.handleFullClose}
        >
          <Paper className={classes.paper}>
            <Box
              title="Schedulers"
              avatar={<SchedulerIcon />}
              classes={{
                content: classes.content
              }}
            >
              {
                schedulers.map((s) => (
                  <Paper key={s.get('id')} elevation={3} className={classes.scheduler}>
                    <Grid container spacing={0}>
                      <Grid item xs={12} className={classes.description}>
                        <Grid container xs={12} spacing={0}>
                          <Grid item xs={6}>
                            <Typography>
                              { s.get('name') }
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>
                              {
                                s.get('backends')
                                  .map(
                                    b => 
                                      <SchedulerBackendChip
                                        key={`${s.get('id')}-${b.get('id')}`}
                                        scheduler={s.get('id')}
                                        backend={b.get('id')} />
                                  )
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className={classes.actions}>
                        <FlexBox>
                          <Tooltip title="Check the execution logs">
                            <Button color="secondary" variant="contained">
                              Logs
                            </Button>
                          </Tooltip>
                        </FlexBox>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              }
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
                  (s.get('detecting') || s.get('polling')) ? classes.detecting : null,
                  s.get('online') === null ? classes.unknown : (s.get('online') ? classes.online : classes.offline)
                )} />
              </ListItemIcon>
              <ListItemText primary={s.get('name')} />
            </ListItem>
          ))}

          <ListItem button key="manage" className={classes.manage} onClick={this.handleManage} {...buttonMenuProps}>
            <ListItemText primary={'Manage'} />
          </ListItem>
        </Popover>

        <ButtonBase
          component='a'
          className={clsx(
            classes.button,
            {
              [classes[buttonProps.variant]]: buttonProps.variant,
            },
            buttonClassName,
          )}
          onClick={this.toggleSelector}
          {...buttonProps}
        >
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