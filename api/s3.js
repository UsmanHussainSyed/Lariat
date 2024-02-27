import axios from 'axios'
const express = require('express')
const app = express()
const cors = require('cors')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const upload = multer()
const { bufferToReadableStream: toStream } = require('./shared')

app.use(
  cors({
    origin: '*',
    exposedHeaders: 'ETAG',
    allowedHeaders: '*',
  })
)
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const BUCKET_NAME = process.env.AWS_BUCKET

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  signatureVersion: 'v4',
  // region: process.env.AWS_DEFAULT_REGION,
})

// Returns configuration for a bucket
app.get('/getBucketConfig', (req, res) => {
  s3.getBucketCors({ Bucket: BUCKET_NAME }, function (err, data) {
    if (err) {
      res.status(500).send(JSON.stringify(err))
    } else if (data) {
      res.send(JSON.stringify(data.CORSRules))
    }
  })
})

// Updates configuration for a bucket to perform chunked uploads
app.post('/updateBucketConfig', (req, res) => {
  const params = {
    Bucket: BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
          AllowedOrigins: ['*'],
          AllowedHeaders: ['*'],
          ExposeHeaders: ['ETAG'],
          //   ID: 'STRING_VALUE',
          //   MaxAgeSeconds: 'NUMBER_VALUE',
        },
      ],
    },
    // ContentMD5: 'STRING_VALUE',
    // ExpectedBucketOwner: 'STRING_VALUE',
  }

  s3.putBucketCors(params, function (err, data) {
    if (err) res.status(500).send(JSON.stringify(err))
    else res.send(JSON.stringify(data))
  })
})

// This endpoint initiates a chunked upload session.
// for direct upload, POST to /upload.
app.get('/start-upload', (req, res) => {
  const { workspaceId, fileType } = req.query
  if (!workspaceId || typeof fileType !== 'string') {
    return res.status(400).send({
      message: 'Missing required parameter workspaceId | fileType',
    })
  }
  const assetId = uuidv4()
  const fullKey = workspaceId + '/digital_assets/' + assetId

  const params = {
    Bucket: BUCKET_NAME,
    Key: fullKey,
    ContentType: fileType,
  }
  s3.createMultipartUpload(params, (err, uploadData) => {
    if (err) {
      return res.status(500).send(err)
    }
    if (uploadData && uploadData.UploadId) {
      return res.send({
        uploadId: uploadData.UploadId,
        assetId,
      })
    }
    res.status(500)
  })
})

// Generates url to upload a part of a chunked upload session
app.get('/get-upload-url', (req, res) => {
  const { assetId, PartNumber, UploadId, workspaceId } = req.query
  if (!assetId || !workspaceId || !PartNumber || !UploadId) {
    return res.status(400).send({
      message:
        'Missing required parameter assetId | workspaceId | PartNumber | UploadId',
    })
  }
  const fullKey = workspaceId + '/digital_assets/' + assetId
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fullKey,
      PartNumber,
      UploadId,
    }
    return new Promise((resolve, reject) =>
      s3.getSignedUrl('uploadPart', params, (err, presignedUrl) => {
        if (err) {
          reject(res.status(500).send(err))
        } else {
          resolve(res.send({ presignedUrl }))
        }
      })
    )
  } catch (err) {
    res.status(500).send(err)
  }
})

// Generates a signed s3 url for an asset
app.get('/get-signed-url', (req, res) => {
  const { assetId, workspaceId } = req.query
  if (!assetId || !workspaceId) {
    return res.status(400).send({
      message: 'Missing required parameter assetId | workspaceId',
    })
  }
  const fullKey = workspaceId + '/digital_assets/' + assetId
  try {
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: BUCKET_NAME,
      Key: fullKey,
      Expires: 86400,
    })
    res.send(signedUrl)
  } catch (e) {
    res.status(500).send(e)
  }
})

// Ends an upload session
app.post('/complete-upload', (req, res) => {
  const { assetId, UploadId, Parts, workspaceId } = req.body
  if (!assetId || !workspaceId || !UploadId || !Parts) {
    return res.status(400).send({
      message:
        'Missing required parameter assetId | workspaceId | UploadId | Parts',
    })
  }
  const fullKey = workspaceId + '/digital_assets/' + assetId
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fullKey,
      MultipartUpload: {
        Parts,
      },
      UploadId,
    }
    return new Promise((resolve, reject) =>
      s3.completeMultipartUpload(params, (err, data) => {
        if (err) {
          return reject(res.status(500).send(err))
        }
        resolve(res.send({ data }))
      })
    )
  } catch (err) {
    return res.status(500).send(err)
  }
})

// Deletes an asset from s3
app.delete('/delete-asset', (req, res) => {
  const { assetId, workspaceId } = req.body
  if (!assetId || !workspaceId) {
    return res.status(400).send({
      message: 'Missing required parameter assetId | workspaceId',
    })
  }
  const fullKey = workspaceId + '/digital_assets/' + assetId

  s3.deleteObject(
    {
      Bucket: BUCKET_NAME,
      Key: fullKey,
    },
    (err, data) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.send(data)
    }
  )
})

// This endpoint uploads a file in a single attempt,
// for large files and/or chunked uploads consider GET on '/start-upload'
app.post('/upload', upload.any(), (req, res) => {
  const {
    workspaceId,
    compress,
    key = '',
    location,
    isPublic = false,
  } = req.query
  const [file] = req.files

  if (!workspaceId) {
    return res.status(400).send({
      message: 'Missing required parameter workspaceId',
    })
  }
  if (!file) {
    return res.status(400).send({
      message: 'Missing required parameter file',
    })
  }
  const assetId = key && key.length ? key.trim() : uuidv4()
  const fullKey =
    workspaceId +
    ((location || '').length
      ? location
      : '/digital_assets/' + (compress ? 'compress/' : '') + assetId)
  try {
    const uploadArgs = {
      Bucket: BUCKET_NAME,
      Key: fullKey,
      ContentType: file.mimetype,
      Body: toStream(file.buffer),
    }
    if (isPublic) uploadArgs.ACL = 'public-read'
    s3.upload(uploadArgs, null, (err, data) => {
      if (err) {
        return res.status(500).send(err.response)
      }
      res.send({
        ...data,
        assetId,
        signedUrl: s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: fullKey,
          Expires: 86400,
        }),
      })
    })
  } catch (e) {
    res.status(500).send(e.response)
  }
})

app.get('/resource', (req, res) => {
  const url = decodeURIComponent((req.query || {}).url || '')
  axios({
    method: 'get',
    url,
    responseType: 'arraybuffer',
  })
    .then((response) => {
      const b64String =
        'data:' +
        response.headers['content-type'] +
        ';base64,' +
        Buffer.from(response.data).toString('base64')
      res.type(response.headers['content-type'])
      res.send(b64String)
    })
    .catch((error) => {
      const status = error?.response?.status || 500
      res.status(status).send(error.message)
    })
})

module.exports = {
  path: '/s3',
  handler: app,
}
