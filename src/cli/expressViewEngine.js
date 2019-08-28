import generatePage from './generatePage'
import requireUncached from './_requireUncached'

export default function createEngine (engineOptions = {}) {
  function renderFile (filename, options, cb) {
    const settings = options.settings
    const props = options._locals || {}
    const path = require('path')
    // console.log('renderFile', filename, options)
    const pageName = path.basename(filename, '.page.js')
    const viewsDir = settings.views
    const configFile = path.join(viewsDir, 'config.json')
    const chunksFile = path.join(viewsDir, 'chunks', `${pageName}.chunks.json`)
    let html
    try {
      const config = requireUncached(configFile)[pageName]
      const chunks = requireUncached(chunksFile)
      const PageClass = requireUncached(filename)[`${pageName}Page`]
      const pageProps = Object.assign({}, props, { chunks, pageName, config })
      html = generatePage(PageClass, pageProps)
      cb(null, html)
    } catch (err) {
      cb(err)
    }
  }
  return renderFile
}
