'use strict';

const Plugin = require('../classes/Plugin');
const todoist = require('node-todoist');



class Todoist extends Plugin {

  constructor() {
    super();

    todoist.login({email: 'jaap@vermaire.com', password: 'staat in keepass'})
      .then(function(user){
          console.log('todoist user', user)
        },
        function(e) { console.error(e); });

  }

  getActions(){
    return ['addTask'];
  }

  addTask(taskText){
    
  }
}

module.exports = Todoist;