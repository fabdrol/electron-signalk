import EventEmitter from 'eventemitter3'
import Client from '@signalk/signalk-sdk'

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

  connect (hostname, port) {
    if (this.client !== null) {
      return this.client
        .disconnect(true)
        .then(() => {
          this.client = null
          return this._connect(hostname, port)
        })
        .catch(err => {
          console.error(`Error whilst disconnecting from SK server, force-killing client: ${err.message || err}`)
          this.client = null
          return this._connect(hostname, port)
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

    return this.client
      .connect()
      .then(() => this.client)
      .catch(err => {
        this.emit('error', err)
        this.client = null
        throw err
      })
  }

  _storeChanged () {
    const state = this.store.getState()

    if (state.signalk.shouldConnect === true) {
      this.connect(state.signalk.hostname, state.signalk.port)
    }
  }

  /*
   * EVENT HANDLERS
   */
  _onDelta (delta) {
    this.emit('delta', delta)
    this.store.dispatch(applyDelta(delta))
  }

  _onConnect (evt) {
    this.connected = true
    this.store.dispatch(setConnected(this.connected))

    this.client
      .API()
      .then(api => api.self())
      .then(state => {
        this.store.dispatch(hydrateState(state))
        this.subscribe()
        this.emit('connect', evt)
      })
      .catch(err => {
        console.log('ERROR', err.message)
      })
  }

  _onDisconnect (evt) {
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('disconnect', evt)
  }

  _onError (evt) {
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('error', evt)
  }

  _onMaxRetries (evt) {
    this.connected = false
    this.store.dispatch(setConnected(this.connected))
    this.emit('hitMaxRetries', evt)
  }
}

module.exports = SKConnection
