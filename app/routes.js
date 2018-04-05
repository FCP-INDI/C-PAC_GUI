/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import SetupPage from './containers/SetupPage';

export default () => (
  <App>
    <Switch>
      <Route path="/setup/environments/{name}" component={SetupPage} />
      <Route path="/setup/environments" component={SetupPage} />
      <Route path="/setup" component={SetupPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
