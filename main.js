/**
 * main.js
 *
 * @author:          Fabian Tollenaar <fabian> <fabian@decipher.industries>
 * @date:            2018-08-15 19:02
 * @copyright:       Fabian Tollenaar/Decipher Industries (c) 2018. All rights reserved.
 * @license:         UNLICENSED
 * @modified:        2018-09-27 17:57
 */

const { app } = require('electron')
const config = require('./settings.json')
const server = require('./lib/server')
const Application = require('./lib/application')
const application = new Application(config)

app.on('ready', () => {
  server()
  application.createWindow('http://localhost:15050')
  // application.createWindow('http://localhost:8000')
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
    application.createWindow()
  }
})
