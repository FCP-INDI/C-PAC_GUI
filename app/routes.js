
import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import ua from 'universal-analytics'

import App from './containers/App'
import HomePage from './containers/HomePage'
// import EnvironmentsPage from './containers/EnvironmentsPage'
// import ProjectsPage from './containers/ProjectsPage'
// import ProjectPage from './containers/ProjectPage'
// import ProjectPipelinesPage from './containers/ProjectPipelinesPage'
// import ProjectPipelinePage from './containers/ProjectPipelinePage'
// import ProjectSubjectsPage from './containers/ProjectSubjectsPage'
// import ProjectRunsPage from './containers/ProjectRunsPage'
import PipelinePage from './containers/PipelinePage'
import DatasetPage from './containers/DatasetPage'

import { projectOpen } from './actions/main'


let cid = localStorage.getItem('ga-cid')
const visitor = ua('UA-XXXX-XX', cid)
if (!cid) {
  localStorage.setItem('ga-cid', visitor.cid)
}

// Anonymize IP
visitor.set("aip", 1)


export class TemplatePage extends Component {

  // openProject() {
  //   const {
  //     main: {
  //       config: {
  //         projects
  //       } = {}
  //     } = {}
  //   } = this.props.store.getState()

  //   if (projects) {
  //     const { history: { location: { pathname } } } = this.props
  //     // if (pathname.startsWith('/projects')) {
  //     //   const pieces = pathname.split('/')
  //     //   if (pieces.length >= 3) {
  //     //     this.props.store.dispatch(projectOpen(pieces[2]))
  //     //   }
  //     // }
  //   }
  // }

  // componentDidMount() {
  //   this.openProject()
  // }

  // componentDidUpdate() {
  //   this.openProject()
  // }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      visitor.pageview({
        dp: this.props.location.pathname,
        aip: 1,
      }).send()
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

export default withRouter(TemplatePage)
