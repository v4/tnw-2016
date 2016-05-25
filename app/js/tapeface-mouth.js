

var oscilloscope = (function () { // eslint-disable-line
  
  var module = {}; // eslint-disable-line
  
  module.oscillator = null;
  module.oscilloscope = null;

  module.create = function (container) {
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
    
    this.oscilloscope = new Oscilloscope(container, audioContext);
    
    // Connect the oscillator-node to the oscilloscope
    this.oscilloscope.connect(this.oscilloscope.analyserNode);
  }

  module.get = function () {
    return this.oscilloscope;
  }

  module.start = function () {
    // Start the oscilloscope
    this.oscilloscope.start();
  }

  return module;
}());