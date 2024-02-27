const express = require('express')
const app = express()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN

if (!accountSid || !authToken) {
  console.error(`TWILIO_SID | TWILIO_TOKEN not found.`)
  return
}

const client = require('twilio')(accountSid, authToken)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/verify', (req, res) => {
  const { n } = req.body
  verifyNumber(n)
    .then((r) => res.send(r))
    .catch(() => res.sendStatus(400))
})

module.exports = {
  path: '/phone-number',
  handler: app,
}

const verifyNumber = (number) => {
  return new Promise((resolve, reject) => {
    client.lookups.v1
      .phoneNumbers(number)
      .fetch()
      .then((r) => resolve(r))
      .catch((e) => reject(e))
  })
}
