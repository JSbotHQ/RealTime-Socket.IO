# RealTime-Socket.IO

### 2. HapiJS

  - `cd HapiJS`
  - start the server by `npm start`.

  #### i. peer to peer messaging
   - go to `http://localhost:4002/chat`.
   - you can send message by clicking on any online client from right panel.

  ##### client code logic for sending message:

        socket.emit('sendMessage', message);
        socket.on('message', function(msg){
            console.log(msg)
        });

  ##### server code logic:

        io.emit('message', message);
        socket.on('sendMessage', function(msg){
            console.log(msg)
        });

  #### ii. room messaging
   - go to `http://localhost:4002/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   ##### client code logic:

        socket.emit('subscribe', room)

        socket.emit('broadcast', { room: room, message: message })

   ##### server code logic:

       socket.on('subscribe', function(room) {
           socket.join(room)
       })

      socket.on('broadcast', function(data) {
          socket.to(data.room).emit('message', data.message);
      });
