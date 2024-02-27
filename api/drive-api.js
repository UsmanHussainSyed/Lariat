const { Readable } = require('stream')
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const app = require('express')()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const multer = require('multer')
const upload = multer()
const archiver = require('archiver')
const devLog = process.env.NODE_ENV === 'development' ? console.log : () => {}

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata',
  // 'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive',
  // 'https://www.googleapis.com/auth/drive.appdata',
  // 'https://www.googleapis.com/auth/drive.metadata.readonly',
  // 'https://www.googleapis.com/auth/drive.photos.readonly',
  // 'https://www.googleapis.com/auth/drive.readonly',
  // 'https://www.googleapis.com/auth/drive.scripts',
]

const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID
const secret = process.env.GOOLGE_DRIVE_CLIENT_SECRET
const redirectUrl = process.env.REDIRECT_URI

const oAuth2Client = new google.auth.OAuth2(clientId, secret, redirectUrl)

let drive

const accessDrive = async (req, res) => {
  try {
    const { workspace_id, dam_id } = req.query
    const { oAuth2Client, authUrl } = await authorize(
      [workspace_id, dam_id].join('_')
    )
    drive = google.drive({ version: 'v3', auth: oAuth2Client })
    const param = `&dam_id=${req.query.dam_id}`
    res.send({
      body: 'success',
      url: authUrl + param,
      client: oAuth2Client,
    })
  } catch (e) {
    console.error(JSON.stringify(e))
  }
}

async function authorize(state) {
  const authUrl = await oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state,
    /**
     * scenario 1: when user is already authorized, but still reauthorizes
     * scenario 2: when access token is expired, we need refresh token
     * without prompt: 'consent' only access_token is returned, refresh_token is nt returned
     */
    prompt: 'consent',
  })
  return {
    oAuth2Client,
    authUrl,
  }
}

const exchangeCredential = async (req, res) => {
  const { code } = req.body
  if (!code) {
    return res
      .status(400)
      .send({ message: 'Code is required to exchange token' })
  }
  try {
    const token = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(token.tokens)

    res.send({
      message: 'Success',
      access_token: token.tokens.access_token,
      refresh_token: token.tokens.refresh_token,
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

const refreshAccess = async (req, res) => {
  try {
    const token = await axios.post(
      'https://www.googleapis.com/oauth2/v4/token',
      {
        client_id: clientId,
        client_secret: secret,
        refresh_token: req.body.refresh_token,
        grant_type: 'refresh_token',
      }
    )
    res.json({
      token: token.data,
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

const removeAccess = async (req, res) => {
  try {
    const response = await oAuth2Client.revokeToken(req.body.token)
    res.send(response.data)
  } catch (error) {
    res.status(400).send(error)
  }
}

const deleteFile = async (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId } = req.body

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })
  try {
    const response = await drive.files.delete({
      fileId,
    })
    res.send(response)
  } catch (error) {
    res.status(500).send(error)
  }
}

async function makeDirectories(children, parents) {
  try {
    const parentId = parents && parents[0] ? parents[0] : 'root'
    const res = await drive.files.list({
      corpora: 'user',
      includeItemsFromAllDrives: false,
      orderBy: 'folder,name',
      pageSize: 1000,
      supportsAllDrives: false,
      q:
        "'" +
        parentId +
        "'" +
        ' in parents' +
        " and mimeType='application/vnd.google-apps.folder'" +
        ' and trashed=false' +
        ' and explicitlyTrashed=false' +
        ` and name='${children[0]}'`,
    })
    const exists = res.data.files.length > 0
    let existingId = null
    if (exists) {
      existingId = res.data.files[0].id
    } else {
      const newDir = await createFolder(
        children[0],
        parents && parents[0] ? [parents[0]] : ['root']
      )
      existingId = newDir.data.id
    }
    if (children.length === 1) {
      return existingId
    }
    return await makeDirectories(children.slice(1), [existingId])
  } catch (e) {
    return null
  }
}

async function uploadSingle(file, parents, hierarchy) {
  let lastParentId = null
  if ((hierarchy || '').length) {
    lastParentId = await makeDirectories(hierarchy.split('/'), parents)
  }
  return await drive.files.create({
    resource: {
      name: file.originalname,
      parents: (hierarchy || '').length ? [lastParentId] : parents,
    },
    media: {
      body: Readable.from(file.buffer),
    },
    fields: '*',
  })
}

async function createFolder(name, parents) {
  return await drive.files.create({
    resource: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents,
    },
    // media: {
    //   body: Readable.from(file.buffer.toString()),
    // },
  })
}

const uploadFile = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { files } = req
  const { parent, hierarchy } = req.body

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  uploadSingle(files[0], parent ? [parent] : null, hierarchy)
    .then((response) => {
      res.status(201).send(response.data)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

const createNewFolder = async (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { parent, name } = req.body

  if (!access_token || !name) {
    return res
      .status(400)
      .send({ message: 'Name and access-token is required' })
  }

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  try {
    const response = await createFolder(
      name,
      parent && parent.length ? [parent] : ['root']
    )
    res
      .status(201)
      .send(
        await (
          await drive.files.get({ fields: '*', fileId: response.data.id })
        ).data
      )
  } catch (e) {
    res.status(500).send(e)
  }
}

async function breadcrumbsMapper(accumulator, reducer) {
  if (!reducer) return accumulator
  const { data } = await drive.files.get({
    fileId: reducer,
    fields: 'parents,name,id',
  })
  accumulator.unshift({ name: data.name, id: data.id })
  return data.parents
    ? breadcrumbsMapper(accumulator, data.parents[0])
    : accumulator
}

const getRelativePath = async (data) => {
  await Promise.allSettled(
    data.files.map(async (file) => {
      const prefix = !file.ownedByMe ? 'Shared with me' : ''
      const relativePath = file.parents?.length
        ? (await [...file.parents].reduce(breadcrumbsMapper, []))
            .map((e) => e.name)
            .join('/')
        : ''
      file.relativePath = [prefix, relativePath].filter((e) => e).join('/')
    })
  )
  return data
}

const makeHighlights = (data, term) => {
  if (data.files?.length && term?.length) {
    const regex = new RegExp(term, 'gi')
    data.files.forEach((file) => {
      let html
      if (file.name.toLowerCase().includes(term.toLowerCase())) {
        html = file.name.replace(regex, (str) => `<u>${str}</u>`)
      }
      file.html = html || file.name
    })
  }
  return data
}

const listFiles = (req, res) => {
  const { refresh_token, access_token, next_page_token } = req.headers
  const { parent } = req.headers
  const { mimeType, search = '', location = 'My Drive', highlight } = req.query

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  // eslint-disable-next-line
  const fileProperties = [
    'createdTime',
    'explicitlyTrashed',
    'iconLink',
    'id',
    'kind',
    'mimeType',
    'modifiedTime',
    'modifiedByMeTime',
    'modifiedByMe',
    'name',
    'parents',
    'quotaBytesUsed',
    'trashed',
    'webViewLink',
    'webContentLink',
    'thumbnailLink',
    'iconLink',
    'fileExtension',
    'fullFileExtension',
    'exportLinks',
    'appProperties',
    'capabilities',
    'lastModifyingUser',
    'linkShareMetadata',
    'owners',
    'permissions',
  ]

  let q = 'trashed=false and explicitlyTrashed=false'

  let highlightItems
  if (search.length) {
    q += ` and name contains '${search}'`
    highlightItems = !!highlight
  } else {
    highlightItems = false
    if (mimeType && mimeType.length) {
      q += ` and mimeType='${mimeType}'`
    }
    if (location === 'My Drive') {
      if (parent) {
        q += ` and '${parent}' in parents`
      } else {
        q += ` and 'root' in parents`
      }
    } else if (location === 'Shared with me') {
      if (parent) {
        q += ` and '${parent}' in parents`
      } else {
        q += ` and sharedWithMe=true`
      }
    }
  }

  drive.files
    .list({
      corpora: 'user',
      fields: '*', // `nextPageToken,kind,incompleteSearch,files(${fileProperties.join()})`,
      q,
      // spaces:'drive',
      includeItemsFromAllDrives: false,
      orderBy: 'folder,name',
      pageSize: 100,
      pageToken: next_page_token,
      supportsAllDrives: false,
    })
    .then(async ({ config, headers, data }) => {
      console.log('listfiles->then')
      if (highlightItems) data = await makeHighlights(data, search)
      let result = { ...data }
      if (!search.length) {
        let breadcrumbs = []
        if (location === 'My Drive') {
          breadcrumbs = await [parent || 'root'].reduce(breadcrumbsMapper, [])
        } else if (location === 'Shared with me') {
          breadcrumbs =
            parent && parent.length
              ? await [parent].reduce(breadcrumbsMapper, [])
              : []
          breadcrumbs.unshift({ name: 'Shared with me' })
        }
        result.breadcrumbs = breadcrumbs
      } else {
        result = await getRelativePath(result)
      }
      res.send(result)
    })
    .catch((e) => {
      console.log('listfiles->catch', Object.keys(e))
      console.log(e)
      res.status(500).send(e)
    })
}

const addProperty = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId, key, value } = req.body
  if (!fileId || !access_token || !key) {
    return res.status(400).send({ message: 'fileId|accessToken|key required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .update({
      fileId,
      resource: {
        appProperties: {
          [key]: value,
        },
      },
      fields: 'appProperties',
    })
    .then(({ data }) => {
      res.send(data)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

const download = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId } = req.body
  if (!fileId || !access_token) {
    return res.status(400).send({ message: 'fileId and accessToken required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  // 1. streams as octet-stream
  // check in network preview tab, raw image will be available
  // drive.files
  //   .get({ fileId, alt: 'media' }, { responseType: 'stream' })
  //   .then((r) => {
  //     r.data.on('end', () => res.end())
  //     r.data.on('error', (e) => res.sendStatus(500))
  //     r.data.on('data', (e) => res.write(e))
  //   }).catch(console.error)

  // 2. blob
  // sends raw Blob on response.data,
  // this will not be visible in network preview
  // drive.files
  //   .get({ fileId, alt: 'media' }, { responseType: 'blob' })
  //   .then((r) => {
  //     res.send(r.data)
  //   })
  //   .catch(console.error)

  // 3. base64
  // attempt to send base64 string
  // This is working, but size is too small with proper content-length
  drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' })
    .then((r) => {
      const b64String =
        'data:' +
        r.headers['content-type'] +
        ';base64,' +
        Buffer.from(r.data).toString('base64')
      res.send(b64String)
    })
    .catch((e) => {
      // console.error(e)
    })
}

const downloadRaw = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId } = req.body
  if (!fileId || !access_token) {
    return res.status(400).send({ message: 'fileId and accessToken required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .get(
      {
        fileId,
        alt: 'media',
      },
      { responseType: 'blob' }
    )
    .then(({ data }) => {
      res.type(data.type)
      data.arrayBuffer().then((buf) => res.send(Buffer.from(buf)))
    })
    .catch((e) => {
      res.status(500).send(e)
    })
}

const exportFile = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId, mimeType } = req.body
  if (!fileId || !access_token || !mimeType) {
    return res
      .status(400)
      .send({ message: 'fileId|mimeType|accessToken required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .export(
      {
        fileId,
        mimeType,
      },
      {
        responseType: 'stream',
      }
    )
    .then(({ data, headers }) => {
      res.header('content-type', headers['content-type'])
      data.pipe(res)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
  // direct spreadsheet export fallback if export fails
  // axios
  //   .get(
  //     'https://www.googleapis.com/drive/v3/files/' +
  //       fileId +
  //       '/export?id=' +
  //       fileId +
  //       '&exportFormat=xlsx',
  //     // 'https://docs.google.com/spreadsheets/export?id='+fileId+'&exportFormat=xlsx',
  //     {
  //       headers: { Authorization: 'Bearer ' + access_token },
  //       responseType: 'arraybuffer',
  //     }
  //   )
  //   .then((r) => {
  //     console.log(r.status, typeof r.data, r.data) //r.config
  //     res.header('content-type', r.headers['content-type'])
  //     res.write(r.data)
  //     res.end()
  //   })
  //   .catch((e) => {
  //     console.error(e.response, e.toJSON())
  //     res.sendStatus(500)
  //   })
}

const downloadFolderRecursive = async (
  fileId,
  fileName,
  archive,
  destination,
  parent = '/'
) => {
  const { data } = await drive.files.list({
    pageSize: 1000,
    orderBy: 'folder,name',
    fields: 'files(id,name,mimeType)',
    q:
      "trashed=false and explicitlyTrashed=false and '" +
      fileId +
      "' in parents",
  })
  for await (const file of data.files) {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      await downloadFolderRecursive(
        file.id,
        file.name,
        archive,
        destination,
        parent + file.name + '/'
      )
    } else {
      devLog('downloading `' + `${parent}${file.name}` + '`')
      await drive.files
        .get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' })
        .then((r) => {
          try {
            archive.append(r.data, { name: parent + '/' + file.name })
          } catch (err) {
            devLog('archive append error')
            devLog(JSON.stringify(err, null, 2))
          }
        })
        .catch((e) => {
          // console.error(JSON.stringify(e, null, 2))
          if (e.response.status === 403) {
            console.log('Workspace file')
          } else {
            devLog('`drive.files.get` failed for file: ' + file.name)
          }
        })
    }
  }
}
// eslint-disable-next-line
const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Byte'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
// eslint-disable-next-line
const downloadFolder = async (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId, fileName } = req.query
  if (!fileId || !fileName || !access_token) {
    return res
      .status(400)
      .send({ message: 'fileId, fileName and accessToken required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  const tempStoragePath = path.join(
    __dirname,
    [fileId, Date.now()].join('_') + '.zip'
  )
  const output = fs.createWriteStream(tempStoragePath)
  const archive = archiver('zip', { zlib: { level: 9 } })

  output.on('close', function () {
    devLog(
      'archiver has been finalized and the output file descriptor was closed.'
    )
    res.send(fs.readFileSync(tempStoragePath).toString('base64'))
    fs.unlinkSync(tempStoragePath)
  })
  output.on('end', function () {
    devLog('Data has been drained')
  })
  archive.on('warning', function (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  })
  archive.on('error', function (err) {
    throw err
  })
  // archive.on('progress', progress => {
  //   // res.write(JSON.stringify(progress))
  // })
  archive.pipe(output)
  devLog('preparing to archive')
  await downloadFolderRecursive(fileId, fileName, archive, tempStoragePath)
  devLog('packing now')
  const packingStartTime = Date.now()
  await archive.finalize()
  devLog(
    `done packing... ${formatBytes(archive.pointer())} in ${
      (Date.now() - packingStartTime) / 1000
    }s`
  )
}

const share = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId } = req.body
  if (!fileId || !access_token) {
    return res.status(400).send({ message: 'fileId and accessToken required' })
  }
  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.permissions
    .create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })
    .then((_) => {
      drive.files
        .get({
          fileId,
          fields: 'webViewLink',
        })
        .then((response) => {
          return res.send(response.data)
        })
        .catch((e) => {
          return res.send(e.response)
        })
    })
    .catch((e) => {
      // console.log('cannot share')
      return res.send(e.response)
    })
}

const move = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId, fileName, oldParents = [], newParents = [] } = req.body

  if (!fileId || !fileName.length || !newParents.length) {
    return res
      .status(400)
      .send({ message: 'fileId, parents are required to copy' })
  }

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .update({
      fileId,
      addParents: newParents,
      removeParents: oldParents,
      fields: '*',
    })
    .then((response) => {
      res.send(response.data)
    })
    .catch((e) => {
      res.status(500).send(e.response)
    })
}

const copy = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId, fileName, oldParents = [], newParents = [] } = req.body

  if (!fileId || !fileName.length || !newParents.length) {
    return res
      .status(400)
      .send({ message: 'fileId, parents are required to copy' })
  }

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .copy({
      fileId,
      fields: '*',
      requestBody: {
        name: fileName,
      },
    })
    .then((response) => {
      drive.files
        .update({
          fileId: response.data.id,
          addParents: newParents,
          removeParents: oldParents,
          fields: '*',
        })
        .then((response2) => {
          res.send(response2.data)
        })
        .catch((e) => {
          res.status(500).send(e.response)
        })
    })
    .catch((e) => {
      res.status(500).send(e.response)
    })
}

const getFilePermissions = (req, res) => {
  const { refresh_token, access_token } = req.headers
  const { fileId } = req.query

  if (!fileId) {
    return res
      .status(400)
      .send({ message: 'fileId required to retrieve permissions' })
  }

  const tokenObj = {}
  if (refresh_token) tokenObj.refresh_token = refresh_token
  if (access_token) tokenObj.access_token = access_token
  oAuth2Client.setCredentials(tokenObj)
  drive = google.drive({ version: 'v3', auth: oAuth2Client })

  drive.files
    .get({
      fileId,
      fields: '*',
    })
    .then((response) => {
      res.send(response.data)
    })
    .catch((e) => {
      res.status(500).send(e.response)
    })
}

// Auth Routes
app.get('/access-drive', accessDrive)
app.post('/exchange-credential', exchangeCredential)
app.post('/refresh-access', refreshAccess)
app.post('/remove-access', removeAccess)

// Drive Content Routes
app.get('/permissions', getFilePermissions)
app.get('/list', listFiles)
app.post('/upload', upload.any(), uploadFile)
app.post('/download', download)
app.post('/download-stream', downloadRaw)
app.post('/export', exportFile)
app.get('/download-folder', downloadFolder)
app.post('/create-folder', createNewFolder)
app.post('/share', share)
app.post('/copy', copy)
app.post('/move', move)
app.post('/delete', deleteFile)
app.post('/add-property', addProperty)
// app.listen(8080, () => console.log(`server started at ${8080}`))

module.exports = {
  path: '/driveapi',
  handler: app,
}
