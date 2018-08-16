const { BrowserWindow, powerSaveBlocker } = require('electron')
const EventEmitter = require('events')

class Application extends EventEmitter {
  constructor (opts) {
    super()
    this.config = opts || {}
    this.window = null
    this.fullscreen = this.config.window.fullscreen || false
    this.width = this.config.window.width || 800
    this.height = this.config.window.height || 480
    this.preventSleepId = null
    this.url = 'http://localhost:15050'
  }

  startPreventSleep () {
    if (this.preventSleepId === null) {
      this.preventSleepId = powerSaveBlocker.start('prevent-display-sleep')
    }
  }

  stopPreventSleep () {
    if (this.preventSleepId !== null) {
      powerSaveBlocker.stop(this.preventSleepId)
      this.preventSleepId = null
    }
  }

  getWindow () {
    return this.window
  }

  createWindow (URL) {
    if (URL) {
      this.url = URL
    }

    this.window = new BrowserWindow({
      width: this.width,
      height: this.height,
      frame: this.config.window.frame,
      fullscreen: this.fullscreen,
      kiosk: this.config.window.kiosk,
      backgroundColor: this.config.window.backgroundColor
    })

    this.window.on('closed', () => {
      this.window = null
    })

    this.window.on('leave-full-screen', () => {
      this.fullscreen = false
    })

    this.window.on('enter-full-screen', () => {
      this.fullscreen = true
    })

    this.window.loadURL(this.url)
    this.window.show()
  }
}

module.exports = Application
