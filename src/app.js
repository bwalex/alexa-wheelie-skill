import moment from 'moment';
import alexa from 'alexa-app';
import {fetch} from './backend';

let app = new alexa.app("wheelie");

function respond(alexa, num) {
  fetch()
    .then((collections) => {
      if (collections.length == 0) {
        alexa.say("Collection information is not available");
      } else {
        num = (collections.length >= num) ? num : collections.length;

        if (num > 1) {
          alexa.say("The next " + num + " collections are:");
        }

        for (let i = 0; i < num; i++) {
          let c = collections[i];
          if (num > 1) {
            alexa.say("" + c.bins + " bins on " + moment(c.date).format("dddd Do") + " of " + moment(c.date).format("MMMM") + ", ");
          } else {
            alexa.say("The " + c.bins + " bins will be collected on " + moment(c.date).format("dddd Do") + " of " + moment(c.date).format("MMMM") + ".");
          }
        }
      }
      alexa.send();
    })
    .catch((error) => {
      alexa.say("Error " + error + " occurred").send();
    });
}

app.intent("getNextCollection", {},
  function(req, alexaResponse) {
    respond(alexaResponse, 1);

    return false;
  }
);

app.intent("getNextCollections", {},
  function(req, alexaResponse) {
    respond(alexaResponse, req.slot("number") || 1);

    return false;
  }
);

export default app;
