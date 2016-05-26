function dataURItoBlob(dataURI)
  {
      // Split the input to get the mime-type and the data itself
      dataURI = dataURI.split( ',' );

      // First part contains data:audio/ogg;base64 from which we only need audio/ogg
      var type = dataURI[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];

      // Second part is the data itself and we decode it
      var byteString = atob( dataURI[ 1 ] );
      var byteStringLen = byteString.length;

      // Create ArrayBuffer with the byte string and set the length to it
      var ab = new ArrayBuffer( byteStringLen );

      // Create a typed array out of the array buffer representing each character from as a 8-bit unsigned integer
      var intArray = new Uint8Array( ab );
      for ( var i = 0; i < byteStringLen; i++ ) 
      {
          intArray[ i ] = byteString.charCodeAt( i );
      }

      return new Blob( [ intArray ], {type: type} );
  }
  
$(document).ready(function () {

  var recognition = new webkitSpeechRecognition();
  var socket = io('http://localhost:3000');
  var audio = null;
  var speechQueue = [];
  var idle = true;
  socket.on('speech out', (data) => {
    speechQueue.push(data);
    processSpeechout(speechQueue.shift());
  });
  
  function processSpeechout(data) {
    if (idle) {
      idle = false;
      if (audio) audio = null;
      console.log('speech out', data.payload);
      audio = new Audio();
      audio.id = 'audioElement';
      audio.src = URL.createObjectURL(dataURItoBlob('data:audio/ogg;base64,' + data.payload));
      audio.load();
      audio.play();
      mouth.create(audio, '.face-oscilloscope', {
        frequencyBins : 10,
        barPadding: 2,
        height: '30',
        width: '75',
        fillColor: '#3541db'
      });
      mouth.start();
      mouth.setFillColor('#db4538');
      audio.addEventListener("ended", function() {
        console.log(recognition);
        try {        
          recognition.start();
        } catch (e) {
          
        }
        idle = true;
      }); 
    } else {
      setTimeout(() => {
        processSpeechout(data);
      }, 100);
    }
  }

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = function(event) {
    face.makeHappy();
    console.log(event);
    if(event.results[0].isFinal) {
      console.log(event.results[0][0].transcript);
      // if (event.results[0][0].transcript.toLowerCase().indexOf('sam') !== -1) {
        console.log('speech in', event.results[0][0].transcript);
        socket.emit('speech in', { payload: event.results[0][0].transcript });        
      // }
      // recognition.stop();
    }
  };

  socket.on('speech out', (message) =>{
    console.log('speech out', message);
  });
  
  recognition.start();

  // face.makeAngry();
  face.makeNeutral();

  // speech bubble
  setTimeout(function() {
    // face.speechBubble('lalala', 'description');
    // face.speechBubbleImage('img/loader-nyan.gif');
    face.speechBubbleLoading();
  }, 1000);


  //socket.emit('speech in', { payload: 'What is the answer to the ultimate question of life, the universe, and everything?' });
  // socket.emit('speech in', { payload: 'What is the date?' });
  // socket.emit('speech in', { payload: 'What is the time?' });
  // socket.emit('speech in', { payload: 'I feel sad' });
  //socket.emit('speech in', { payload: 'tell me a joke' });

  // setTimeout(function() {
  //   face.speechBubbleImage('img/loader-nyan.gif');
  // }, 10000);

  // debug
  // face.makeHappy();
  // socket.emit('speech in', { payload: 'hello' });

  setTimeout(function() {
    personalise.select('deezer');
  }, 500)

  // setTimeout(function() {
  //   personalise.select('deezer');

  //   setTimeout(function() {
  //     personalise.select('toon');

  //     setTimeout(function() {
  //       personalise.select('uber');

  //       setTimeout(function() {
  //         personalise.select('todoist');
  //       }, 2500);

  //     }, 2500);

  //   }, 2500);

  // }, 1000);

});