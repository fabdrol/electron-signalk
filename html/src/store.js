import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reducers, { initialState } from './ducks'
import api from './lib/api'
const DEBUGGER = (window.hasOwnProperty('devToolsExtension') && typeof window.devToolsExtension === 'function') ? window.devToolsExtension : () => {}

export default function configureStore (history) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
      thunk.withExtraArgument(api),
      routerMiddleware(history)
    ),
    DEBUGGER()
  )

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const nextReducer = require('./ducks')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
