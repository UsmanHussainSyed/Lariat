import axios from 'axios'
const { toPng } = require('html-to-image')
const GENERAL_ICON = require('~/assets/img/file/general.svg')
const IMAGE_ICON = require('~/assets/img/icon/images.svg')
const AUDIO_ICON = require('~/assets/img/file/audio.svg')
const VIDEO_ICON = require('~/assets/img/file/video.svg')
const FOLDER_ICON = require('~/assets/img/icon/category-blue.svg')

function getGeneralIcon(ext, vm) {
  if (!ext) return GENERAL_ICON
  if (vm.$isImage(ext)) return IMAGE_ICON
  else if (vm.$isAudio(ext)) return AUDIO_ICON
  else if (vm.$isVideo(ext)) return VIDEO_ICON
  else
    try {
      return require(`~/assets/img/file/${ext}.svg`)
    } catch {
      return GENERAL_ICON
    }
}

export default {
  methods: {
    getZipShot({ ext, blob } = {}) {
      return new Promise((resolve, reject) => {
        if (ext !== 'zip') return reject(new TypeError('Invalid extension'))
        const formData = new FormData()
        formData.append('file', blob)
        axios
          .post('/zip/extract', formData)
          .then(({ data }) => {
            if (!data.length) {
              return resolve()
            }
            const root = document.createElement('div')
            const longestName = data
              .map((e) => e.name)
              .sort((a, b) => b.length - a.length)[0]
            const longestTextNode = document.createElement('span')
            longestTextNode.textContent = longestName
            document.body.appendChild(longestTextNode)
            const minLen = Math.min(500, longestTextNode.offsetWidth + 66)
            document.body.removeChild(longestTextNode)

            data
              .sort((r, e) =>
                r.directory === e.directory
                  ? r.name.localeCompare(e.name)
                  : r.directory
                  ? -1
                  : 1
              )
              .forEach((file) => {
                const node = document.createElement('div')
                const imgNode = document.createElement('img')
                const _ext = file.name.substring(file.name.lastIndexOf('.') + 1)
                imgNode.src = file.directory
                  ? FOLDER_ICON
                  : getGeneralIcon(_ext, this)
                imgNode.style =
                  'max-height:35px;height:35px;max-width:35px;width:35px;margin:0 10px'
                const txtNode = document.createElement('div')
                txtNode.style =
                  'overflow: hidden;text-overflow: ellipsis;white-space:nowrap;max-width:' +
                  minLen +
                  'px;'
                txtNode.textContent = file.name

                node.appendChild(imgNode)
                node.appendChild(txtNode)

                node.style =
                  'padding:5px 0px;display:flex;align-items:center;height:40px;min-height:40px;max-height:40px;white-space:nowrap;overflow:hidden;max-width:' +
                  minLen +
                  'px;min-width:' +
                  minLen +
                  'px'

                root.appendChild(node)
              })

            toPng(root, {
              cacheBust: true,
              height: Math.max(200, 50 * data.length),
              width: Math.max(200, minLen),
              style: {
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            })
              .then((dataUrl) => resolve(dataUrl))
              .catch((e) => reject(e))
          })
          .catch((e) => reject(e))
      })
    },
  },
}
