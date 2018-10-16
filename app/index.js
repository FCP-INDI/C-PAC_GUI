import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { hot } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';

import './app.global.css';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(require('./containers/Root').default)
  })
}
