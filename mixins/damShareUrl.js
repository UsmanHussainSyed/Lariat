const DAM_FRONTEND_URL = process.env.DAM_FRONTEND_URL

let currentSource = ''
if (process.client) currentSource = window.location.origin

export default {
  filters: {
    normalizedSource: (source) => (source === 'admin' ? 'Backend' : 'Frontend'),
    normalizedUrl(url, source = 'admin', customDomain = '') {
      if (!url) return ''

      // eslint-disable-next-line prefer-const
      let [type, status] = url.split('?').pop().split('&')
      type = type.replace('type=', '')

      return `${
        source === 'admin' ? currentSource : customDomain || DAM_FRONTEND_URL
      }/shared-assets/${type}?${status}`
    },
  },
}
