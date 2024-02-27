/**
 * Express middleware to handle all the Box communication
 */
const { Readable } = require('stream')
const express = require('express')
const app = express()
const BoxSDK = require('box-node-sdk')
const axios = require('axios')
const multer = require('multer')
const upload = multer()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * Initializes BoxSdk
 */
const sdk = new BoxSDK({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
})

let client

/**
 * Handler to integrate a box account
 */
app.get('/connect', (req, res) => {
  const { workspaceId, instanceId } = req.query
  if (!workspaceId || !instanceId) {
    return res.status(500).send({
      message: 'Missing required parameter workspaceId | instanceId',
    })
  }
  /**
   * https://developer.box.com/guides/authentication/oauth2/with-sdk/#2-redirect-user
   * If you configured multiple redirect URIs for the application, the authorization URL
   * must include the redirect_uri parameter matching one of the URIs configured in the developer console.
   * If the parameter is not specified, the user will see a redirect_uri_missing error and will not be
   * redirected back to the app after granting application access.
   */
  let redirect_uri = process.env.BASE_URL
  if (!redirect_uri.endsWith('/')) redirect_uri = redirect_uri + '/'
  redirect_uri += 'box-auth-redirect'
  const authorize_url = sdk.getAuthorizeURL({
    response_type: 'code',
    state: [workspaceId, instanceId].join('_'),
    redirect_uri: process.env.BOX_AUTH_REDIRECT,
  })

  res.send(authorize_url)
})

/**
 * Generates access token for a box client
 */
app.post('/grant-me', (req, res) => {
  const { code = '' } = req.body
  if (!code.length) {
    return res.status(400).send({
      message: 'Missing required parameter code',
    })
  }
  sdk.getTokensAuthorizationCodeGrant(code, null, (err, tokenInfo) => {
    if (err) {
      return res.status(500).send(err)
    }
    client = sdk.getPersistentClient(tokenInfo)
    res.send({ tokenInfo })
  })
})

/**
 * Refresh access token and get a new access token
 */
app.post('/refresh-token', (req, res) => {
  const { refresh_token } = req.body
  if (!refresh_token) {
    return res.status(400).send({
      message: 'Missing required parameter refresh_token',
    })
  }
  axios
    .post(
      'https://api.box.com/oauth2/token/',
      {
        client_id: process.env.BOX_CLIENT_ID,
        client_secret: process.env.BOX_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-url-encoded',
        },
      }
    )
    .then((r) => {
      res.send(r.data)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
})

/**
 * Revokes a client integration
 */
app.post('/revoke-token', (req, res) => {
  const { accessToken, refreshToken, accessTokenTTLMS, acquiredAtMS } = req.body
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client
      .revokeTokens()
      .then((r) => res.sendStatus(200))
      .catch((e) => {
        res.status(500).send(e)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Fetches user information for a box client
 */
app.get('/user', (req, res) => {
  const { accessToken, refreshToken, accessTokenTTLMS, acquiredAtMS } =
    req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  // default fields returned from box
  const baseFilters = [
    'address',
    'avatar_url',
    'created_at',
    'id',
    'language',
    'job_title',
    'login',
    'max_upload_size',
    'modified_at',
    'name',
    'notification_email',
    'phone',
    'space_amount',
    'space_used',
    'status',
    'timezone',
    'type',
  ]
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.users
      .get(client.CURRENT_USER_ID, {
        fields: [...baseFilters, 'enterprise'].join(','),
      })
      .then((r) => res.send(r))
      .catch((e) => {
        if (e?.response?.authExpired) {
          return res.status(401).send({ authExpired: true })
        }
        res.status(500).send(e.response)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Fetches file info
 */
app.get('/files/:id', (req, res) => {
  const { accessToken, refreshToken, accessTokenTTLMS, acquiredAtMS, entId } =
    req.query

  const fileId = req.params?.id
  if (
    !accessToken ||
    !refreshToken ||
    !accessTokenTTLMS ||
    !acquiredAtMS ||
    !fileId
  ) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS | id',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }

  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .get(fileId, {
        fields:
          [
            'created_at',
            'created_by',
            'modified_at',
            'modified_by',
            'description',
            'etag',
            'id',
            'item_collection',
            'owned_by',
            'parent',
            'path_collection',
            'shared_link',
            'size',
            'type',
            'name',
            'path_collection',
            'extension',
            'item_status', // active,trashed,deleted
            'metadata',
            'permissions',
            'representations',
            'tags',
            'uploader_display_name',
            'allowed_invitee_roles',
          ].join(',') + (entId ? `,metadata.enterprise_${entId}.DAM` : ''),
      })
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(e.response)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Lists files and folders
 */
app.get('/list-files', async (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    parent = 0,
    offset = 0,
    limit = 100,
    includeFields = [],
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }

  const fields =
    includeFields && includeFields.length
      ? includeFields.trim()
      : [
          'created_at',
          'created_by',
          'modified_at',
          'modified_by',
          'description',
          'etag',
          'id',
          'item_collection',
          'owned_by',
          'parent',
          'path_collection',
          'shared_link',
          'size',
          'type',
          'name',
          'path_collection',
          'extension',
          'item_status', // active,trashed,deleted
          'metadata',
          'permissions',
          'representations',
          'tags',
          'uploader_display_name',
          'allowed_invitee_roles',
        ].join(',')
  try {
    client = sdk.getPersistentClient(tokenInfo)
    const data = await client.users.get(client.CURRENT_USER_ID, {
      fields: 'enterprise',
    })
    const userEntId = data?.enterprise?.id
    const queryFields = userEntId
      ? fields + `,metadata.enterprise_${userEntId}.DAM`
      : fields

    client.folders
      .get(parent, {
        offset,
        limit,
        fields: queryFields,
      })
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(e.response)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Fetches thumbnail for a file
 */
app.get('/thumbnail', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .getDownloadURL(fileId)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(e)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

const makeRelativePath = (files = [], term = '') => {
  if (files.length) {
    const regex = new RegExp(term, 'gi')
    files.forEach((file) => {
      let html
      if (
        term?.length &&
        file.name.toLowerCase().includes(term.toLowerCase())
      ) {
        html = file.name.replace(regex, (str) => `<u>${str}</u>`)
      }
      file.html = html || file.name
      if (file.path_collection?.entries?.length) {
        file.relativePath = file.path_collection.entries
          .map(({ name }) => name)
          .join('/')
      }
    })
  }
  return files
}

/**
 * Performs a global search on users box
 */
app.get('/search', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    search = '',
    highlight,
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const highlightItems = !!highlight && search.length
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.search
      .query(search, {
        content_types: ['name'],
        fields: 'name,path_collection,parent,shared_link,type,extension',
        offset: 0,
        limit: 1000,
      })
      .then(async (r) => {
        r.entries = await makeRelativePath(
          r.entries,
          highlightItems ? search : null
        )
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(e)
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Creates a public sharable link for a file/folder
 */
app.get('/share', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
    fileType,
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    const promise =
      fileType === 'folder'
        ? client.folders.update(fileId, {
            shared_link: {
              access: 'open',
              permissions: {
                can_download: true,
              },
            },
          })
        : client.files.update(fileId, {
            shared_link: {
              access: 'open',
              permissions: {
                can_download: true,
              },
            },
          })
    promise
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Deletes a file/folder from users box
 */
app.post('/delete', (req, res) => {
  const { accessToken, type = 'file', fileId = '' } = req.body
  if (!accessToken) {
    return res.status(400).send({
      message: 'Missing required parameter accessToken',
    })
  }
  try {
    axios
      .delete(
        'https://api.box.com/2.0/' +
          (type === 'folder' ? 'folders/' : 'files/') +
          fileId,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          params: {
            recursive: true,
          },
        }
      )
      .then(() => {
        res.sendStatus(200)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Attempts to download a file/folder from users box
 */
app.get('/download', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .getDownloadURL(fileId)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Attempts to download a folder as zip
 */
app.get('/download-zip', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
    fileName = '',
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .createZip(fileName, [{ type: 'folder', id: fileId }])
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Handler for file/folder copy
 */
app.get('/copy', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
    parent = '',
    fileType,
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    const promise =
      fileType === 'folder'
        ? client.folders.copy(fileId, parent)
        : client.files.copy(fileId, parent)
    promise
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Handler for file/folder move
 */
app.get('/move', (req, res) => {
  const {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
    fileId = '',
    fileType,
    parent = '',
  } = req.query
  if (!accessToken || !refreshToken || !accessTokenTTLMS || !acquiredAtMS) {
    return res.status(400).send({
      message:
        'Missing required parameter refreshToken | accessToken | accessTokenTTLMS | acquiredAtMS',
    })
  }
  const tokenInfo = {
    accessToken,
    refreshToken,
    accessTokenTTLMS,
    acquiredAtMS,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)
    const promise =
      fileType === 'folder'
        ? client.folders.update(fileId, { parent: { id: parent } })
        : client.files.update(fileId, { parent: { id: parent } })
    promise
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.status(404).send(JSON.stringify(e))
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Handler for creating a folder
 */
app.post('/create-folder', (req, res) => {
  const { accessToken, name, parent } = req.body
  if (!accessToken || !(name || '').length) {
    return res.status(400).send({
      message: 'Missing required parameter accessToken | name',
    })
  }
  const destination = (parent || '').length ? parent : '0'
  try {
    axios
      .post(
        'https://api.box.com/2.0/folders/',
        {
          name,
          parent: { id: destination },
        },
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          params: {
            fields: [
              'created_at',
              'created_by',
              'modified_at',
              'modified_by',
              'id',
              'owned_by',
              'parent',
              'size',
              'type',
              'name',
              'permissions',
            ].join(','),
          },
        }
      )
      .then((r) => {
        res.status(r.status).send(r.data)
      })
      .catch((e) => {
        res.status(e.response.data.status).send(e.response.data)
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Checks if a file exists in Box
 * Note: this includes file from trashed folder too
 * @param client
 * @param fileId
 * @returns {Promise<*>}
 */
const checkFileExists = async (client, fileId) =>
  await client.files
    .get(fileId)
    .then(() => true)
    .catch(() => false)

/**
 * Resolves template schema
 * @param client
 * @param templateName
 * @returns {Promise<unknown>}
 */
const getMetadataTemplate = (client, templateName) => {
  return new Promise((resolve) => {
    client.metadata
      .getTemplateSchema('enterprise', templateName)
      .then(resolve)
      .catch(() => resolve({}))
  })
}

/**
 * Creates file metadata template for DAM
 * @param client
 * @param templateName
 * @returns {Promise<unknown>}
 */
const createMetadataTemplate = (client, templateName) => {
  return new Promise((resolve, reject) => {
    client.metadata
      .createTemplate(
        'DAM',
        [
          {
            type: 'string',
            key: 'damFileId',
            displayName: 'damFileId',
            hidden: true,
          },
        ],
        {
          hidden: true,
          copyInstanceOnItemCopy: false,
          templateKey: templateName,
        }
      )
      .then(resolve)
      .catch(async (e) => {
        if (e.statusCode === 409) {
          resolve(await getMetadataTemplate(client, templateName))
        } else reject(e)
      })
  })
}

/**
 * Returns DAM metadata for a file
 */
app.get('/files/:id/metadata', async (req, res) => {
  const { access_token, refresh_token, access_token_ms, acquired_at } =
    req.headers
  const fileId = req.params.id
  if (
    !access_token ||
    !refresh_token ||
    !access_token_ms ||
    !acquired_at ||
    !fileId
  ) {
    return res.status(400).send({
      message:
        'Missing required parameters access_token | refresh_token | access_token_ms | acquired_at | id',
    })
  }
  const tokenInfo = {
    accessToken: access_token,
    refreshToken: refresh_token,
    accessTokenTTLMS: access_token_ms,
    acquiredAtMS: acquired_at,
  }

  client = sdk.getPersistentClient(tokenInfo)
  const { enterprise: { id: userEntId } = {} } = await client.users.get(
    client.CURRENT_USER_ID,
    { fields: 'enterprise' }
  )
  if (!userEntId) return res.status(500).send('Enterprise id not found')

  client.files
    .get(fileId, {
      fields: `metadata.enterprise_${userEntId}.DAM`,
    })
    .then((file) => res.send(file))
    .catch((e) => {
      res.status(e.statusCode).send(JSON.parse(JSON.stringify(e)))
    })
    .catch((_) => res.status(500).send({ message: 'Unknown error occurred' }))
})

/**
 * TODO: Need refactoring
 * Handler for adding metadata to a Box file
 */
app.post('/add-metadata', (req, res) => {
  const { access_token, refresh_token, access_token_ms, acquired_at } =
    req.headers
  const { fileId, type, damFileId } = req.body
  if (
    !access_token ||
    !refresh_token ||
    !access_token_ms ||
    !acquired_at ||
    !fileId ||
    !type ||
    !damFileId
  ) {
    return res.status(400).send({
      message:
        'Missing required parameters access_token | refresh_token | access_token_ms | acquired_at | fileId | type | damFileId',
    })
  }
  const tokenInfo = {
    accessToken: access_token,
    refreshToken: refresh_token,
    accessTokenTTLMS: access_token_ms,
    acquiredAtMS: acquired_at,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)

    client.files
      .addMetadata(fileId, client.metadata.scopes.ENTERPRISE, 'DAM', {
        damFileId: String(damFileId),
      })
      .then((meta) => {
        return res.send({ id: meta.damFileId })
      })
      .catch(async (e) => {
        // could not add filemeta
        if (e.statusCode === 404) {
          // case 1: template not available
          // case 2: user does not have access
          if (await checkFileExists(client, fileId)) {
            // file.exists
            // add template metadata
            const template = await createMetadataTemplate(client, 'DAM')
            if (!template) {
              return res.status(500).send({ message: 'Unknown error occurred' })
            }
            client.files
              .addMetadata(fileId, client.metadata.scopes.ENTERPRISE, 'DAM', {
                damFileId: String(damFileId),
              })
              .then((meta) => {
                return res.send({ id: meta.damFileId })
              })
              .catch((e) => res.status(500).send(JSON.parse(JSON.stringify(e))))
          } else {
            // file does not exist in user's box
            return res.status(500).send({ message: 'File does not exist' })
          }
        } else if (e.statusCode === 409) {
          // updating filemeta
          client.files
            .updateMetadata(fileId, client.metadata.scopes.ENTERPRISE, 'DAM', [
              { op: 'add', path: '/damFileId', value: String(damFileId) },
            ])
            .then((r) => res.send(r.data))
            .catch((e) => res.status(500).send(e))
        } else res.status(500).send(JSON.parse(JSON.stringify(e)))
      })
  } catch (e) {
    res.status(500).send(e)
  }
})

app.post('/remove-metadata', (req, res) => {
  const { access_token, refresh_token, access_token_ms, acquired_at } =
    req.headers
  const { fileId } = req.body
  if (
    !access_token ||
    !refresh_token ||
    !access_token_ms ||
    !acquired_at ||
    !fileId
  ) {
    return res.status(400).send({
      message:
        'Missing required parameters access_token | refresh_token | access_token_ms | acquired_at | fileId | type | damFileId',
    })
  }
  const tokenInfo = {
    accessToken: access_token,
    refreshToken: refresh_token,
    accessTokenTTLMS: access_token_ms,
    acquiredAtMS: acquired_at,
  }
  try {
    client = sdk.getPersistentClient(tokenInfo)

    client.files
      .deleteMetadata(fileId, client.metadata.scopes.ENTERPRISE, ['DAM'])
      .then((_) => res.sendStatus(200))
      .catch((e) => res.status(500).send(JSON.parse(JSON.stringify(e))))
  } catch (e) {
    res.status(500).send(e)
  }
})

/**
 * Converts raw buffer to a readable stream
 * @param file buffer
 * @returns stream
 */
function bufferToStream(file) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(file.buffer)
      this.push(null)
    },
  })
  readableInstanceStream.httpVersion = '1.0'
  readableInstanceStream.headers = { 'content-length': file.size }
  readableInstanceStream.name = file.originalname

  return readableInstanceStream
}

/**
 * Handler for file(s) upload
 * `upload.any()` used as a middleware to mount files on request body
 *
 * If a file size is more than 55mb, it will be uploaded in several chunks
 * Note: File size needs to be at least 50mb for chunked upload,
 * any attempt to chunk upload with size < 50mb will be rejected
 */
app.post('/upload', upload.any(), (req, res) => {
  const { parent } = req.body
  const file = (req.files || {})[0]
  const { access_token, refresh_token, access_token_ttl, acquired_at } =
    req.headers

  if (
    !access_token ||
    !file ||
    !refresh_token ||
    !access_token_ttl ||
    !acquired_at
  ) {
    return res.status(400).send({
      message:
        'Missing required parameter access_token | refresh_token | access_token_ttl | acquired_at | file',
    })
  }
  const tokenInfo = {
    accessToken: access_token,
    refreshToken: refresh_token,
    accessTokenTTLMS: access_token_ttl,
    acquiredAtMS: acquired_at,
  }
  const destination = (parent || '').length ? parent : '0'

  let stream
  try {
    stream = bufferToStream(file)
  } catch (e) {
    return res.status(500).send(e)
  }

  const isLargeFile = file.size > 55 * 1024 * 1024
  if (isLargeFile) {
    // file is eligible for chunk upload
    return uploadFileChunks(tokenInfo, file, stream, destination, res)
  }

  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .uploadFile(destination, file.originalname, stream)
      .then(async (r) => {
        const { entries = [] } = r
        if (!entries[0]) {
          return res.send({})
        }
        // file was uploaded, but all the properties are not yet available here for the ui
        // fetching file details again with required fields
        res.send(
          await client.files.get(entries[0].id, {
            fields:
              'created_at,created_by,modified_at,modified_by,id,name,permissions,type,size,parent,extension',
          })
        )
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

/**
 * Uploads a file in several chunks
 * @param tokenInfo object containing acecss token, refresh token, ttl, acquired
 * @param file buffer
 * @param stream readableStream
 * @param destination location in Box
 * @param res response handler
 */
function uploadFileChunks(tokenInfo, file, stream, destination, res) {
  try {
    client = sdk.getPersistentClient(tokenInfo)
    client.files
      .getChunkedUploader(destination, file.size, file.originalname, stream)
      .then((uploader) => uploader.start())
      .then(async (r) => {
        const { entries = [] } = r
        if (!entries[0]) {
          return res.send({})
        }
        // file was uploaded, but all the properties are not yet available here for the ui
        // fetching file details again with required fields
        res.send(
          await client.files.get(entries[0].id, {
            fields:
              'created_at,created_by,modified_at,modified_by,id,name,permissions,type,size,parent,extension',
          })
        )
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
}

module.exports = {
  path: '/box',
  handler: app,
}
