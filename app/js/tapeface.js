/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...');

var face = (function () { // eslint-disable-line
  var module = {}; // eslint-disable-line
  // var privateVariable = 1 // eslint-disable-line

  // function privateMethod () { // eslint-disable-line
  //   // ...
  // }

  // module.moduleProperty = 1

  module.makeAngry = function () {
    console.log('tapeface is angry.');
    this.setMood('angry');
  };

  module.makeSad = function () {
    console.log('tapeface is sad.');
    this.setMood('sad');
  };

  module.makeHappy = function () {
    console.log('tapeface is happy.');
    this.setMood('happy');
  };

  module.makeNeutral = function () {
    console.log('tapeface is neutral.');
    this.setMood('neutral');
  };

  module.setVocalExpression = function (expression) {
    expression = expression || 'silent';
    console.log('tapeface vocal expression set to: ', expression);
  };

  module.removeAllMoodClasses = function () {
    $('.face-brows').removeClass();
    $('.face-eyes').removeClass();
    //TODO: $('.face-mouth').removeClass();
    
  };

  module.setMood = function (mood) {
    this.removeAllMoodClasses();
    $('.face-eyes').addClass('.face-' + mood);
    $('.face-brows').addClass('.face-' + mood);
    //TODO: $('.face-mouth').addClass('.face-' . mood);
  };

  return module;
}());
