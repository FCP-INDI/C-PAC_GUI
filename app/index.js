// import { remote } from 'electron'
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, hot } from 'react-hot-loader';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  )
}

window.addEventListener('load', () => {
  render(Root)

  document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
      try {
        remote.getCurrentWindow().toggleDevTools();
      } catch (error) {
      }
    } else if (e.which === 116) {
      location.reload()
    }
  })

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      render(require('./containers/Root'))
    })
  }
})
