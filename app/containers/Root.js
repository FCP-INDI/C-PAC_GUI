import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from '../routes'


export default class Root extends Component {
  render() {
    return (
      <ReduxProvider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes store={this.props.store} history={this.props.history} />
        </ConnectedRouter>
      </ReduxProvider>
    )
  }
}
