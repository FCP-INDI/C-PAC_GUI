import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import main from './main'
import dataset from './dataset'
import cpacpy from './cpacpy'

export default (history) => combineReducers({
  main,
  dataset,
  cpacpy,
  router: connectRouter(history),
})