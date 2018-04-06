/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import EnvironmentsPage from './containers/EnvironmentsPage';
import ProjectsPage from './containers/ProjectsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/environments" component={EnvironmentsPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
