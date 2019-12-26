
import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

import App from './containers/App'
import HomePage from './containers/HomePage'
// import EnvironmentsPage from './containers/EnvironmentsPage'
import PipelinePage from './containers/PipelinePage'
import DatasetPage from './containers/DatasetPage'

if (process.env.NODE_ENV === 'production') {
  const GACode = 'UA-19224662-10'
  ReactGA.initialize(GACode, {
    debug: process.env.NODE_ENV !== 'production',
  })
  ReactGA.set({ aip: 1 });
}

export class RouterPage extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      ReactGA.pageview(this.props.location.pathname)
    }
  }

  render() {
    return (
      <App>
        <Switch>
          {/* <Route exact={true} path="/projects/:project/subjects" component={ProjectSubjectsPage} />
          <Route exact={true} path="/projects/:project/pipelines/:pipeline" component={ProjectPipelinePage} />
          <Route exact={true} path="/projects/:project/pipelines" component={ProjectPipelinesPage} />
          <Route exact={true} path="/projects/:project/runs" component={ProjectRunsPage} />
          <Route exact={true} path="/projects/:project" component={ProjectPage} />
          <Route exact={true} path="/projects" component={ProjectsPage} />
          <Route exact={true} path="/environments" component={EnvironmentsPage} /> */}
          <Route exact={true} path="/pipelines/:pipeline" component={PipelinePage} />
          {/* <Route exact={true} path="/datasets/:dataset" component={DatasetPage} /> */}
          {/* <Route exact={true} path="/pipelines" component={PipelinesPage} /> */}
          <Route exact={true} path="/" component={HomePage} />
        </Switch>
      </App>
    )
  }
}

export default withRouter(RouterPage)
