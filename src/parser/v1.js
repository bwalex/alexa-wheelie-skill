import cheerio from 'cheerio';
import moment from 'moment';

export default function v1Parse(inputData) {
  let $ = cheerio.load(inputData);
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

  return data;
}
