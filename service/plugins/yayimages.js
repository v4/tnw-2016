'use strict';

const Plugin = require('../classes/Plugin');


class YaYImages extends Plugin {

  constructor() {
    super();

  }

  getActions(){
    return ['getYayPictures'];
  }

  getYayPictures(sessionId, context, callback){

    var objectPicture = this.datastore.local_search_query[0].value;

    // TODO: show me the picture!
    
    callback(context);
  }
}

module.exports = YaYImages;