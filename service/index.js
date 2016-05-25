const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('New connection');
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});