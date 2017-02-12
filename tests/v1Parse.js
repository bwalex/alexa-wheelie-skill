import fs from 'fs'
import test from 'tape'
import moment from 'moment'
import v1Parse from '../src/parser/v1'

test('v1 parser can parse v1 HTML', function(assert) {
  const fixture = fs.readFileSync(__dirname + '/fixtures/bins_v1.html')
  const expected = [
    { bins: 'blue and green', date: new Date("2017-02-16") },
    { bins: 'black',          date: new Date("2017-02-23") },
  ]
  const actual = v1Parse(fixture)

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
