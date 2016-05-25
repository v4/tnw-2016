/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('tapeface.js being loaded...')

var face = (function () { // eslint-disable-line
  var module = {} // eslint-disable-line
  // var privateVariable = 1 // eslint-disable-line

  // function privateMethod () { // eslint-disable-line
  //   // ...
  // }

  // module.moduleProperty = 1

  module.makeAngry = function () {
    console.log('tapeface is angry.')
  }

  module.makeSad = function () {
    console.log('tapeface is sad.')
  }

  module.makeHappy = function () {
    console.log('tapeface is happy.')
  }

  module.makeNeutral = function () {
    console.log('tapeface is neutral.')
  }

  module.setVocalExpression = function (expression) {
    expression = expression || 'silent';
    console.log('tapeface vocal expression set to: ', expression);
  }

  return module
}())
