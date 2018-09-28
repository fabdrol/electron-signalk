/**
 * client.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 21:15
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 15:15
 */

import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { replace } from 'react-router-redux'
import App from './ui/app'
import configureStore from './store'
import SKConnection from './lib/signalk'
import { hydrateUserSettings } from './ducks/signalk'
import { hydrateThemeSettings, setLayout, setTheme } from './ducks/ui'

Object.isObject = function isObject (mixed, ownProp) {
  if (ownProp) {
    return mixed && typeof mixed === 'object' && mixed.hasOwnProperty(ownProp)
  }

  return mixed && typeof mixed === 'object'
}

const history = createHistory()
const store = configureStore(history)

let host = null
let port = null
let theme = null
let identity = null

if (typeof window.location.search === 'string' && window.location.search.trim() !== '') {
  let query = window.location.search.replace('?', '').split('&').map(pair => pair.split('=').map(val => decodeURIComponent(val)))
  query = query.reduce((obj, pair) => {
    obj[pair[0]] = pair[1]
    return obj
  }, {})

  if (query.hasOwnProperty('host')) {
    host = query.host
  }

  if (query.hasOwnProperty('port')) {
    port = query.port
  }

  if (query.hasOwnProperty('theme')) {
    theme = query.theme
  }

  if (query.hasOwnProperty('identity')) {
    identity = query.identity
  }
}

// Hydrate settings from localStorage, then init SK client
store.dispatch(hydrateUserSettings(host, port))
store.dispatch(hydrateThemeSettings(theme, identity))
store.skClient = new SKConnection(store)

store.skClient.on('layout', result => {
  if (!result || typeof result !== 'object') {
    return
  }

  if (result.hasOwnProperty('theme') && typeof result.theme === 'string' && (result.theme === 'dark' || result.theme === 'light')) {
    store.dispatch(setTheme(result.theme))
  }

  if (result.hasOwnProperty('layout') && typeof result.layout === 'string' && Array.isArray(result.metrics)) {
    store.dispatch(setLayout(result.layout, result.metrics))
  }

  if (result.hasOwnProperty('route') && typeof result.route === 'string' && result.route.charAt(0) === '/') {
    const route = result.route === '/controls' ? '/controls' : '/'
    store.dispatch(replace(route))
  }
})

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
