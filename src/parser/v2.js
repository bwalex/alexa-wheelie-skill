import ICAL from 'ical.js';
import moment from 'moment';

const binRx = /^((?:black|blue|green)(?:\s+and\s+(?:black|blue|green))?)\s*.*$/i

export default function v2Parse(inputData, date) {
  let cal = new ICAL.Component(ICAL.parse(inputData))
  let events = cal.getAllSubcomponents('vevent')
    .map((c) => new ICAL.Event(c))

  return events.map((e) => ({
    date: e.startDate.toJSDate(),
    bins: e.summary.replace(binRx, "$1"),
  }))
    .sort((a,b) => (moment(a.date).valueOf() - moment(b.date).valueOf()))
    .filter((e) => !date || moment(e.date).isSameOrAfter(date, 'day'))
}
