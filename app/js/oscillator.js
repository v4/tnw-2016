

var face = (function () { // eslint-disable-line
  
  var module = {}; // eslint-disable-line
  
  module.oscillator = null;

  function createOscillator () {
    // Create an audio-context
    var audioContext = new window.AudioContext();
    this.oscillator = audioContext.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.value = 400;
    this.oscillator.start();

    // Create an Oscilloscope instance
    //   Parameters:
    //     - The container in which the oschilloscope gets created
    //     - an optional audio-context on which the oscilloscope creates an analyser-node,
    //          and can connect to the destination.
    //          If no audio-context is specified, a new one will be created created.
    
    var oscilloscope = new Oscilloscope('.face-oscilloscope', audioContext);

    // Connect the oscillator-node to the oscilloscope
    this.oscillator.connect(oscilloscope.analyserNode);
  }

  createOscillator();

  module.getOscillator = function () {
    return this.oscillator;
  }

  module.startOscilloscope = function () {
    // Start the oscilloscope
    this.oscilloscope.start();
  }

  return module;
}());