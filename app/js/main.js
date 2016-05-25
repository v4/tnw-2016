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
  socket.on('speech out', (data) => {
    if (audio) audio = null;
    console.log('speech out', data.payload);
    audio = new Audio();
    audio.id = 'audioElement';
    audio.src = URL.createObjectURL(dataURItoBlob('data:audio/ogg;base64,' + data.payload));
    audio.load();
    audio.play();
    mouth.create(audio, '.face-oscilloscope', {
      frequencyBins : 20,
      barPadding: 2,
      height: '50',
      width: '75',
      fillColor: '#3541db'
    });
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
  
  recognition.start();

  // face.makeAngry();
  // face.makeSad();
  // face.makeHappy();
  face.makeNeutral();

  // face.setVocalExpression('a');
  // face.setVocalExpression('b');
  // face.setVocalExpression('o');
  // face.setVocalExpression('i');
  // face.setVocalExpression('');
  
});