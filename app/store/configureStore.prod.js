import { createStore, applyMiddleware, compose } from 'redux'
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import sagas from '../sagas'

const history = createHashHistory()
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  level: 'info',
  collapsed: true
})

const configureStore = (initialState) => {
  const middleware = []
  const enhancers = []

  middleware.push(logger)
  middleware.push(router)
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  const actionCreators = {
    ...routerActions,
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators,
    })
    : compose

  const enhancer = composeEnhancers(...enhancers)

  const store = createStore(rootReducer, initialState, enhancer)

  sagaMiddleware.run(sagas)
  return store
}

export default { configureStore, history }
