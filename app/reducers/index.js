import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import main from './main';

const rootReducer = combineReducers({
  main,
  router,
});

export default rootReducer;
