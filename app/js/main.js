var recognition = new webkitSpeechRecognition();
var socket = io('http://localhost:3000');
socket.on('speech out', (data) => {
  console.log('speech out', data.payload);
  var audio = new Audio('data:audio/ogg;base64,' + data.payload);
  audio.play();
  recognition.start();
});


recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  face.makeHappy();
  console.log(event);
  if(event.results[0].isFinal) {
    console.log('speech in', event.results[0][0].transcript);
    socket.emit('speech in', { payload: event.results[0][0].transcript });
    recognition.stop();
  }
};

socket.on('speech out', (message) =>{
  console.log('speech out', message)
});

$(document).ready(function () {
  
  recognition.start();

  // face.makeAngry();
  face.makeNeutral();

  // face.setVocalExpression('a');
  
  var mouthOptions = {
    frequencyBins : 20,
    barPadding: 2,
    height: '50',
    width: '75',
    fillColor: '#3541db'
  };
  
  // params: audio object ID, HTML element target, options.
  mouth.create('audioElement', '.face-oscilloscope', mouthOptions);
  mouth.start();
  mouth.setFillColor('#db4538');

  // speech bubble
  face.speechBubble('lalala', 'description');
  face.speechBubbleImage('loadingIcon.png');

});