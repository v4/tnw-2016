'use strict';

const Plugin = require('../classes/Plugin');


class Deezer extends Plugin {

  constructor() {
    super();

  }

  getActions(){
    return ['playMusic', 'playFavoriteSong'];
  }

  playMusic(sessionId, context, callback){
    var mood = this.datastore.mood[0].value;
    var songtitle = this.datastore.songtitle[0].value;
    var artist = this.datastore.artist[0].value;
    // var album = this.datastore.album[0].value;

    if (artist !== undefined && songtitle !== undefined) {
      // TODO: play songtitle
      context.songtitle = 'Daft Punkt - Harder';
    } else if (mood !== undefined) {
      // TODO: play a song with the mood category
      context.songtitle = 'Daft Punkt - Harder';
    } else {
      context.songtitle = 'No songtitle is found';
    }

    callback(context);
  }

  playFavoriteSong(sessionId, context, callback) {
    // TODO: play favorite song
    context.songtitle = 'Daft Punkt - Harder';
    callback(context);
  }
}

module.exports = Deezer;