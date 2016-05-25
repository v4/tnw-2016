const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('../app'));

io.on('connection', (socket) => {
  console.log('New connection');
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});