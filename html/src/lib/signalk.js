/**
 * signalk.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-17 12:00
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 15:02
 */

import EventEmitter from 'eventemitter3'
import Client from '@signalk/client'
import fetch from 'cross-fetch'

import {
  setConnected,
  hydrateState,
  applyDelta
} from '../ducks/signalk'

class SKConnection extends EventEmitter {
  constructor (store, opts = {}) {
    super()

    this.store = store
    this.client = null
    this.connected = false
    this.reconnects = 0
    this.layoutInfoTimeout = null

    this.config = {
      useTLS: false,
      reconnect: true,
      autoConnect: false,
      version: 'v1',
      ...opts
    }

    this.store.subscribe(this._storeChanged.bind(this))
    this._storeChanged()
  }

  fetchLayoutInfo () {
    if (this.layoutInfoTimeout !== null) {
      clearTimeout(this.layoutInfoTimeout)
    }

    const state = this.store.getState()
    const { identity } = state.ui
    const { hostname, port } = state.signalk

    fetch(`http://${hostname}:${port}/_essense-instrument/api/v1/state/${identity}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        return null
      })
      .then(response => {
        if (response !== null) {
          this.emit('layout', response)
        }

        this.layoutInfoTimeout = setTimeout(() => this.fetchLayoutInfo(), 10000)
      })
      .catch(err => {
        console.error(`Unable to fetch layout: ${err.message}`)
        this.layoutInfoTimeout = setTimeout(() => this.fetchLayoutInfo(), 10000)
      })
  }

  connect (hostname, port) {
    this.reconnects += 1

    if (this.layoutInfoTimeout !== null) {
      clearTimeout(this.layoutInfoTimeout)
    }

    if (this.client !== null) {
      return this.client
        .disconnect(true)
        .then(() => {
          this.client = null
          return this._connect(hostname, port)
        })
        .catch(err => {
          console.error(`Error whilst disconnecting from SK server, force-killing client`, err)
          // this.client = null
          // return this._connect(hostname, port)
        })
    }

    return this._connect(hostname, port)
  }

  getClient () {
    return this.client
  }

  subscribe (opts = {}) {
    if (this.client === null || this.connected === false) {
      return Promise.reject(new Error('Not connected to server...'))
    }

    const options = {
      context: 'vessels.self',
      ...opts
    }

    return this.client.subscribe(options)
  }

  /*
   * PRIVATE APIs
   */
  _connect (hostname, port) {
    this.client = new Client({
      ...this.config,
      hostname,
      port
    })

    this.client.on('connect', this._onConnect.bind(this))
    this.client.on('disconnect', this._onDisconnect.bind(this))
    this.client.on('error', this._onError.bind(this))
    this.client.on('hitMaxRetries', this._onMaxRetries.bind(this))
    this.client.on('delta', this._onDelta.bind(this))

    if (this.layoutInfoTimeout !== null) {
      clearTimeout(this.layoutInfoTimeout)
    }

    return this.client.connect()
  }

  _storeChanged () {
    const state = this.store.getState()

    if (state.signalk.shouldConnect === true) {
      this.connect(state.signalk.hostname, state.signalk.port)
    }
  }

  _sleep (time, val) {
    return new Promise(resolve => {
      setTimeout(() => resolve(val), time)
    })
  }

  /*
   * EVENT HANDLERS
   */
  _onDelta (delta) {
    // console.log('Got delta')
    this.emit('delta', delta)
    this.store.dispatch(applyDelta(delta))
  }

  _onConnect (evt) {
    if (this.client === null) {
      console.log('Connected, but client = null')
      return
    }

    this.client
      .API()
      .then(api => api.self())
      .then(state => {
        this.fetchLayoutInfo()
        // console.log('Connected, subscribing')
        this.connected = true
        this.store.dispatch(setConnected(this.connected))
        this.store.dispatch(hydrateState(state))
        this.emit('connect', evt)
        return this._sleep(250)
      })
      .then(() => this.subscribe())
      .catch(err => {
        console.log('ERROR', err.message)
      })
  }

  _onDisconnect (evt) {
    console.log('Disconnected', evt)
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('disconnect', evt)
  }

  _onError (evt) {
    console.log('Error', evt)
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('error', evt)
  }

  _onMaxRetries (evt) {
    console.log('Hit max retries')
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('hitMaxRetries', evt)
  }
}

module.exports = SKConnection
