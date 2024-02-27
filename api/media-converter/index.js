const express = require('express')
const app = express()
const cors = require('cors')
const Jimp = require('jimp')

app.use(
  cors({
    origin: '*',
    exposedHeaders: 'ETAG',
    allowedHeaders: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/resolution', (req, res) => {
  const { w, h, s, q, m } = req.body
  if (!w || isNaN(parseInt(w)))
    return res.status(400).send('w required, must be number')
  if (!h || isNaN(parseInt(w)))
    return res.status(400).send('h required, must be number')
  if (!s) return res.status(400).send('Source parameter required!')
  if (!q) return res.status(400).send('Quality parameter required!')
  try {
    Jimp.read(s, (err, image) => {
      if (err) {
        console.error(err)
        console.error(err.message)
        console.error(Object.keys(err))
        return res.status(500).send(err)
      }
      const mime = m || image._originalMime
      image
        .resize(w, h)
        .quality(q)
        .getBuffer(mime, (buffErr, buffer) => {
          if (buffErr) {
            console.error(buffErr)
            console.error(buffErr.message)
            console.error(Object.keys(buffErr))
            return res.status(500).send(buffErr)
          }
          res.header('ext', image.getExtension())
          res.send(buffer)
        })
    })
  } catch (e) {
    console.error(e)
    console.error(e.message)
    console.error(Object.keys(e))
    res.status(500).send(e)
  }
})

module.exports = {
  path: '/convert',
  handler: app,
}
