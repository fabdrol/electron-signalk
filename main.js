const { app } = require('electron')
const config = require('./settings.json')
const server = require('./lib/server')
const Application = require('./lib/application')
const application = new Application(config)

app.on('ready', () => {
  server()
  application.createWindow('http://localhost:15050')
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
