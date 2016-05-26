

var personalise = (function () {
  var module = {};
  var apis = ['deezer', 'todoist', 'uber', 'toon'];

  module.removeAllPersonalisations = function () {
    apis.forEach(function(api) {
      $('.' + api).addClass('invisible');
    });
  };

  module.select = function (personalisation) {
    module.removeAllPersonalisations();
    // apply personalisation
    apis.forEach(function(api) {
      if(api === personalisation) {
        $('.' + api).removeClass('invisible');
      }
    });
    // apply personalisation also to brows, eyes, etc.
    $('.face-brows').addClass(personalisation);
    $('.face-eyes').addClass(personalisation);
    $('.bg-color').addClass(personalisation);
  };

  return module;

})();