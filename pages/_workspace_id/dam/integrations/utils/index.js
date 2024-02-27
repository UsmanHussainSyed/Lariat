export const supportedThumbnails = [
  'jpg',
  'jpeg',
  'png',
  'tiff',
  'tif',
  'gif',
  'webp',
  'ppm',
  'and',
  'bmp',
  'mp4',
  'm4p',
  'm4v',
  'mpg',
  'mp2',
  'mpeg',
  'mpe',
  'mpv',
  'm2v',
  'm4v',
  '3gp',
  'webm',
  'ogg',
  'ogv',
  'avi',
  'mov',
  'wmv',
]

// source: https://help.dropbox.com/files-folders/sort-preview/file-types-that-preview
export const supportedImageFormats = [
  '3fr',
  'ai',
  'arw',
  'bmp',
  'cr2',
  'crw',
  'dcr',
  'dcs',
  'dng',
  'dwg', // (Dropbox Professional, Business Advanced, Enterprise, and Education accounts only)
  'erf',
  'gif',
  'heic',
  'jpeg',
  'jpg',
  'kdc',
  'mef',
  'mos',
  'mrw',
  'nef',
  'nrw',
  'orf',
  'pef',
  'png',
  'ppm',
  'psd',
  'r3d',
  'raf',
  'rw2',
  'rwl',
  'sr2',
  'svg',
  'svgz',
  'tif',
  'tiff',
  'wbmp',
  'webp',
  'x3f',
  'jpg',
  'jpeg',
  'svg',
  'png',
  'bmp',
  'gif',
]

export const supportedVideoFormats = [
  '3gp',
  '3gpp',
  '3gpp2',
  'asf',
  'avi',
  'dv',
  'm2t',
  'm4v',
  'mkv',
  'mov',
  'mp4',
  'mpeg',
  'mpg',
  'mts',
  'mxf', // (Dropbox Professional, Business Advanced, Enterprise, and Education accounts only)
  'ogv',
  'rm',
  'ts',
  'vob',
  'webm',
  'wmv',
  'mp4',
  'mp3',
  'webm',
]

export const blobTobase64 = (blob) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.onload = function () {
      resolve(fr.result)
    }
    fr.readAsDataURL(blob)
  })
}

export const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Byte'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
