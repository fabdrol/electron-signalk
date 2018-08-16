export const SET_THEME = 'industries.decipher.signalk/ui/SET_THEME'
export const SET_NIGHT = 'industries.decipher.signalk/ui/SET_NIGHT'

export const defaultState = {
  theme: 'light',
  night: false
}

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      }

    default:
      return state
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
