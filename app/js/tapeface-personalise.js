

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
    apis.forEach(function(api) {
      if(api === personalisation) {
        $('.' + api).removeClass('invisible');
      }
    });
  };

  return module;

})();