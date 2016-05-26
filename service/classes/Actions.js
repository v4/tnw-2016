'use strict';

const Wit = require('node-wit').Wit;

const token = 'E6AWMDVXHBRMM2TOIX3M53GNREPBFS7A';

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
  },
  ['select-joke'](sessionId, context, cb) {
    console.log('hello');
  }
};

const client = new Wit(token, actions);

// client.message('Hello', () => {
  
// });

client.interactive();

// class Actions {

//   constructor() {
    
//   }

// }

// module.exports = Actions;