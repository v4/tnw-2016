/* global $ */

// TODO mood / facial expressions

// TODO sound / lip sync

console.log('face js being loaded...')

var face = (function () { // eslint-disable-line
  var module = {} // eslint-disable-line
  var privateVariable = 1 // eslint-disable-line

  function privateMethod () { // eslint-disable-line
    // ...
  }

  module.moduleProperty = 1

  module.moduleMethod = function () {
    // ...
  }

  return module
}())

$.fn.extend({
  makeFace: function () {
    return this.each(function () {
      this.checked = true
    })
  }
})
