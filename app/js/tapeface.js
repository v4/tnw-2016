/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...');

var face = (function () { // eslint-disable-line
  var module = {}; // eslint-disable-line
  var moods = ['happy','sad','angry','neutral'];

  module.hasOpenSpeechBubble = false;
  module.moodTimeoutID = null;
  module.speechBubbleTimeoutID = null;

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
    // add mood classes to all face components
    $('.face-eyes').addClass('face-' + mood);
    $('.face-brows').addClass('face-' + mood);
    $('.bg-color').addClass('face-' + mood);
    // remove all AGAIN after a set amount of time, 7 seconds?
    clearTimeout(module.moodTimeoutID);
    module.moodTimeoutID = setTimeout(function() {
      this.removeAllMoodClasses();
    }, 6000);
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
      $('.face-holder').removeClass('face-holder-centered');
      $('.face-holder').addClass('face-holder-left');
      module.hasOpenSpeechBubble = true;
      requestAnimationFrame(module.updateSpeechBubblePos);
      
      clearTimeout(module.speechBubbleTimeoutID);

      module.speechBubbleTimeoutID = setTimeout(function() {
        $('.speechbubble').removeClass('invisible');
        $('.speechbubble').addClass('popin');
        setTimeout(function() {
          resolve('resolved!');
        }, 750)
      }, 750);
    });
  }

  module.hideSpeechBubble = function() {
    return Q.Promise(function(resolve, reject, notify) {
      
      $('.speechbubble').removeClass('popin');
      $('.speechbubble').addClass('invisible');

      setTimeout(function() {
        // move over tapeface to the center of the screen
        $('.face-holder').removeClass('face-holder-left');
        $('.face-holder').addClass('face-holder-centered');
        module.hasOpenSpeechBubble = false;

        setTimeout(function() {
          resolve('resolved!');
        }, 750);

      }, 750);

    });
  };

  module.speechBubble = function(title, description) {
    module.showSpeechBubble()
    .then(function() {
      $('.speechbubble .title').html(title).addClass('popin');
      $('.speechbubble .description').html(description).addClass('popin');
      return;
    })
    .then(function() {
      module.speechBubbleTimeoutID = setTimeout(function() {
        module.hideSpeechBubble();
      }, 2500);
      return;
    });
  };

  module.speechBubbleImage = function(imageUrl) {
    module.showSpeechBubble()
    .then(function() {
      $('.speechbubble .image').attr('src', imageUrl).addClass('popin').addClass('loader');
      setTimeout(function() {
        return;
      }, 1000);
    });
  };

  module.speechBubbleLoading = function(imageUrl) {
    return face.speechBubbleImage('img/loader-bars-grey.gif');
  };

  module.speechBubbleDeeze = function(deezerIframeString) {
    module.showSpeechBubble()
    .then(function() {
      $('.speechbubble .content').html(deezerIframeString);
      return;
    })
  };

  return module;
}());
