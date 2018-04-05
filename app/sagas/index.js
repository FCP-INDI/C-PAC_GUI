import configSaga from './config';
import environmentSaga from './environment';

import dockerSaga from './docker';

function* rootSaga () {
    yield [
      configSaga(),
      environmentSaga(),
      dockerSaga()
    ]
  }
  
  export default rootSaga