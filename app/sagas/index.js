import configSaga from './config';
import datasetSaga from './dataset';
import theodoreSaga from './theodore';

import { all } from 'redux-saga/effects'

function* rootSaga () {
    yield all([
      configSaga(),
      datasetSaga(),
      theodoreSaga(),
    ])
  }

  export default rootSaga
