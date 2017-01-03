var utterances = require("alexa-utterances"),
    _ = require("lodash");

var dictionary = {
};

var intents = [
  {
    "intent": "getNextCollection",
    "dictionary": dictionary,
    "slots": {
    },
    "templates": [
      "{when|about} the next {bin |}collection{s|}{ is| takes place|}",
      "{when|about} the {next |}bins are{ collected| picked up|}"
    ]
  },

  {
    "intent": "getNextCollections",
    "dictionary": dictionary,
    "slots": {
      "number" : "NUMBER"
    },
    "templates": [
      "{when|about} the next {1-4|number} {bin |}collection{s|}{ are| take place|}",
    ]
  },
];

exports.intentSchema = {
  "intents": intents.map(function(intent) {
    return {
      intent: intent.intent,
      slots: _.map(intent.slots, function(v, k) {
        return {
          name: k,
          type: v
        }
      })
    };
  })
};

exports.sampleUtterances = _.flatMap(intents, function(intent) {
  return _.flatMap(intent.templates, function(template) {
    return _.map(utterances(template, intent.slots, intent.dictionary, false), function(utterance) {
      return intent.intent + " " + utterance;
    });
  });
});
