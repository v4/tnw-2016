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
    this.idle = true;
  }
  
  say(sessionId, context, message, cb) {
    console.log('sam say:' , message, context);
    this.emit('speech out', message);
    this.idle = true;
    cb();
  }

  merge(sessionId, context, entities, message, cb) {
    console.log(context, entities, message);
    cb(context);
  }

  error(sessionId, context, error) {
    console.log(error);
  }

  process(message) {
    // if (this.idle) {
      this.idle = false;
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
          this.idle = true;
        },
        this.steps
      );
    // }
  }

}

module.exports = SAM;