'use strict';

const EventEmitter = require('events').EventEmitter;

class Plugin extends EventEmitter {

  constructor() {
    super();
  }

  getActions(){
    return [];
  }

}

module.exports = Plugin;