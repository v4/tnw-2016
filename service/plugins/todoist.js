'use strict';

const Plugin = require('../classes/Plugin');
const todoist = require('node-todoist');



class Todoist extends Plugin {

  constructor(sam) {
    super(sam);

    this.sam = sam;

    
    todoist.login({email: 'jaap@vermaire.com', password: 'staat in keepass'})
      .then(function(user){
          // console.log('todoist user', user)
        },
        function(e) { console.error(e); });

  }

  getActions(){
    return ['addTask'];
  }

  addTask(sessionId, context, callback){

    console.log('adding task', this.datastore);

    callback();
    
  }
}

module.exports = Todoist;