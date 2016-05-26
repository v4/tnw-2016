'use strict';

const Plugin = require('../classes/Plugin');


class Toon extends Plugin {

  constructor() {
    super();

  }

  getActions(){
    return ['adjustEnergy'];
  }

  adjustEnergy(sessionId, context, callback) {
    var energy_usage = this.datastore.energy_usage[0].value;
    var onoff_switch = this.datastore.onoff_switch[0].value;

    if (energy_usage === 'light') {
      if (onoff_switch.toLowerCase() === 'turn off' || onoff_switch.toLowerCase() === 'turn down') {
        // TODO: Turn off the light!
      } else {
        // TODO: Turn on the light!
      }
    } else if (energy_usage === 'heat') {
      if (onoff_switch.toLowerCase() === 'turn off' || onoff_switch.toLowerCase() === 'turn down') {
        // TODO: Turn off the heat!
      } else {
        // TODO: Turn on the heat!
      }
    }
    callback(context);

  }
}

module.exports = Toon;