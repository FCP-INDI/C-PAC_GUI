/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import EnvironmentsPage from './containers/EnvironmentsPage';

export default () => (
  <App>
    <Switch>
      <Route path="/environments" component={EnvironmentsPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
