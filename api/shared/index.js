const { Readable } = require('stream')
/**
 * Converts a buffer to a readable stream
 * @param {*} binary
 * @returns ReadableStream
 */
export function bufferToReadableStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary)
      this.push(null)
    },
  })
  return readableInstanceStream
}
