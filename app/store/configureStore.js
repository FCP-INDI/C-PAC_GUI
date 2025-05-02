import { createStore, applyMiddleware, compose } from 'redux'
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

export const history = createHashHistory()

const navigationMiddleware = (history) => (store) => (next) => (action) => {
  if (action.type === 'NAVIGATE') {
    const { method, args } = action.payload
    if (history[method]) {
      history[method](...args)
    }
  }
  return next(action)
}
const router = navigationMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  level: 'info',
  collapsed: true
})

export const configureStore = (initialState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(...[
        ...(process.env.NODE_ENV !== 'test' ? [logger] : []),
        router,
        sagaMiddleware,
      ])
    )
  )

  let sagaTask = sagaMiddleware.run(rootSaga)

  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers')))

  //   module.hot.accept('../sagas', () => {
  //     const getNewSagas = require('../sagas');
  //     sagaTask.cancel()
  //     sagaTask.done.then(() => {
  //       sagaTask = sagaMiddleware.run(getNewSagas.default)
  //     })
  //   })
  // }

  return store
}
