var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');
//var DOC = require('dynamodb-doc');

AWS.config.update({ region: 'us-east-1' });

const APP_ID = 'amzn1.ask.skill.914bfa13-193e-4bfc-82bf-4d6ef6f54654';

var dynamo = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'dummy';
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('welcome');
    },
    'welcome': function () {
        this.emit(':ask', 'Would you like to sign in or sign out?');
    },
    'signIn': function () {

        var table = 'TSBtimesheet';

        var firstNameSlot = this.event.request.intent.slots.firstName.value;
        var lastNameSlot = this.event.request.intent.slots.lastName.value;

        var firstName;
        var lastName;
        var currentDate;
        var currentTime;


        var date = new Date();
        var hour = date.getHours();
        var curHour = hour - 5;
        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        currentDate = month + "/" + day + "/" + year;
        currentTime = curHour + ":" + min + ":" + sec;


        if (firstNameSlot && lastNameSlot) {
            firstName = firstNameSlot;
            lastName = lastNameSlot;
        } else {
            this.emit('ask', 'Sorry, I didn\'t quite get that. Please say: my name is, and then state your first and last name');
        }

        if (firstName && lastName) {
            this.attributes['FirstName'] = firstName;
            this.attributes['LastName'] = lastName;
            this.attributes['userId'] = firstName + lastName;
            this.attributes['date'] = currentDate;
            this.attributes['timeIn'] = currentTime;
            //this.attributes['random'] = randomVal;

            var params = {
                TableName: 'TSBtimesheet',
                Item: {
                    'userId': {
                        S: firstName + lastName
                    },
                    'date': {
                        S: currentDate
                    },
                    'FirstName': {
                        S: firstName
                    },
                    'LastName': {
                        S: lastName
                    },
                    'timeIn': {
                        S: currentTime
                    }
                }
            };

            console.log(params);

            dynamo.putItem(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data.Item);
                }
            });
            this.emit(':tell', `Welcome back ${firstName}!`);
        } else {
            this.emit(':ask', `Sorry I didn\'t quite get that. Sign in by saying "sign in" and then your first and last name`);
        }

    },
    'signOut': function () {

        var table = 'TSBtimesheet';

        var firstNameSlot = this.event.request.intent.slots.firstName.value;
        var lastNameSlot = this.event.request.intent.slots.lastName.value;

        var firstName;
        var lastName;

        var date = new Date();
        var hour = date.getHours();
        var curHour = hour - 5;
        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        var currentDate = month + "/" + day + "/" + year;
        var currentTime = curHour + ":" + min + ":" + sec;


        if (firstNameSlot && lastNameSlot) {
            firstName = firstNameSlot;
            lastName = lastNameSlot;
        } else {
            this.emit('ask', 'Sorry, I didn\'t quite get that. Please say: my name is, and then state your first and last name');
        }

        if (firstName && lastName) {
            this.attributes['FirstName'] = firstName;
            this.attributes['LastName'] = lastName;
            this.attributes['userId'] = firstName + lastName;
            this.attributes['date'] = currentDate;
            this.attributes['timeOut'] = currentTime;
            var params = {
                TableName: 'TSBtimesheet',
                Key: {'userId': firstName + lastName, 'date': currentDate},
                AttributeUpdates: {
                    'timeOut' : {
                        Value: currentTime
                    },
                }
            };
            

            console.log(params);

            docClient.update(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data);
                }
            });
            this.emit(':tell', `See you later ${firstName}!`);
        } else {
            this.emit(':ask', `Sorry I didn\'t quite get that. Sign out by saying "sign out" and then your first and last name`);
        }
    },
   
    'logEntries': function () {
        this.emit(':tell', 'Entries have been logged');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Sorry. I didn\'t understand. Would you like to sign in, or check out');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'What can I help you with?', 'How can I help?');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Okay!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StartOverIntent': function () {
        this.emit('welcome');
    }
};