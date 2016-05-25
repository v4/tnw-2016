const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const SAM = require('./classes/SAM');
const sam = new SAM();

app.use(express.static('../app'));

io.on('connection', (socket) => {
  console.log('New connection');
  socket.on('speech in', (message) => {
    sam.emit('speech in', message.payload);
  });
  
  sam.on('speech out', (message) => {
    speech.emit('speech out', {
      payload: message
    });
  });
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});