var socket = io('http://localhost:3000');
socket.on('speech out', function (data) {
  console.log(data);
});

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  console.log(event);
  if(event.results[0].isFinal){
    console.log('SOCKETING:', event.results[0][0].transcript);
    socket.emit('speech in', { payload: event.results[0][0].transcript });
  }
}
recognition.start();