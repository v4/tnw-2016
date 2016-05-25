'use strict';

const EventEmitter = require('events').EventEmitter;
const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');

const fs = require('fs');
const path_module = require('path');

class SAM extends EventEmitter {

  constructor() {

    super();
    
    var DIR = path_module.join(__dirname, '../plugins');

    this.actions =
    {
      say: this.say.bind(this),
      merge: this.merge.bind(this),
      error: this.error.bind(this)
    };
    
    this.plugins = [];
    this.LoadPlugins(DIR);
    this.on('speech in', this.process.bind(this));
    this.wit = new Wit('E6AWMDVXHBRMM2TOIX3M53GNREPBFS7A', this.actions);
    this.sessionId = uuid.v1();
    this.context = {};
    this.steps = 5;
  }


  LoadPlugins(path) {
    console.log('Loading modules in path:', path);
    fs.lstat(path, (err, stat) => {
      console.log('stat.isDirectory()', stat.isDirectory());
      if (stat.isDirectory()) {
        // we have a directory: do a tree walk
        fs.readdir(path, (err, files) => {
          var f, l = files.length;
          for (var i = 0; i < l; i++) {
            console.log('loading:', files[i]);
            f = path_module.join(path, files[i]);
            this.LoadPlugins(f);
          }
        });
      } else {
        // we have a file: load it
        var plugin = require(path);
        var pluginInstance = new plugin();
        this.plugins.push(pluginInstance);
        // this.actions.push(pluginInstance.getActions());
      }
    });
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