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
    this.reconnects = 0

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
    this.reconnects += 1

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
