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

  getPositiveMood(context){
    console.log('test', context);
    // var moodsArray = ['sad', 'happy', 'high', 'stressed', 'relaxed', 'romantic'];
    //TODO: get mood from context
    var mood = 'sad';
    var positiveMood = '';

    console.log('hallo', mood);
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
    console.log('exit', positiveMood);
    return positiveMood;
  }

  getDateAndOrTime(context){
    console.log(context);
    //TODO: get date or time question from context
    var isDateQuestion = true;

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
    if (isDateQuestion === true) {
      datetime = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
    } else {
      datetime = curHour + " hours " + curMinute + ' minutes ' + curMeridiem;
    }

    console.log(datetime);
    return datetime;
  }

  getJoke(context) {
    joke.getJoke(function(joke){
      console.log(joke);
      //Example output: I wondered why the baseball was getting bigger. Then it hit me.
      return joke;
    });
  }


}

module.exports = JustMakingConversation;