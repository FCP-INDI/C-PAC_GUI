import configSaga from './config';
import datasetSaga from './dataset';
import executionSaga from './execution';
import cpacpySaga from './cpacpy';

import { all } from 'redux-saga/effects'

function* rootSaga () {
    yield all([
      configSaga(),
      datasetSaga(),
      executionSaga(),
      cpacpySaga(),
    ])
  }

  export default rootSaga
