/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict'

const TrailsApp = require('trails')
const app = require('./')
const server = new TrailsApp(app)


server.once('webserver:http:ready', (http) => {

  if (Array.isArray(http)) {
    http = http[0]
  }
  server.services.SocketService.socketInit(http)
})

server.start().catch(err => server.stop(err))
