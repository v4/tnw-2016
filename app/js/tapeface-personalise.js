

var personalise = (function () {
  var module = {};
  var apis = ['deezer', 'todoist', 'uber', 'toon'];

  module.removeAllPersonalisations = function () {
    apis.forEach(function(api) {
      $('.' + api).addClass('invisible');
      // remove personalisation from brows, eyes, etc.
      $('.face-brows').removeClass('brows-' + api);
      $('.face-eyes').removeClass('eyes-' + api);
      $('.bg-color').removeClass('bg-color-' + api);
      $('.speechbubble').removeClass('speechbubble-' + api);
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
    $('.face-brows').addClass('brows-' + personalisation);
    $('.face-eyes').addClass('eyes-' + personalisation);
    $('.bg-color').addClass('bg-color-' + personalisation);
    $('.speechbubble').addClass('speechbubble-' + personalisation);
  };

  module.upInSmoke = function () {
    module.removeAllPersonalisations();
    $('.face').addClass('invisible');
    $('.speechbubble').addClass('invisible');
    $('.face-shadow').addClass('invisible');
  };

  module.depersonalise = function () {
    module.removeAllPersonalisations();
  };

  return module;

})();