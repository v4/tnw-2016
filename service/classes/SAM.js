'use strict';

const EventEmitter = require('events').EventEmitter;
const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

const fs = require('fs');
const path_module = require('path');
var actions = [];
var plugins = [];
var plugin;
var pluginInstance;

function LoadPlugins(path) {
  console.log('Loading modules in path:', path);
  fs.lstat(path, function(err, stat) {
    console.log('stat.isDirectory()', stat.isDirectory());
    if (stat.isDirectory()) {
      // we have a directory: do a tree walk
      fs.readdir(path, function(err, files) {
        var f, l = files.length;
        for (var i = 0; i < l; i++) {
          console.log('loading:', files[i]);
          f = path_module.join(path, files[i]);
          LoadPlugins(f);
        }
      });
    } else {
      // we have a file: load it
      plugin = require(path);
      pluginInstance = new plugin();
      plugins.push(pluginInstance);
      actions.push(pluginInstance.getActions());


    }
  });
}
var DIR = path_module.join(__dirname, '../plugins');
LoadPlugins(DIR);


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
    console.log('sam say:' , message, context);
    this.emit('speech out', message);
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