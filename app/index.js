import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, hot } from 'react-hot-loader';

import { configureStore, history } from './store/configureStore';

import theme from './theme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Root from './containers/Root';

import './app.global.css';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <Component store={store} history={history} />
      </AppContainer>
    </MuiThemeProvider>,
    document.getElementById('root'),
  )
}

window.addEventListener('load', () => {
  render(Root)
  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      render(require('./containers/Root').default)
    })
  }
})
