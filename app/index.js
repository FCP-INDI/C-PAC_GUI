// import { remote } from 'electron'
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';

import Immutable from 'immutable'
import keyIn from './utils/keyIn'

Immutable.Map.prototype.subset = function (keys) {
  return this.filter(keyIn(...keys))
}
// localStorage.clear()
if (!('indexedDB' in window)) {
  alert("Limited functionality on current browser. Please switch to Chrome or Firefox. ")
}
const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <>
      <Component store={store} history={history} />
    </>,
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

})
