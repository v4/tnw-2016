'use strict';

const EventEmitter = require('events').EventEmitter;
const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

const actions = {

  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },

  merge(sessionId, context, entities, message, cb) {
    console.log(entities);
    cb(context);
  },

  error(sessionId, context, err) {
    console.log(err.message);
  }

};

class SAM extends EventEmitter {

  constructor() {
    super();
    this.on('speech in', this.process.bind(this));
    this.wit = new Wit('YWRTKHNK7MG6KXRS7SEIW3IMDSYRKPQB', actions);
    this.sessionId = uuid.v1();
    this.context = {};
    this.steps = 5;
  }
  
  process(message) {
    this.wit.runActions(
      this.sessionId,
      message,
      this.context,
      (error, context) => {
        if (error) {
          // l.error(error);
        } else {
          this.context = context;
        }
      },
      this.steps
    );
  }

}

module.exports = SAM;