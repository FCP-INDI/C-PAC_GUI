import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import main from './main'
import dataset from './dataset'
import theodore from './theodore'

export default (history) => combineReducers({
  main,
  dataset,
  theodore,
  router: connectRouter(history),
})