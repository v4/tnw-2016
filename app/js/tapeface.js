/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...');

var face = (function () { // eslint-disable-line
  var module = {}; // eslint-disable-line
  var moods = ['happy','sad','angry','neutral'];

  module.hasOpenSpeechBubble = false;

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

  module.updateSpeechBubblePos = function() {
    var faceLeft = $('.face-holder').offset().left;
    var faceTop = $('.face').offset().top;
    // console.log('face position:', faceLeft, faceTop);
    $('.speechbubble').css('left', faceLeft + 485);
    $('.speechbubble').css('top', faceTop - 20);
    if(module.hasOpenSpeechBubble === true) requestAnimationFrame(module.updateSpeechBubblePos);
  };

  module.showSpeechBubble = function() {
    return Q.Promise(function(resolve, reject, notify) {
      // move over tapeface to the left of the screen
      $('.face-holder').addClass('face-holder-left');
      module.hasOpenSpeechBubble = true;
      requestAnimationFrame(module.updateSpeechBubblePos);
      
      setTimeout(function() {
        $('.speechbubble').removeClass('invisible');
        $('.speechbubble').addClass('popin');
        setTimeout(function() {
          resolve('resolved!');
        }, 500)
      }, 2000);

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
