import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  selectSchedulers,
  selectCurrentScheduler,
} from '../../reducers/cpacpy'

import Tooltip from 'components/Tooltip'

const currentSchedulerAction = (
  WrappedComponent, { tooltip='The current scheduler is offline.' }={}
) => {

  class HOC extends Component {

    static mapStateToProps = (state, props) => ({
      schedulers: selectSchedulers()(state.cpacpy),
      scheduler: selectCurrentScheduler()(state.cpacpy),
    })

    static mapDispatchToProps = {
    }

    render() {
      const { schedulers, scheduler, ...props } = this.props
      const disabled = !scheduler || !scheduler.get('online')
      const component = <WrappedComponent {...props} disabled={disabled} />

      if (!tooltip || !disabled) {
        return component
      }

      return (
        <Tooltip title={tooltip}><span>{ component }</span></Tooltip>
      );
    }
  }

  const connectedHOC =
    connect(HOC.mapStateToProps, HOC.mapDispatchToProps)
      (HOC)

  return connectedHOC;
}

export default currentSchedulerAction