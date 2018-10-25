import configSaga from './config';
// import environmentSaga from './environment';
// import dockerSaga from './docker';

import { all } from 'redux-saga/effects'

function* rootSaga () {
    yield all([
      configSaga(),
      // environmentSaga(),
      // dockerSaga()
    ])
  }

  export default rootSaga
