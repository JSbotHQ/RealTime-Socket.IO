const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000, ()=>{
  console.log('listening on *:3000');
});

// Routes for private chat(peer to peer)
app.get('/chat', (req, res)=>{
    res.sendFile('chat.html', {root: './public'});
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
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