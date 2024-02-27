const app = require('express')()
const cors = require('cors')

const axios = require('axios')
const useragent = require('express-useragent')
app.use(useragent.express())

app.use(
  cors({
    origin: '*',
  })
)

app.get('/browser-os', async (req, res) => {
  try {
    const geoLocationApiUrl = `https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0`
    const { data: userLocation } = await axios.get(geoLocationApiUrl)
    const userAgent = req.useragent
    res.send({ userLocation, userAgent })
  } catch (e) {
    res.send({ userLocation: null, userAgent: null })
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
