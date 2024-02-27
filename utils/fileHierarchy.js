/**
 * Handler for direct files/folders upload
 * @param {*} files Array of files received after upload
 * @returns Array of files and folders in a hierarchical structure
 */
export function FileHandler(files, items = []) {
  for (const file of files) {
    const [path, ...rest] = (
      file.relativePath || file.webkitRelativePath
    ).split('/')
    if (!rest.length) {
      items.push({
        type: 'file',
        file,
        name: file.name,
        path: file.webkitRelativePath,
      })
    } else {
      let directory = items.find((e) => e.name === path)
      if (!directory) {
        directory = { name: path, type: 'folder', items: [] }
        items.push(directory)
      }
      file.relativePath = rest.join('/')
      FileHandler([file], directory.items)
    }
  }
  return items
}

/**
 * Drop event handlers
 * @param {*} dragEvt DragEvent
 * @returns Array of files and folders in a hierarchical structure
 */
export async function DropHandler(dragEvt) {
  if (!(dragEvt instanceof DragEvent)) {
    throw new TypeError(`Not an instance of DragEvent, ${dragEvt}`)
  }
  return await getFilesAsync(dragEvt.dataTransfer)
}

/**
 * Extracts all files and folders from DragEvent.DataTransfer event
 * @param {*} dataTransfer DragEvent.DataTransfer
 * @returns Array of files and folders
 */
async function getFilesAsync(dataTransfer) {
  const files = []
  const items = [...dataTransfer.items].map((item) => {
    return {
      type: item.type,
      kind: item.kind,
      file: item.getAsFile(),
      entry: item.webkitGetAsEntry(),
    }
  })
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // kind is 'file' for both File and Folder
    if (item.kind === 'file') {
      if (item.entry.isDirectory) {
        const entryContent = await readEntryContentAsync(item.entry)
        files.push(...entryContent)
        continue
      }
      if (item.file) {
        files.push({ type: 'file', file: item.file, name: item.file.name })
      }
    }
  }
  return files
}

/**
 * Reads a directory recursively
 * @param {*} entry webkitEntry
 * @returns Array of containing items
 */
function readEntryContentAsync(entry) {
  return new Promise((resolve) => {
    let reading = 0
    const items = []
    readEntry(entry, items, () => {
      resolve(items)
    })
    function readEntry(entry, items, cb) {
      if (isFile(entry)) {
        reading++
        entry.file((file) => {
          reading--
          items.push({ type: 'file', file })
          if (reading === 0) {
            cb(items)
          }
        })
      } else if (isDirectory(entry)) {
        const directory = { type: 'folder', name: entry.name, items: [] }
        items.push(directory)
        readReaderContent(entry.createReader(), directory.items, cb)
      }
    }

    function readReaderContent(reader, items, cb) {
      reading++
      reader.readEntries(function (entries) {
        reading--
        for (const entry of entries) {
          readEntry(entry, items, cb)
        }
        // [In Chromium] DirectoryReader.readEntries return 100 entries in chunk in favor of quick response.
        // Suggested implementation is to keep pulling from reader as long as we are getting items.
        // For more detail refer to https://bugs.chromium.org/p/chromium/issues/detail?id=378883#c4
        if (entries.length > 0) {
          readReaderContent(reader, items, cb)
        }
        if (reading === 0) {
          cb(items)
        }
      })
    }
  })
}

function isDirectory(entry) {
  return entry.isDirectory
}

function isFile(entry) {
  return entry.isFile
}
