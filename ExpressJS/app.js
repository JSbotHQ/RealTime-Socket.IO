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
io.on('connection', (socket)=>{

  // Socket handlers
  const onSend = (data)=> { io.to(data.id).emit('message', data.message); }
  const onSubscribe = (room)=> { socket.join(room); }
  const onUnSubscribe = (room)=> { socket.leave(room); }
  const onBroadcast = (data)=> { socket.to(data.room).emit('message', data.message); }
  const onDisconnect = ()=> { console.log(socket.id+' disconnected'); }

    console.log(socket.id+' connected');
    socket.on('disconnect', onDisconnect)

    //
    io.emit('all', { data: Object.keys(io.sockets.sockets)})
    io.to(socket.id).emit('message','ID: '+socket.id);
    // Send a message to
    socket.on('send', onSend);

    // subscribe to join a room
    socket.on('subscribe', onSubscribe)
    // unsubscribe to leave a room
    socket.on('unsubscribe', onUnSubscribe)
    // broadcast a message in room
    socket.on('broadcast', onBroadcast)
});