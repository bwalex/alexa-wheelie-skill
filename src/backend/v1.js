import axios from 'axios';
import v1Parse from '../parser/v1';

export default function v1Fetch(opts) {
  const uprn = opts.uprn,
    addr = opts.address,
    postcode = opts.postcode;

  return new Promise((resolve, reject) => {
    let params = {};

    if (uprn && uprn.length > 0) {
      params.uprn = uprn;
    } else {
      params.address = addr;
      params.postcode = postcode;
    }

    axios.get("http://bins.cambridge.gov.uk/bins.php", {
      params: params,
    })
      .then((response) => {
        resolve(v1Parse(response.data));
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
