/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...');

var face = (function () { // eslint-disable-line
  var module = {}; // eslint-disable-line
  var moods = ['happy','sad','angry','neutral'];
  // var privateVariable = 1 // eslint-disable-line

  // function privateMethod () { // eslint-disable-line
  //   // ...
  // }

  // module.moduleProperty = 1

  module.removeAllMoodClasses = function () {
    moods.forEach(function(mood) {
      $('.face-brows').removeClass('face-' + mood);
      $('.face-eyes').removeClass('face-' + mood);
      $('.bg-color').removeClass('face-' + mood);
      // TODO:$('.face-mouth').removeClass('face-mouth-' + mood);
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
    console.log('tapeface is angry.');
    module.setMood('angry');
    return true;
  };

  module.makeSad = function () {
    console.log('tapeface is sad.');
    module.setMood('sad');
    return true;
  };

  module.makeHappy = function () {
    console.log('tapeface is happy.');
    module.setMood('happy');
    return true;
  };

  module.makeNeutral = function () {
    console.log('tapeface is neutral.');
    module.setMood('neutral');
    return true;
  };

  module.setVocalExpression = function (expression) {
    expression = expression || 'silent';
    console.log('tapeface vocal expression set to: ', expression);
  };

  return module;
}());
