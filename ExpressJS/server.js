const app = require('express')();
const http = require('http').Server(app);

const Socket = require('./socket');
const socket = new Socket(http);
socket.init()

http.listen(4002, ()=>{
  console.log('listening on *:4002');
});

// Routes for private chat(peer to peer)
app.get('/chat', (req, res)=>{
    res.sendFile('chat.html', {root: './public'});
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});

// Route for modifier
app.get('/modifier', (req, res)=> {
    res.sendFile('modifier.html', {root: './public'});
});
