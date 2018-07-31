var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

//AWS.config.update({ region: 'us-east-1' });

const APP_ID = 'amzn1.ask.skill.c7ac36f4-d092-4db6-9343-724876bcc9ce';

//var dynamo = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'RecordTime5';
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('welcome');
    },
    'welcome': function () {
        this.emit(':ask', 'Would you like to sign in or check out?');
    },
    'signIn': function () {

        var table = 'RecordTime';

        var firstNameSlot = this.event.request.intent.slots.firstName.value;
        var lastNameSlot = this.event.request.intent.slots.lastName.value;

        var firstName;
        var lastName;

        // var datetime = new Date().getTime().toString();

        // var dateObj = new Date();
        // var month = dateObj.getMonth() + 1; //months from 1-12
        // var day = dateObj.getDate();
        // var year = dateObj.getFullYear();
        // newdate = month + "/" + day + "/" + year;


        var date = new Date();

        var hour = date.getHours();
        curHour = hour - 5;
        

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
            var params = {
                TableName: 'RecordTime',
                Item: {
                    userId: firstName + lastName,
                    FirstName: firstName,
                    LastName: lastName,
                    date: currentDate,
                    timeIn: currentTime
                }
            };

            console.log(params);

            docClient.put(params, function (err, data) {
                if (err) {
                    console.error("Error", err);
                } else {
                    console.log("Success", data);
                }
            });
            this.emit(':ask', `Welcome back ${firstName} ${lastName}. Don't forget to sign out when you leave.`);
        } else {
            this.emit(':ask', `Sorry I didn\'t quite get that. Sign in by saying "sign in" and then your first and last name`);
        }



        // var params = {
        //     TableName: table,
        //     Item: {
        //         "userId": {
        //             S: firstName + lastName
        //         },
        //         "FirstName": {
        //             S: firstName
        //         },
        //         "LastName": {
        //             S: lastName
        //         },
        //         "date": {
        //             S: datetime
        //         }
        //     }
        // };

        // console.log(params);

        // dynamo.putItem(params, function (err, data) {
        //     if (err) {
        //         console.error("Error", err);
        //     } else {
        //         console.log("Success", data.Item);
        //     }
        // });




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