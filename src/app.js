import moment from 'moment';
import alexa from 'alexa-app';
import v1Fetch from './backend/v1';
import v2Fetch from './backend/v2';

let app = new alexa.app("wheelie");

function respond(alexa, num) {
  let p = null

  if (process.env.WHEELIE_VERSION === "1") {
    p = v1Fetch({
      uprn: process.env.WHEELIE_UPRN,
      address: process.env.WHEELIE_ADDRESS,
      postcode: process.env.WHEELIE_POSTCODE,
    })
  } else {
    p = v2Fetch({
      uprn: process.env.WHEELIE_UPRN,
      address: process.env.WHEELIE_ADDRESS,
      postcode: process.env.WHEELIE_POSTCODE,
    })
  }

  p
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
