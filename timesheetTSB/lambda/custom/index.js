var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

var mysql = require('mysql');

const APP_ID = 'amzn1.ask.skill.c7ac36f4-d092-4db6-9343-724876bcc9ce';



exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};



var handlers = {
  'LaunchRequest': function () {
    this.emit('welcome');
  },
  'welcome': function() {
    this.emit(':ask', 'Would you like to sign in, or check out?');
  },
  'signIn': function() {
    console.log("Starting connection");
    var con = mysql.createConnection({
        host: 'thestudybarinstance.clstjpeu5zis.us-east-1.rds.amazonaws.com',
        user: 'asenol',
        password: 'T$Bpassword',
        database: 'theStudyBarDB',
        table: 'timesheet'
      });
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO timesheet (firstName, lastName) VALUES ('Andrew', 'Senol')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
      
  },
  'Unhandled': function () {
    this.emit(':ask','Sorry. I didn\'t understand. Would you like to sign in, or check out');
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
