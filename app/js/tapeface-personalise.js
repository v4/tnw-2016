

var personalise = (function () {
  var module = {};
  var apis = ['deezer', 'todoist', 'uber', 'toon'];

  module.removeAllPersonalisations = function () {
    apis.forEach(function(api) {
      $('.' + api).addClass('invisible');
      // remove personalisation from brows, eyes, etc.
      $('.face-brows').removeClass(api);
      $('.face-eyes').removeClass(api);
      $('.bg-color').removeClass(api);
      $('.speechbubble').removeClass(api);
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
    $('.speechbubble').addClass(personalisation);
  };

  module.upInSmoke = function () {
    module.removeAllPersonalisations();
  };

  module.depersonalise = function () {
    // module.removeAllPersonalisations();
  };

  return module;

})();