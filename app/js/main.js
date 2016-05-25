var recognition = new webkitSpeechRecognition();
var socket = io('http://localhost:3000');
socket.on('speech out', (data) => {
  console.log('speech out', data.payload);
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
}
recognition.start();


face.test()

face.makeAngry()
face.makeSad()
face.makeHappy()
face.makeNeutral()

face.setVocalExpression('a')
face.setVocalExpression('b')
face.setVocalExpression('o')
face.setVocalExpression('i')
face.setVocalExpression('')