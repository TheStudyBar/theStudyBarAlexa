var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');
//var mysql = require('mysql');
AWS.config.update({region: 'us-east-1'});

const APP_ID = 'amzn1.ask.skill.c7ac36f4-d092-4db6-9343-724876bcc9ce';

var dynamo = new AWS.DynamoDB({apiVersion: '2012-10-08'});

//this is a test for both AWS and git

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  //alexa.dynamoDBTableName = 'StudyBarTimes';
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers, FirstNameOne, LastNameOne);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('welcome');
  },
  'welcome': function() {
    //this.handler.state = "_INTRO";
    this.emit(':ask', 'Welcome  to the Study Bar. Please choose from the following options. General information, student '+
    'services, business services, amenities, or user management. For andrew only, say test name');
  },
  'Unhandled': function () {
    this.emit(':ask',"Sorry, I didn't get that. Try saying: 'general information', 'student services', 'business services', 'amenities', 'returning user', or "+
    "'create new user'");
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask','What can I help you with?', 'How can I help?');
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell','Okay!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell','Goodbye!');
  },
  'AMAZON.StartOverIntent': function(){
    this.emit('welcome');
  }
};
