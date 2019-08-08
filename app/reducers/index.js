import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import main from './main'
// import theodore from './theodore'

export default (history) => combineReducers({
  main,
  // theodore,
  router: connectRouter(history),
})