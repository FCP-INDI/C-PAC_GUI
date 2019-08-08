import React, { Component } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx'

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'

import {
  BulletIcon
} from 'components/icons'

import {
  watchCancel as theodoreWatchCancel,
} from '../actions/theodore'


class TheodoreSchedulersWidget extends Component {

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
      <Button onClick={() => stop() }>
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

const mapStateToProps = ({ theodore }) => ({
  watch: theodore.get('watch'),
  schedulers: theodore.get('schedulers'),
  scheduler: theodore.getIn(['schedulers', theodore.get('scheduler')]),
})

const mapDispatchToProps = {
  stop: theodoreWatchCancel
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(TheodoreSchedulersWidget.styles)(
    TheodoreSchedulersWidget
  )
);
