const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const upload = multer()
const AdmZip = require('adm-zip')

app.use(
  cors({
    origin: '*',
    exposedHeaders: 'ETAG',
    allowedHeaders: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/extract', upload.any(), (req, res) => {
  const { files = [] } = req
  if (!files[0]) {
    return res.status(500).send('file is required')
  }
  try {
    const zip = new AdmZip(files[0].buffer)
    const hierarchy = []
    const entries = zip
      .getEntries()
      .map((e) => ({ name: e.name, entryName: e.entryName }))
    entries.forEach((entry) => {
      if (entry.entryName.includes('/')) {
        const dir = entry.entryName.split('/')[0]
        if (!hierarchy.find((e) => e.name === dir)) {
          hierarchy.push({ name: dir, directory: true })
        }
      } else {
        hierarchy.push({ name: entry.name })
      }
    })
    res.send(hierarchy)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

module.exports = {
  path: '/zip',
  handler: app,
}
