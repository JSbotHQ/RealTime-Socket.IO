'use strict'

const Controller = require('trails/controller')

/**
 * @module SocketController
 * @description TODO document Controller.
 */
module.exports = class SocketController extends Controller {

    chat(req,res){
        res.sendFile(__dirname + '/index.html');
    }

    group(req, res) {
        res.sendFile(__dirname +'/group.html');
    }

}

