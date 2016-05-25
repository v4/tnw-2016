var socket = io('http://localhost:3000');
socket.on('speech out', function (data) {
  console.log(data);
});

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  socket.emit('speech in', { paylouad: event });
}
recognition.start();