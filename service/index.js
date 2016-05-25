const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const SAM = require('./classes/SAM');
const sam = new SAM();

const watson = require('watson-developer-cloud');

// For local development, replace username and password
var textToSpeech = watson.text_to_speech({
  version: 'v1',
  username: 'jaap@vermaire.com',
  password: '2419107NeverTellMichaelMyPass'
});


app.use(express.static('../app'));

io.on('connection', (socket) => {
  console.log('New connection');
  socket.on('speech in', (message) => {
    console.log('SAM: speech in: ', message);
    sam.emit('speech in', message.payload);
  });
  
  sam.on('speech out', (message) => {
    console.log('SAM: speech out: ', message);

    var transcript = textToSpeech.synthesize({text: message});
    console.log('transcript', transcript);
    
    transcript.on('response', function(response) {
      socket.emit('speech out', {
        payload: response
      });
    });
    transcript.on('error', function(error) {
      console.error(error)
    });

    //transcript.pipe(socket);
    

  });
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});