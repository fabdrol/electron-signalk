/**
 * main.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 19:02
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-28 15:19
 */

const { app } = require('electron')
const fs = require('fs')
const { join } = require('path')
const config = require('./settings.json')
const server = require('./lib/server')
const Application = require('./lib/application')
const application = new Application(config)

const URI = 'http://localhost:15050'
// const URI = 'http://localhost:8000'
const PARAMS = {
  host: '192.168.0.100',
  port: '3000',
  theme: 'dark',
  identity: 'port'
}

try {
  const overrides = JSON.parse(fs.readFileSync(join(process.env.HOME, '.instrument.json'), 'utf-8'))
  Object.keys(overrides).forEach(key => {
    console.log(`Overriding param ${key} with ${overrides[key]}`)
    PARAMS[key] = overrides[key]
  })
} catch (e) {
  console.warn(`Error reading or parsing user config (${e.message}); using defaults`)
}

app.on('ready', () => {
  server()

  application.createWindow(URI, PARAMS)
  application.startPreventSleep()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  application.stopPreventSleep()
})

app.on('activate', () => {
  if (application.getWindow() === null) {
    application.createWindow(URI, PARAMS)
  }
})
