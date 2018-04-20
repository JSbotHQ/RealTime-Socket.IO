'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server=Hapi.server({
  host:'localhost',
  port:3000
});

const io = require('socket.io')(server.listener);

// Start the server
const start = async ()=> {

  try {
    await server.register(require('inert'));

    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};
start();

// ROUTES
server.route({
  method:'GET',
  path:'/chat',
  handler: (request, h) => {
    return h.file('./public/chat.html')
  }
});
server.route({
  method:'GET',
  path:'/group',
  handler:function(request, h) {
    return h.file('./public/group.html')
  }
});

// On socket client connection
io.on('connection', (socket)=> {

  console.log(socket.id+' connected');

  //HANDLERS
  /**
   * send all online friends list to all connected socket
   */
  const getOnlineFriends = ()=> {

    let data = Object.keys(io.sockets.sockets)
    io.emit('allOnlineFriends', { data })
  }
  /**
   * Send a message to particular socket
   * @param data
   */
  const onMessageSubmit = (data)=> { io.to(data.id).emit('message', data.message); }
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

  //LISTENERS
  getOnlineFriends()
  socket.on('messageSubmit', onMessageSubmit)
  socket.on('subscribe', onSubscribe)
  socket.on('unsubscribe', onUnSubscribe)
  socket.on('broadcast', onBroadcastToRoom)
  socket.on('disconnect', onDisconnect)
});