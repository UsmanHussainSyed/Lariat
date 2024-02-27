const path = require('path')
const fs = require('fs')
const express = require('express')
const axios = require('axios')
const archiver = require('archiver')
const multer = require('multer')
const upload = multer()
const bodyParser=require('body-parser')
const app = express()
// app.use(express.json())
app.use(bodyParser.json({ limit: '50mb'}))

const apiKey = process.env.OPENAI_KEY
console.log({ OPENAI_KEY: apiKey })
let OPENAI_PER_API_IMAGE_GENERATE_COUNT =
  process.env.OPENAI_PER_API_IMAGE_GENERATE_COUNT
try {
  OPENAI_PER_API_IMAGE_GENERATE_COUNT = OPENAI_PER_API_IMAGE_GENERATE_COUNT
    ? parseInt(OPENAI_PER_API_IMAGE_GENERATE_COUNT)
    : 2
} catch (e) {
  OPENAI_PER_API_IMAGE_GENERATE_COUNT = 2
}

if (!apiKey) {
  console.error(`OPENAI_KEY not found in .env, exiting..`)
  process.exit(1)
}

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey,
})

const openai = new OpenAIApi(configuration)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.disable('x-powered-by')

const sizes = {
  256: '256x256',
  512: '512x512',
  1024: '1024x1024',
}
/**
 * Create an image based on a text prompt.
 * Generated images can have sizes 256x256, 512x512 or 1024x1024.
 * @params prompt string, required. description max 1000 chars
 * @params n integer, optional. number of images to generate, default 1, must be between 1 and 10
 * @params size string, optional. default 1024x1024
 * @params response_format string, optional. url or b64_json. default url
 * @params user string, optional. https://platform.openai.com/docs/api-reference/images/create#images/create-user
 */
app.post('/', async (req, res) => {
  const { text, response_format = 'url' } = req.body
  if (!text) return res.status(400).send('Missing required parameter `text`')
  const response = await openai
    .createImage({
      prompt: text,
      n: OPENAI_PER_API_IMAGE_GENERATE_COUNT,
      size: sizes[1024],
      response_format,
    })
    .catch((e) => {
      // console.log(e.response)
      // console.log(Object.keys(e))
      return res
        .status(e.response?.status || 500)
        .send(e.response?.data?.error || e.toJSON())
    })
  res.send(response.data)
})

const { Readable } = require('stream')
function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;
}

/**
 * Creates an edited or extended image given an original image and a prompt.
 * The uploaded image and mask must both be square PNG images less than 4MB in size, and also must have the same dimensions as each other.
 * ---------------------------------------------------------------------------------------------------------
 * @params image string, required. https://platform.openai.com/docs/api-reference/images/create-edit#images/create-edit-image
 * The image to edit. Must be a valid PNG file OR buffer, less than 4MB, and square.
 * @params mask string, optional.
 * If mask is not provided, image must have transparency, which will be used as the mask.
 * An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where {image} should be edited.
 * Must be a valid PNG file OR buffer, less than 4MB, and have the same dimensions as {image}.
 * @params prompt string, required.
 * A text description of the desired image(s). The maximum length is 1000 characters.
 * @params n integer, optional. number of images to generate, default 1, must be between 1 and 10.
 * @params size string, optional. default 1024x1024
 * @params response_format string, optional. url or b64_json. default url
 * @params user string, optional. https://platform.openai.com/docs/api-reference/images/create-edit#images/create-edit-user
 */
app.post('/extend', upload.any(), async (req, res) => {
  // response_format = url, gives openai url which prevents export from canvas
  console.log({b: req.body})
  const { text = 'space', response_format = 'b64_json' } = req.body
  fs.writeFileSync(path.join(__dirname, 'image.png'), req.files[0].buffer)
  const response = await openai
    .createImageEdit(
      fs.createReadStream(path.join(__dirname, 'image.png')),
      text,
      fs.createReadStream(path.join(__dirname, 'image.png')),
      4,
      sizes[1024],
      'b64_json' // response_format
    )
    .catch((e) => {
      console.log(e)
      if (e.response) {
        // console.log({ data: e?.response?.data })
        return res.status(e.response.status || 500).send(e.response.data)
      } else {
        // console.log({ msg: e.message })
        return res.status(500).send(e.message)
      }
    })
    .finally(() => {
      try {
        fs.unlinkSync(path.join(__dirname, 'image.png'))
      } catch (e) {}
    })
  // console.log(response.data.data[0])
  res.send(response.data)
})
/**
 * Creates a variation of a given image.
 * @params image
 * @params n
 * @params size
 * @params response_format
 * @params user, https://platform.openai.com/docs/api-reference/images/create-variation#images/create-variation-user
 */
app.post('/variations', (req, res) => {
  // const { image, response_format = 'url' } = req.query
  // const response = await openai
  //   .createImageVariation(image, 10, sizes[1024], response_format)
  //   .catch((e) => {
  //     console.log(e)
  //     console.log(Object.keys(e))
  //     res.status(500).send(e)
  //   })
  res.send('')
})

app.get('/download', (req, res) => {
  const { uri } = req.headers
  const urls = uri.split('&!').map((e) => decodeURIComponent(e))
  if (!urls.length) return res.status(400)

  if (urls.length === 1) return download(urls[0], res)

  return downloadZip(urls, res)
})

module.exports = {
  path: '/generate-image',
  handler: app,
}

function download(url, res) {
  axios({
    method: 'get',
    url,
    responseType: 'arraybuffer',
  })
    .then((response) => {
      res.type(response.headers['content-type'])
      res.send(Buffer.from(response.data))
    })
    .catch((error) => {
      const status = error?.response?.status || 500
      res.status(status).send(error.message)
    })
}

function downloadZip(urls, res) {
  const tempStoragePath = path.join(__dirname, Date.now() + '.zip')
  const output = fs.createWriteStream(tempStoragePath)
  const archive = archiver('zip', { zlib: { level: 9 } })
  output.on('close', function () {
    console.log(
      'archiver has been finalized and the output file descriptor was closed.'
    )
    res.download(tempStoragePath, function (err) {
      if (err) console.error('download error', err)
      try {
        fs.unlinkSync(tempStoragePath)
      } catch (e) {
        console.error('unlink error', e)
      }
    })
  })
  output.on('end', function () {
    console.log('Data has been drained')
  })
  archive.on('warning', function (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  })
  archive.on('error', function (err) {
    throw err
  })
  archive.pipe(output)
  const promises = urls.map((url) =>
    axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    })
      .then((response) => response.data)
      .catch((error) => error)
  )
  Promise.allSettled(promises)
    .then(async (resp) => {
      console.log('packing now')
      const packingStartTime = Date.now()
      for await (const file of resp.filter(
        (e) => e.status === 'fulfilled' && e.value
      )) {
        archive.append(file.value, { name: 'file_' + Date.now() + '.png' })
      }
      await archive.finalize()
      console.log(
        `done packing... ${formatBytes(archive.pointer())} in ${
          (Date.now() - packingStartTime) / 1000
        }s`
      )
    })
    .catch((errp) => {
      console.error({ errp })
      res.status(500).send(errp)
    })
}

const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Byte'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
