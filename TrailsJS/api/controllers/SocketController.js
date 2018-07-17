'use strict'

const Controller = require('trails/controller')

/**
 * @module SocketController
 * @description TODO document Controller.
 */
module.exports = class SocketController extends Controller {

    chat(req,res){
        return res.sendFile('chat.html', {root: './public'});
    }

    group(req, res) {
        return res.sendFile('group.html', {root: './public'});
    }

    modifier(req, res) {
        return res.sendFile('modifier.html', {root: './public'});
    }
}

