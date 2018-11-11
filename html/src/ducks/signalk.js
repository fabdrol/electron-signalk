/**
 * signalk.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-16 11:45
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 14:29
 */

import SunCalc from 'suncalc'
import moment from 'moment'
import flatten from '../lib/flatten'
import { PREFIX, STORE } from '../common'
import { setNight } from './ui'

export const SET_HOSTNAME = 'industries.decipher.signalk/signalk/SET_HOSTNAME'
export const SET_PORT = 'industries.decipher.signalk/signalk/SET_PORT'
export const ADD_SERVER = 'industries.decipher.signalk/signalk/ADD_SERVER'
export const SET_SERVERS = 'industries.decipher.signalk/signalk/SET_SERVERS'
export const SELECT_SERVER = 'industries.decipher.signalk/signalk/SELECT_SERVER'
export const SET_CONNECTED = 'industries.decipher.signalk/signalk/SET_CONNECTED'
export const SET_SHOULD_CONNECT = 'industries.decipher.signalk/signalk/SET_SHOULD_CONNECT'
export const HYDRATE_STATE = 'industries.decipher.signalk/signalk/HYDRATE_STATE'
export const APPLY_DELTA = 'industries.decipher.signalk/signalk/APPLY_DELTA'
export const CLEAR_STATE = 'industries.decipher.signalk/signalk/CLEAR_STATE'
export const SET_SUN_TIMES = 'industries.decipher.signalk/signalk/SET_SUN_TIMES'

export const defaultState = {
  hostname: '192.168.0.100',
  // hostname: '95.97.138.90',
  port: 3000,
  connected: false,
  shouldConnect: true,
  data: {},
  sunTimes: SunCalc.getTimes(new Date(), 52.3702160, 4.8951680),
  servers: [
    {
      id: 1,
      name: 'X-Miles',
      hostname: '192.168.0.100',
      port: 3000
    },
    {
      id: 2,
      name: 'Decipher Industries',
      hostname: '95.97.138.90',
      port: 3000
    },
    {
      id: 3,
      name: 'Signal K demo',
      hostname: 'demo.signalk.org',
      port: 80
    }
  ]
}

let didApplyDelta = false

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case SET_SUN_TIMES:
      if (!Object.isObject(action.payload)) {
        return { ...state }
      }

      return {
        ...state,
        sunTimes: action.payload
      }

    case CLEAR_STATE:
      return {
        ...state,
        data: {}
      }

    case HYDRATE_STATE:
      return {
        ...state,
        data: {
          ...action.payload
        }
      }

    case APPLY_DELTA:
      if (didApplyDelta === false) {
        // console.log('Applying first delta from connection:', action.payload)
        didApplyDelta = true
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      }

    case SET_HOSTNAME:
      STORE.setItem(`${PREFIX}/hostname`, action.payload)
      return {
        ...state,
        hostname: action.payload
      }

    case SET_PORT:
      STORE.setItem(`${PREFIX}/port`, action.payload)
      return {
        ...state,
        port: action.payload
      }

    case SET_CONNECTED:
      if (action.payload === false) {
        didApplyDelta = false
      }

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
      const newState = {
        ...state,
        servers: [{ ...action.payload, id: Date.now() }].concat(state.servers)
      }

      STORE.setItem(`${PREFIX}/servers`, JSON.stringify(newState.servers))
      return newState

    case SET_SERVERS:
      if (!Array.isArray(action.payload)) {
        return { ...state }
      }

      return {
        ...state,
        servers: [...action.payload]
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

      STORE.setItem(`${PREFIX}/hostname`, selected.hostname)
      STORE.setItem(`${PREFIX}/port`, selected.port)

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

export function setSunTimes (longitude, latitude) {
  return dispatch => {
    const payload = SunCalc.getTimes(new Date(), latitude, longitude)
    let isNight = true

    if (Object.isObject(payload, 'sunset')) {
      isNight = moment().isAfter(payload.sunsetStart) && moment().isBefore(payload.sunrise)
      dispatch(setNight(isNight))
    }

    return dispatch({
      type: SET_SUN_TIMES,
      payload
    })
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

export function setServers (payload) {
  return {
    type: SET_SERVERS,
    payload
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
  return dispatch => {
    if (payload === false) {
      dispatch(clearState())
    }

    dispatch({
      type: SET_CONNECTED,
      payload
    })
  }
}

export function setShouldConnect (payload) {
  return {
    type: SET_SHOULD_CONNECT,
    payload
  }
}

export function clearState () {
  return {
    type: CLEAR_STATE
  }
}

export function hydrateState (payload) {
  // console.log(flatten.tree(payload))
  return {
    type: HYDRATE_STATE,
    payload: flatten.tree(payload)
  }
}

export function applyDelta (delta) {
  // console.log(flatten.delta(payload).mutations)
  const payload = flatten.delta(delta).mutations
  let longitude = null
  let latitude = false

  Object.keys(payload).forEach(key => {
    if (typeof key === 'string' && key.includes('longitude')) {
      longitude = payload[key]
    }

    if (typeof key === 'string' && key.includes('latitude')) {
      latitude = payload[key]
    }
  })

  return dispatch => {
    if (longitude !== null && latitude !== null) {
      dispatch(setSunTimes(longitude, latitude))
    }

    return dispatch({
      type: APPLY_DELTA,
      payload
    })
  }
}

export function hydrateUserSettings (overrideHost, overridePort) {
  let hostname = null
  let port = null
  let servers = null

  try {
    hostname = STORE.getItem(`${PREFIX}/hostname`)
    port = STORE.getItem(`${PREFIX}/port`)
    servers = STORE.getItem(`${PREFIX}/servers`)
  } catch (e) {}

  if (typeof servers === 'string') {
    try {
      servers = JSON.parse(servers)
    } catch (e) {
      servers = null
    }
  }

  if (overrideHost) {
    hostname = overrideHost
  }

  if (overridePort) {
    port = overridePort
  }

  return dispatch => {
    if (hostname !== null) {
      dispatch(setHostname(hostname))
    }

    if (port !== null && !isNaN(parseInt(port, 10))) {
      port = parseInt(port, 10)
      dispatch(setPort(port))
    }

    if (servers !== null && Array.isArray(servers)) {
      dispatch(setServers(servers))
    }
  }
}
