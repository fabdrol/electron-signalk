import flatten from '../lib/flatten'

export const SET_HOSTNAME = 'industries.decipher.signalk/signalk/SET_HOSTNAME'
export const SET_PORT = 'industries.decipher.signalk/signalk/SET_PORT'
export const ADD_SERVER = 'industries.decipher.signalk/signalk/ADD_SERVER'
export const SELECT_SERVER = 'industries.decipher.signalk/signalk/SELECT_SERVER'
export const SET_CONNECTED = 'industries.decipher.signalk/signalk/SET_CONNECTED'
export const SET_SHOULD_CONNECT = 'industries.decipher.signalk/signalk/SET_SHOULD_CONNECT'
export const HYDRATE_STATE = 'industries.decipher.signalk/signalk/HYDRATE_STATE'
export const APPLY_DELTA = 'industries.decipher.signalk/signalk/APPLY_DELTA'

export const defaultState = {
  hostname: '95.97.138.90',
  port: 3000,
  connected: false,
  shouldConnect: true,
  data: {},
  servers: [
    {
      id: 1,
      name: 'Decipher HQ',
      hostname: '95.97.138.90',
      port: 3000
    },
    {
      id: 2,
      name: 'X-Miles',
      hostname: '192.168.0.100',
      port: 3000
    }
  ]
}

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case HYDRATE_STATE:
      return {
        ...state,
        data: {
          ...action.payload
        }
      }

    case APPLY_DELTA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }

    case SET_HOSTNAME:
      return {
        ...state,
        hostname: action.payload
      }

    case SET_PORT:
      return {
        ...state,
        port: action.payload
      }

    case SET_CONNECTED:
      return {
        ...state,
        connected: action.payload,
        shouldConnect: action.payload === true ? false : state.shouldConnect
      }

    case SET_SHOULD_CONNECT:
      return {
        ...state,
        shouldConnect: action.payload
      }

    case ADD_SERVER:
      return {
        ...state,
        servers: [{ ...action.payload, id: Date.now() }].concat(state.servers)
      }

    case SELECT_SERVER:
      const selected = state.servers.reduce((found, server) => {
        if (server.id === action.payload) {
          found = server
        }
        return found
      }, null)

      if (selected === null) {
        return {
          ...state
        }
      }

      return {
        ...state,
        hostname: selected.hostname,
        port: selected.port,
        connected: false,
        shouldConnect: true
      }

    default:
      return { ...state }
  }
}

export function selectServer (payload) {
  return {
    type: SELECT_SERVER,
    payload
  }
}

export function addServer (name, hostname, port) {
  return {
    type: ADD_SERVER,
    payload: {
      name,
      hostname,
      port
    }
  }
}

export function setHostname (payload) {
  return {
    type: SET_HOSTNAME,
    payload
  }
}

export function setPort (payload) {
  return {
    type: SET_PORT,
    payload
  }
}

export function setConnected (payload) {
  return {
    type: SET_CONNECTED,
    payload
  }
}

export function setShouldConnect (payload) {
  return {
    type: SET_SHOULD_CONNECT,
    payload
  }
}

export function hydrateState (payload) {
  // console.log(flatten.tree(payload))
  return {
    type: HYDRATE_STATE,
    payload: flatten.tree(payload)
  }
}

export function applyDelta (payload) {
  // console.log(flatten.delta(payload).mutations)
  return {
    type: APPLY_DELTA,
    payload: flatten.delta(payload).mutations
  }
}
