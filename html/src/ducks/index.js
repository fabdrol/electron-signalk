import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import ui, { initialState as uiInitialState } from './ui'
import signalk, { initialState as signalkInitialState } from './signalk'

export const initialState = {
  ui: uiInitialState,
  signalk: signalkInitialState
}

export default combineReducers({
  ui,
  signalk,
  router
})
