const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/chat', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/group', function (req, res) {
    res.sendFile(__dirname +'/group.html');
});

io.on('connection', function(socket){

    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    io.emit('all', { data: Object.keys(io.sockets.sockets)})
    io.to(socket.id).emit('message','ID: '+socket.id);
    socket.on('send', function(data){
        io.to(data.id).emit('message', data.message);
    });

    socket.on('subscribe', function(room) {
        socket.join(room)
    })
    socket.on('broadcast', function(data) {
        socket.to(data.room).emit('message', data.message);
    });
    socket.on('unsubscribe', function(room) {
        console.log('leaving room', room);
        socket.leave(room);
    })
});

http.listen(3000, ()=>{
    console.log('listening on *:3000');
});