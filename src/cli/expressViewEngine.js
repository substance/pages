import generatePage from './generatePage'

export default function createEngine (engineOptions = {}) {
  function renderFile (filename, options, cb) {
    const settings = options.settings
    const props = options._locals || {}
    const path = require('path')
    // console.log('renderFile', filename, options)
    const pageName = path.basename(filename, '.page.js')
    const viewsDir = settings.views
    const chunksFile = path.join(viewsDir, 'chunks', `${pageName}.chunks.json`)
    let html
    try {
      const chunks = require(chunksFile)
      const PageClass = require(filename)[`${pageName}Page`]
      html = generatePage(PageClass, Object.assign({}, props, { chunks, pageName }))
      cb(null, html)
    } catch (err) {
      cb(err)
    } finally {
      delete require.cache[chunksFile]
      delete require.cache[filename]
    }
  }
  return renderFile
}
