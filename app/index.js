// import { remote } from 'electron'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

const render = (Component) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Component store={store} />
    </React.StrictMode>
  );
};

window.addEventListener('load', () => {
  render(Root)

  document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
      try {
        remote.getCurrentWindow().toggleDevTools();
      } catch (error) {
      }
    } else if (e.which === 116) {
      history.location.reload()
    }
  })

})
