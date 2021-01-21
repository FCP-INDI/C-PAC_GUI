
import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import App from './containers/App'
import HomePage from './containers/HomePage'
import PipelinePage from './containers/PipelinePage'
import DatasetPage from './containers/DatasetPage'
import ExecutionsPage from './containers/ExecutionsPage'
import ExecutionPage from './containers/ExecutionPage'

if (process.env.NODE_ENV === 'production') {
  const GACode = 'UA-19224662-10'
  ReactGA.initialize(GACode, {
    debug: process.env.NODE_ENV !== 'production',
  })
  ReactGA.set({ aip: 1 });
}

export class RouterPage extends Component {

  componentDidUpdate(prevProps) {
    if (process.env.NODE_ENV === 'production' && this.props.location !== prevProps.location) {
      ReactGA.pageview(this.props.location.pathname)
    }
  }

  render() {
    return (
      <App>
        <Switch>
          <Route exact={true} path="/pipelines/:pipeline" component={PipelinePage} />
          <Route exact={true} path="/datasets/:dataset" component={DatasetPage} />
          <Route exact={true} path="/executions/:operation(new)" component={ExecutionsPage} />
          <Route exact={true} path="/executions/:execution([a-z0-9-]+)/:schedule([a-z0-9-]+)?/:operation(logs|crashes)?" component={ExecutionPage} exact />
          <Route exact={true} path="/executions" component={ExecutionsPage} />
          <Route exact={true} path="/" component={HomePage} />
        </Switch>
      </App>
    )
  }
}

export default withRouter(RouterPage)
