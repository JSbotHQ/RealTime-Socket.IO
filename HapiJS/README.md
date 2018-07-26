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


   #### iii.Modifier data emit

   Basic Description:

      -Enter below types in text area and get result according to type

          Type: Text
          1.text/text_small - get small text data
          2.text_large      - get large text data
          3.text_multi      - get multiple text data

          Type: Json
          1.json_small      - get small json data
          2.json_large      - get large json data
          3.json_multi      - get multi json data

          Type: Binary
          1.binary_small    - get small binary data
          2.binary_large    - get large binary data
          3.binary_multi    - get multiple binary data

          Type: Base64 Image
          1.img_small       - get small image
          2.img_large       - get large image

          Type: File
          1.file - get file