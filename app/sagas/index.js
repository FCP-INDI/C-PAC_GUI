import configSaga from './config';
import datasetSaga from './dataset';
import cpacpySaga from './cpacpy';

import { all } from 'redux-saga/effects'

function* rootSaga () {
    yield all([
      configSaga(),
      datasetSaga(),
      cpacpySaga(),
    ])
  }

  export default rootSaga
