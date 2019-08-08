import configSaga from './config';
import theodoreSaga from './theodore';

import { all } from 'redux-saga/effects'

function* rootSaga () {
    yield all([
      configSaga(),
      theodoreSaga(),
    ])
  }

  export default rootSaga
