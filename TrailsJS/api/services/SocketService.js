'use strict'

const Service = require('trails/service')
const io = require('socket.io')
/**
 * @module SocketService
 * @description socket
 */
module.exports = class SocketService extends Service {

    socketInit(){
        console.log('socket initiated ')
    }
}

