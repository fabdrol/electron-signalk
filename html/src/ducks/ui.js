import { PREFIX, STORE } from '../common'

export const SET_THEME = 'industries.decipher.signalk/ui/SET_THEME'
export const SET_NIGHT = 'industries.decipher.signalk/ui/SET_NIGHT'
export const SET_SHOULD_RESET = 'industries.decipher.signalk/ui/SET_SHOULD_RESET'

export const defaultState = {
  theme: 'dark',
  night: false,
  shouldReset: false
}

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case SET_THEME:
      STORE.setItem(`${PREFIX}/theme`, action.payload)
      return {
        ...state,
        theme: action.payload
      }

    case SET_NIGHT:
      return {
        ...state,
        night: action.payload,
        // Set theme to dark IF night was false, and is now true, and theme is light
        theme: (state.night === false && action.payload === true && state.theme === 'light') ? 'dark' : state.theme
      }

    case SET_SHOULD_RESET:
      return {
        ...state,
        shouldReset: !!action.payload
      }

    default:
      return state
  }
}

export function hydrateThemeSettings () {
  return (dispatch, getState) => {
    let theme = STORE.getItem(`${PREFIX}/theme`)

    if (typeof theme === 'string' && (theme === 'light' || theme === 'dark')) {
      return dispatch(setTheme(theme))
    }

    dispatch(setTheme(getState().ui.theme))
  }
}

export function setShouldReset (payload) {
  return {
    type: SET_SHOULD_RESET,
    payload
  }
}

export function toggleTheme () {
  return (dispatch, getState) => {
    const payload = getState().ui.theme === 'light' ? 'dark' : 'light'
    return dispatch(setTheme(payload))
  }
}

export function toggleNight () {
  return (dispatch, getState) => {
    return dispatch(setNight(!getState().ui.night))
  }
}

export function setNight (payload) {
  return {
    type: SET_NIGHT,
    payload: !!payload
  }
}

export function setTheme (payload) {
  if (payload !== 'dark' && payload !== 'light') {
    payload = 'light'
  }

  return {
    type: SET_THEME,
    payload
  }
}
