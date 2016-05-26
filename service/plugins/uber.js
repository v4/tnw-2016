'use strict';

const Plugin = require('../classes/Plugin');


class Uber extends Plugin {

  constructor() {
    super();

  }

  getActions(){
    return ['getUberCab'];
  }

  getUberCab(sessionId, context, callback) {
    var destination_location = this.datastore.location[0].value;

    // TODO: get me a cab!
    context.etaCab = 'in 30 minutes';
    callback(context);

  }
}

module.exports = Uber;