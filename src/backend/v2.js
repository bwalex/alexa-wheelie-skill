import axios from 'axios';
import v2Parse from '../parser/v2';

export default function v2Fetch(opts) {
  const uprn = opts.uprn,
    addr = opts.address,
    postcode = opts.postcode,
    url = opts.url || "https://www.cambridge.gov.uk/binfeed.ical";

  return new Promise((resolve, reject) => {
    let params = {};

    if (uprn && uprn.length > 0) {
      params.uprn = uprn;
    } else {
      reject("A UPRN is required for the v2 backend")
    }

    axios.get(url, {
      params: params,
    })
      .then((response) => {
        resolve(v2Parse(response.data, new Date()));
      })
      .catch((error) => {
        console.log(error);

        if (error.response) {
          reject("Status " + error.response.status);
        } else {
          reject(error.message);
        }
      });
  });
}
