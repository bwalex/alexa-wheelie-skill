import axios from 'axios';
import moment from 'moment';
import cheerio from 'cheerio';

const uprn = process.env.WHEELIE_UPRN,
  addr = process.env.WHEELIE_ADDRESS,
  postcode = process.env.WHEELIE_POSTCODE;

export function fetch(opts) {
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
        let $ = cheerio.load(response.data);
        $('br').replaceWith("&nbsp;");
        $('div').prepend("<p>&nbsp;</p>");
        let text = $('div.page').text().toLowerCase();

        let rx = /(blue\s+and\s+green|black|blue|green)\s+bins\s*[^\d]*\s+([0-3]?[0-9])\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/g

        let data = [];
        var m;

        do {
          m = rx.exec(text);
          if (m) {
            let date = moment(m[2] + " " + m[3], "D MMM");
            console.log(date.format("YYYY-MM-DD") + " bins: " + m[1]);
            data.push({
              date: date.toDate(),
              bins: m[1],
            });
          }
        } while (m);

        resolve(data);
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
