/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...');

var face = (function () { // eslint-disable-line
  var module = {}; // eslint-disable-line
  var moods = ['happy','sad','angry','neutral'];


  
  module.removeAllMoodClasses = function () {
    moods.forEach(function(mood) {
      $('.face-brows').removeClass('face-' + mood);
      $('.face-eyes').removeClass('face-' + mood);
      $('.bg-color').removeClass('face-' + mood);
      // because of SVG / D3, we need
    });
    return true;
  };

  module.setMood = function (mood) {
    this.removeAllMoodClasses();
    $('.face-eyes').addClass('face-' + mood);
    $('.face-brows').addClass('face-' + mood);
    $('.bg-color').addClass('face-' + mood);
    // TODO: $('.face-mouth').addClass('.face-' . mood);
    return true;
  };

  module.makeAngry = function () {
    // console.log('tapeface is angry.');
    module.setMood('angry');
    return true;
  };

  module.makeSad = function () {
    // console.log('tapeface is sad.');
    module.setMood('sad');
    return true;
  };

  module.makeHappy = function () {
    // console.log('tapeface is happy.');
    module.setMood('happy');
    return true;
  };

  module.makeNeutral = function () {
    // console.log('tapeface is neutral.');
    module.setMood('neutral');
    return true;
  };

  module.setVocalExpression = function (expression) {
    expression = expression || 'silent';
    // console.log('tapeface vocal expression set to: ', expression);
  };

  module.showSpeechBubble = function() {
    return Q.Promise(function(resolve, reject, notify) {


      resolve('resolved!');

      // reject(new Error("Speech Bubble Error! "));

      // notify();
    });
  }

  module.speechBubble = function(title, description) {
    module.showSpeechBubble()
    .then(function() {
      console.log('show Speech Bubble should be resolved!');
    });
  };

  module.speechBubbleImage = function(imageUrl) {
    module.showSpeechBubble()
    .then(function() {
      console.log('show Speech Bubble should be resolved!');
    });
  };

  return module;
}());
