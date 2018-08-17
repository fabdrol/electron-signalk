import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './ui/app'
import configureStore from './store'
import SKConnection from './lib/signalk'

Object.isObject = function isObject (mixed, ownProp) {
  if (ownProp) {
    return mixed && typeof mixed === 'object' && mixed.hasOwnProperty(ownProp)
  }

  return mixed && typeof mixed === 'object'
}

const history = createHistory()
const store = configureStore(history)
// Initiate SK client...
store.skClient = new SKConnection(store)

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./ui/app', () => {
    const NextApp = require('./ui/app').default

    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp history={history} />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
