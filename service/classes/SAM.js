'use strict';

const EventEmitter = require('events').EventEmitter;
const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

class SAM extends EventEmitter {

  constructor() {
    super();
    this.on('speech in', this.process.bind(this));
    this.wit = new Wit('E6AWMDVXHBRMM2TOIX3M53GNREPBFS7A', {
      say: this.say.bind(this),
      merge: this.merge.bind(this),
      error: this.error.bind(this)
    });
    this.sessionId = uuid.v1();
    this.context = {};
    this.steps = 5;
  }
  
  say(sessionId, context, message, cb) {
    console.log('sam say:' , message, cb);
    this.emit('speech out', message);
    cb();
  }

  merge(sessionId, context, entities, message, cb) {
    cb(context);
  }

  error(sessionId, context, error) {
    console.log(error);
  }

  process(message) {
    this.wit.runActions(
      this.sessionId,
      message,
      this.context,
      (error, context, text) => {
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