'use strict'

const Service = require('trails/service');
const base64Img = require('base64-img');
/**
 * @module SocketService
 * @description socket
 */
module.exports = class SocketService extends Service {

  constructor(app){

    super(app)
    this.io = require('socket.io')
  }

  socketInit(http){

      let data = {
          "binary_small": "hi i am server.",
          "binary_large": "hi i am server. its a socket.io demo of real-time chat. get multiple arguments and emit to others." +
          "Its provide multi user support. Also support group chat and private chat with users. " +
          "socket.io provides socket id for every socket.",
          "text_small": "hi am server.",
          "text_large": "hi i am server. its a socket.io demo of real-time chat. get multiple arguments and emit to others." +
          "Its provide multi user support. Also support group chat and private chat with users. " +
          "socket.io provides socket id for every socket.",
          "json_small": {
              "message": "hi am server",
              "data": "get small data ",
              "work": "realtime chat messaging",
              "getdata": "many types of data you get"
          },
          "json_large": {
              "user": {
                  "add_group": {
                      "groupname": {
                          "jsbot": {
                              "message": "its jsbot group"
                          }, "Nodejs": {
                              "message": "its Nodejs group"
                          }, "Socket": {
                              "message": "its socket group"
                          }, "remove": "group"
                      }
                  }
              }
          }
      }

      /**
       * get small image base64 string
       */
      let small_imgUrl
      base64Img.base64('./js_(3.1k).png', (err, data) => {
          small_imgUrl = data
      })

      /**
       * get large image base64 string
       */
      let large_imgUrl
      base64Img.base64('./car_(2.1MB).jpg', (err, data) => {
          large_imgUrl = data
      })

      let med_imgUrl
      base64Img.base64('./apple_(9.8kb).jpeg', (err, data) => {
          med_imgUrl = data
      })

      /**
       * convert function for string to binary convert
       * @param input
       * @returns {string}
       */
      let convert = (input) => {
          let output = "";
          for (let i = 0; i < input.length; i++) {
              output += input[i].charCodeAt(0).toString(2) + " ";
          }
          return output
      }


      this.io = this.io(http)

     // On socket client connection
     this.io.on('connection', (socket)=> {

      console.log(socket.id+' connected');

      //HANDLERS
      /**
       * send all online friends list to all connected socket
       */
      const getOnlineFriends = ()=> {

        let data = Object.keys(this.io.sockets.sockets)
        this.io.emit('allOnlineFriends', { data })
      }
      /**
       * Send a message to particular socket
       * @param data
       */
      const onMessageSubmit = (data)=> { this.io.to(data.id).emit('message', data.message); }
      /**
       * Subscribe to join a room
       * @param room
       */
      const onSubscribe = (room)=> { socket.join(room); }
      /**
       * Unsubscribe to leave a room
       * @param room
       */
      const onUnSubscribe = (room)=> { socket.leave(room); }
      /**
       * Broadcast a message in room
       * @param data
       */
      const onBroadcastToRoom = (data)=> { socket.to(data.room).emit('message', data.message); }
      /**
       * Socket client disconnection
       */
      const onDisconnect = ()=> {
        console.log(socket.id+' disconnected');
        getOnlineFriends();
      }


         /**
          * functions for emitting data
          * @returns {Namespace|Socket|void}
          */
             //emit text data
         let text_small = () => socket.emit('message', data.text_small)
         let text_large = () => socket.emit('message', data.text_large)
         let text_multi = () => socket.emit('message', data.text_small, data.text_large, data.text_small)
         //emit json data
         let json_small = () => socket.emit('message',data.json_small)
         let json_large = () => socket.emit('message',data.json_large)
         let json_multi = () => socket.emit('message',data.json_small, data.json_large, data.json_small)
         //emit binary data
         let binary_small = () => socket.emit('message', convert(data.binary_small))
         let binary_large = () => socket.emit('message', convert(data.binary_large))
         let binary_multi = () => socket.emit('message', convert(data.binary_small), convert(data.binary_large), convert(data.binary_small))
         //emit img data
         let img_small = () => socket.emit('message', {data: small_imgUrl, type: "img"})
         let img_large = () => socket.emit('message', {data: large_imgUrl, type: "img"})
         //  let img_multi = () => socket.emit('message', small_imgUrl, large_imgUrl, med_imgUrl)

         /**
          * server side listen
          */
         socket.on('text', text_small)
         socket.on('text_small', text_small)
         socket.on('text_large', text_large)
         socket.on('text_multi', text_multi)

         socket.on('json_small', json_small)
         socket.on('json_large', json_large)
         socket.on('json_multi', json_multi)

         socket.on('binary_small', binary_small)
         socket.on('binary_large', binary_large)
         socket.on('binary_multi', binary_multi)

         socket.on('img_small', img_small)
         socket.on('img_large', img_large)

      //LISTENERS
      getOnlineFriends()
      socket.on('messageSubmit', onMessageSubmit)
      socket.on('subscribe', onSubscribe)
      socket.on('unsubscribe', onUnSubscribe)
      socket.on('broadcast', onBroadcastToRoom)
      socket.on('disconnect', onDisconnect)
    });
  }
}

