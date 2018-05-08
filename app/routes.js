import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import EnvironmentsPage from './containers/EnvironmentsPage';
import ProjectsPage from './containers/ProjectsPage';
import ProjectPage from './containers/ProjectPage';

import { projectOpen } from 'actions/main';

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
          {/* <Route path="/projects/:project/pipelines" component={ProjectPipelinesPage} /> */}
          <Route path="/projects/:project" component={ProjectPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/environments" component={EnvironmentsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </App>
    )
  }
}
