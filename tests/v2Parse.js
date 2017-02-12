import fs from 'fs'
import test from 'tape'
import moment from 'moment'
import v2Parse from '../src/parser/v2'

test('v2 parser can parse v2 ICS', function(assert) {
  const fixture = fs.readFileSync(__dirname + '/fixtures/v2.ics',
    { encoding: 'UTF-8'})
  const expected = [
    { bins: 'black',          date: new Date("2017-02-28") },
    { bins: 'blue and green', date: new Date("2017-03-07") },
    { bins: 'black',          date: new Date("2017-03-14") },
    { bins: 'blue and green', date: new Date("2017-03-21") },
    { bins: 'black',          date: new Date("2017-03-28") },
    { bins: 'blue and green', date: new Date("2017-04-04") },
    { bins: 'black',          date: new Date("2017-04-11") },
    { bins: 'blue and green', date: new Date("2017-04-20") },
    { bins: 'black',          date: new Date("2017-04-26") },
    { bins: 'blue and green', date: new Date("2017-05-03") },
    { bins: 'black',          date: new Date("2017-05-09") },
    { bins: 'blue and green', date: new Date("2017-05-16") },
    { bins: 'black',          date: new Date("2017-05-23") },
    { bins: 'blue and green', date: new Date("2017-05-31") },
    { bins: 'black',          date: new Date("2017-06-06") },
    { bins: 'blue and green', date: new Date("2017-06-13") },
    { bins: 'black',          date: new Date("2017-06-20") },
    { bins: 'blue and green', date: new Date("2017-06-27") },
    { bins: 'black',          date: new Date("2017-07-04") },
    { bins: 'blue and green', date: new Date("2017-07-11") },
    { bins: 'black',          date: new Date("2017-07-18") },
    { bins: 'blue and green', date: new Date("2017-07-25") },
    { bins: 'black',          date: new Date("2017-08-01") },
    { bins: 'blue and green', date: new Date("2017-08-08") },
    { bins: 'black',          date: new Date("2017-08-15") },
    { bins: 'blue and green', date: new Date("2017-08-22") },
  ]
  const actual = v2Parse(fixture)

  assert.equal(actual.length, expected.length,
    "response has the correct length")

  expected.forEach((exp, idx) => {
    const act = actual[idx]

    assert.equal(act.bins.toLowerCase(), exp.bins,
      "response index " + idx + " bins (" + act.bins  + ") match expected bins (" + exp.bins + ")")
    assert.ok(moment(act.date).isSame(exp.date, 'day'),
      "response index " + idx + " date (" + act.date + ") matches expected date (" + exp.date + ")")
  })
  assert.end()
})
