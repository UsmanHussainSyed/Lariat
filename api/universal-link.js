const app = require('express')()
app.get('/', (req, res, next) => {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: '659X3QWFZM.com.lariathubpm',
          paths: ['..*/project/..*'],
        },
        {
          appID: '659X3QWFZM.com.lariathubpmdev',
          paths: ['..*/project/..*'],
        },
        {
          appID: '659X3QWFZM.com.lariathubpmstage',
          paths: ['..*/project/..*'],
        },
      ],
    },
  }
  res.setHeader('content-type', 'application/json')
  res.status(200).json(data)
})

module.exports = {
  path: '/apple-app-site-association',
  handler: app,
}
