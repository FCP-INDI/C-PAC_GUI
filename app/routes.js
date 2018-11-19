import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
// import EnvironmentsPage from './containers/EnvironmentsPage';
// import ProjectsPage from './containers/ProjectsPage';
// import ProjectPage from './containers/ProjectPage';
// import ProjectPipelinesPage from './containers/ProjectPipelinesPage';
// import ProjectPipelinePage from './containers/ProjectPipelinePage';
// import ProjectSubjectsPage from './containers/ProjectSubjectsPage';
// import ProjectRunsPage from './containers/ProjectRunsPage';
import PipelinePage from './containers/PipelinePage';
import DatasetPage from './containers/DatasetPage';

import { projectOpen } from './actions/main';

export default class TemplatePage extends Component {

  openProject() {
    const {
      main: {
        config: {
          projects
        } = {}
      } = {}
    } = this.props.store.getState()

    if (projects) {
      const { history: { location: { pathname } } } = this.props
      if (pathname.startsWith('/projects')) {
        const pieces = pathname.split('/')
        if (pieces.length >= 3) {
          this.props.store.dispatch(projectOpen(pieces[2]))
        }
      }
    }
  }

  componentDidMount() {
    this.openProject()
  }

  componentDidUpdate() {
    this.openProject()
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
          <Route exact={true} path="/datasets/:dataset" component={DatasetPage} />
          {/* <Route exact={true} path="/pipelines" component={PipelinesPage} /> */}
          <Route exact={true} path="/" component={HomePage} />
        </Switch>
      </App>
    )
  }
}
