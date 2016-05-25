const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Logger = require('node-wit').Logger;
const levels = require('node-wit').logLevels;
const Wit = require('node-wit').Wit;


app.use(express.static('../app'));

io.on('connection', (socket) => {
  console.log('New connection');
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});