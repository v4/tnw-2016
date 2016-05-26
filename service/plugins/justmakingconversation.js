'use strict';

const Plugin = require('../classes/Plugin');
const joke = require('jokesearch');


class JustMakingConversation extends Plugin {

  constructor() {
    super();

  }

  getActions(){
    return ['getPositiveMood','getDateAndOrTime', 'getJoke'];
  }

  getPositiveMood(sessionId, context, callback){
    // var moodsArray = ['sad', 'happy', 'high', 'stressed', 'relaxed', 'romantic'];
    var mood = this.datastore.mood[0].value;
    // console.log('mood', mood);
    var positiveMood = '';

    switch(mood) {
      case 'sad':
        positiveMood = 'happy';
        break;
      case 'high':
        positiveMood = 'relaxed';
        break;
      case 'stressed':
        positiveMood = 'relaxed';
        break;
      case 'happy':
        positiveMood = 'more happy';
        break;
      case 'relaxed':
        positiveMood = 'even more relaxed';
        break;
      case 'romantic':
        positiveMood = 'more romantic';
        break;
      default:
        positiveMood = 'happy';
    }

    context.positiveMood = positiveMood;
    callback(context);
  }

  getDateAndOrTime(sessionId, context, callback){
    var datetime_service = this.datastore.datetime_service[0].value;
    // console.log('datetime_service', datetime_service);

    var objToday = new Date(),
      weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      dayOfWeek = weekday[objToday.getDay()],
      domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
      dayOfMonth = (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
      months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear(),
      curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
      curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
      curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

    var datetime = '';
    if (datetime_service.toLowerCase().indexOf('time') === -1) {
      datetime = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
    } else {
      datetime = parseInt(curHour, 10) + " " + curMeridiem + ' and ' + parseInt(curMinute, 10) + ' minutes';
    }

    // console.log(datetime);
    context.datetimetext = datetime;
    callback(context);
  }

  getJoke(sessionId, context, callback) {
    joke.getJoke(function(joke){
      console.log(joke);
      //Example output: I wondered why the baseball was getting bigger. Then it hit me.
      context.jokeText = joke;
      callback(context);
    });
  }


}

module.exports = JustMakingConversation;