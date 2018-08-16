const { join } = require('path')
const express = require('express')
const STATIC_DIR = join(__dirname, '../html/dist')

module.exports = function startExpress (port) {
  const app = express()
  app.use(express.static(STATIC_DIR))
  app.listen(port || 15050)
  return app
}
