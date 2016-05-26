'use strict';

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
  password: "kCGqg4aLZtOH",
  username: "1df91b4b-185a-41e7-bcf4-33a43fd4a55e"
});

app.use(express.static('../app'));

io.on('connection', (socket) => {
  console.log('New connection');
  socket.on('speech in', (message) => {
    console.log('SAM: speech in: ', message);
    sam.emit('speech in', message.payload);
  });
  
  sam.on('play song', () => {
    socket.emit('play song', {});
  });
  
  sam.on('speech out', (message) => {
    console.log('SAM: speech out: ', message);
    var transcript = textToSpeech.synthesize({
      text: message,
      voice: 'en-US_AllisonVoice'
    });
    
    transcript.on('response', function(response) {
      // socket.emit('speech out', {
      //   payload: response
      // });
    });
    
    transcript.on('error', function(error) {
      console.error(error)
    });

    let audio = [];
    transcript.on('data', (buffer) => {
      audio.push(buffer);
    });
    transcript.on('end', () => {
      socket.emit('speech out', {
        text: message,
        payload: Buffer.concat(audio).toString('base64')
      });
    });
  });
});

http.listen(3000, () => {
  console.log('Server listening on 3000');
});