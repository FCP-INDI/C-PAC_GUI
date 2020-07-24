import React, { Component } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx'

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'

import {
  BulletIcon
} from 'components/icons'

import {
  watchCancel as cpacpyWatchCancel,
} from '../actions/cpacpy'


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
  });

  render() {
    const { classes, schedulers, scheduler, watch, stop } = this.props;

    return (
      <Button onClick={() => stop(scheduler.get('address')) }>
        <BulletIcon className={clsx(
          classes.bullet,
          scheduler.get('online') ? classes.online : classes.offline
        )} />
        { scheduler.get('name') } { watch }
      </Button>
    )

    return (null);
  }
}

const mapStateToProps = ({ cpacpy }) => ({
  watch: cpacpy.get('watch'),
  schedulers: cpacpy.get('schedulers'),
  scheduler: cpacpy.getIn(['schedulers', cpacpy.get('scheduler')]),
})

const mapDispatchToProps = {
  stop: cpacpyWatchCancel
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(CpacpySchedulersWidget.styles)(
    CpacpySchedulersWidget
  )
);
