var Alexa = require('alexa-sdk');

const APP_ID = undefined;

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers, responseHandler, hand1Handler, hand2Handler, hand3Handler, wow1Handler, wow2Handler, wow3Handler, 
    sticks1Handler, sticks2Handler, sticks3Handler, conclusionHandler);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit('WelcomeIntent');
  },
  'WelcomeIntent': function () {
    this.handler.state = "_RESPONSE";
    this.emit(':ask','Welcome to comforting comebacks, the number one guide for standing up to bullies '+ 
    'effectively. I will simulate a bully and help you practice the best ways to respond. The following '+
    'comebacks work best when you say them calmly with a hint of sarcasm, then walk away. When I say '+
    'hey, dummy, respond immediately by saying one of the three following phrases. Option 1, talk to '+
    'the hand. Option 2, Wow! Now I know why everyone says that stuff about you. Option 3, sticks and '+
    'stones may break my bones, but words will never hurt me. Pick one phrase and say it back now. '+
    'If you need to hear them again, say repeat.');
  },
  'RepeatIntent': function () {
    this.emit(':ask','Option 1, talk to the hand. Option 2, Wow! Now I know why everyone says that ' +
    'stuff about you. Option 3, Do you think you could star in the next Mean Girls movie? Which ' +
    'phrase would you like to practice?');
  },
  'Unhandled': function () {
    this.emit(':tell',"Sorry, I didn't get that. Try saying: 'alexa open comforting comebacks'");
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
    this.emit('WelcomeIntent');
  },
};
  
var responseHandler = Alexa.CreateStateHandler("_RESPONSE", {
  'ResponseIntent' : function(){
    var hand = this.event.request.intent.slots.hand.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.handler.state = "_HAND1";
      this.emit(':ask', 'Great! You chose talk to the hand. On my mark, repeat the '
      + 'phrase back. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.handler.state = "_WOW1";
      this.emit(':ask', 'Great! You chose, wow! On my mark, repeat the wow phrase back. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.handler.state = "_STICKS1";
      this.emit(':ask', 'Great! On my mark, repeat the sticks phrase back. 3! 2! 1! Hey dummy!');
    } else {
      this.emit('Unhandled');
    }
  },
  'RepeatIntent': function () {
    this.emit(':ask','Option 1, talk to the hand. Option 2, Wow! Now I know why everyone says that ' +
    'stuff about you. Option 3, Do you think you could star in the next Mean Girls movie? Which ' +
    'phrase would you like to practice?');
  },
  'Unhandled': function () {
    this.emit(':ask', 'Sorry, I didn\'t get that. Try repeating one of the three '
    + 'phrases back now. To hear them again, say repeat');
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell','Okay!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell','Goodbye!');
  },
  'AMAZON.StartOverIntent': function(){
    this.emit('WelcomeIntent');
  },
});

var hand1Handler = Alexa.CreateStateHandler("_HAND1",{
  'ResponseIntent': function(){
    //var handResp = this.event.request.intent.slots.hand.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.handler.state = "_HAND2";
      this.emit(':ask', 'Nice! Let\'s try it again. Remember to speak confidently with a hint of sarcasm. '
      + '3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'What was that?');
    }
  },
  'Unhandled': function () {
    this.emit(':ask', 'Sorry, I didn\'t get that. Try repeating the phrase, talk '
    + 'to the hand, again now');
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell','Okay!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell','Goodbye!');
  },
  'AMAZON.StartOverIntent': function(){
    this.emit('WelcomeIntent');
  },
});

var hand2Handler = Alexa.CreateStateHandler("_HAND2",{
  'ResponseIntent': function(){
    //var handResp = this.event.request.intent.slots.hand.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.handler.state = "_HAND3";
      this.emit(':ask', 'Great! One more time! Remember to make eye contact as you speak, then practice walking away. '
      + '3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  },
  'Unhandled': function () {
    this.emit(':ask', 'Sorry, I didn\'t get that. Try repeating the phrase, talk '
    + 'to the hand, again now');
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell','Okay!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell','Goodbye!');
  },
  'AMAZON.StartOverIntent': function(){
    this.emit('WelcomeIntent');
  },
});

var hand3Handler = Alexa.CreateStateHandler("_HAND3",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.handler.state = "_CONCLUSION";
      this.emit(':ask', 'Awesome job! You\'ve successfully completed a round of Comforting Comebacks. Would you like '
      + 'to try again? Say yes or no.');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  },
  'Unhandled': function () {
    this.emit(':ask', 'Sorry, I didn\'t get that. Try repeating the phrase, talk '
    + 'to the hand, again now');
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell','Okay!');
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell','Goodbye!');
  },
  'AMAZON.StartOverIntent': function(){
    this.emit('WelcomeIntent');
  },
});

var wow1Handler = Alexa.CreateStateHandler("_WOW1",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.handler.state = "_WOW2";
      this.emit(':ask', 'Nice! Let\'s try it again. Remember to speak confidently with a hint of sarcasm. '
      + '3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});

var wow2Handler = Alexa.CreateStateHandler("_WOW2",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.handler.state = "_WOW3";
      this.emit(':ask', 'Great! One more time! Remember to make eye contact as you speak, then practice walking away. '
      + '3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});

var wow3Handler = Alexa.CreateStateHandler("_WOW3",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.handler.state = "_CONCLUSION";
      this.emit(':ask', 'Awesome job! You\'ve successfully completed a round of Comforting Comebacks. Would you like '
      + 'to try again? Say yes or no.');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});


var sticks1Handler = Alexa.CreateStateHandler("_STICKS1",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Nice! Let\'s try it again. Remember to speak confidently with a hint of sarcasm. '
      + '3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});

var sticks2Handler = Alexa.CreateStateHandler("_STICKS2",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.emit(':ask', 'Great! One more time! Remember to make eye contact as you speak, then practice walking away. '
      + '3! 2! 1! Hey dummy!');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});

var sticks3Handler = Alexa.CreateStateHandler("_STICKS3",{
  'ResponseIntent': function(){
    var hand = this.event.request.intent.slots.hand.value;
    var wow = this.event.request.intent.slots.wow.value;
    var sticks = this.event.request.intent.slots.sticks.value;
    
    if (hand != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (wow != undefined) {
      this.emit(':ask', 'Oops! Wrong phrase. Please try again. 3! 2! 1! Hey dummy!');
    } else if (sticks != undefined) {
      this.handler.state = "_CONCLUSION";
      this.emit(':ask', 'Awesome job! You\'ve successfully completed a round of Comforting Comebacks. Would you like '
      + 'to try again? Say start over or no.');
    } else {
      this.emit(':ask', 'You seem to have said something different. Please try again. 3! 2! 1! Hey dummy!');
    }
  }
});

var conclusionHandler = Alexa.CreateStateHandler("_CONCLUSION",{
  'AMAZON.YesIntent': function(){
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.NoIntent': function(){
    this.emit('AMAZON.StopIntent');
  },
});