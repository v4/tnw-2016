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

recognition.start();

face.makeAngry();
face.makeSad();
face.makeHappy();
face.makeNeutral();

face.setVocalExpression('a');
face.setVocalExpression('b');
face.setVocalExpression('o');
face.setVocalExpression('i');
face.setVocalExpression('');