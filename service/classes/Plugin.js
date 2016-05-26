'use strict';

const EventEmitter = require('events').EventEmitter;

class Plugin extends EventEmitter {

  constructor(sam) {
    super();
  }

  getActions(){
    return [];
  }

}

module.exports = Plugin;