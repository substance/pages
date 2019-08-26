import generatePage from './generatePage'
import _createWebpackConfig from './_createWebpackConfig'
import _getBootscript from './_getBootscript'

export default function buildSite (b, options = {}) {
  const outputDir = options.outputDir || 'dist'
  const siteDir = options.siteDir || 'site'
  const cwd = process.cwd()

  const path = require('path')
  const { glob } = require('substance-bundler/dist/vendor')
  const webpack = require('substance-bundler/extensions/webpack')

  // scan page files
  // ATTENTION: this does not work via watcher, because webpack has to be restarted
  // for a different configuration
  const pages = {}
  glob.sync(path.join(siteDir, '*.jsx')).forEach(f => {
    const name = path.basename(f, '.jsx')
    pages[name] = './' + f
  })

  // create JS bundles for all pages
  webpack(b, _createWebpackConfig(pages, options))

  // for each page, generate a HTML file and a bootscript
  Object.keys(pages).forEach(name => {
    const pageFile = `${name}.html`
    const pageClass = `${name}Page`
    const pageBootscript = `js/${name}.page.boot.js`
    const chunkFileGlobPattern = `js/*${name}*.page.js`
    const chunkFile = `tmp/${name}.chunks.json`
    const cjsModule = path.join(cwd, `tmp/${name}.page.cjs.js`)
    b.custom(`Generate ${chunkFile}`, {
      dest: chunkFile,
      execute () {
        const chunks = glob.sync(path.join(outputDir, chunkFileGlobPattern)).map(f => path.relative(outputDir, f))
        // Note: seems that when loading via <script> in <head>
        // the order is not important.
        // Still, sorting by name length results in kind of a natural order,
        // because the name gets longer with the number of entries,
        // and the page chunk has the shortest name
        chunks.sort((a, b) => {
          return b.length - a.length
        })
        // at last add the bootscript
        chunks.push(pageBootscript)
        const content = JSON.stringify(chunks)
        b.writeFileSync(chunkFile, content)
      }
    })
    b.custom(`Generate ${pageBootscript}`, {
      src: chunkFile,
      dest: path.join(outputDir, pageBootscript),
      execute () {
        const chunks = _requireNoCache(path.join(cwd, chunkFile))
        const bootscript = _getBootscript(pageClass, { chunks })
        b.writeFileSync(path.join(outputDir, pageBootscript), bootscript)
      }
    })
    b.custom(`Generate ${pageFile}`, {
      src: chunkFile,
      dest: path.join(outputDir, pageFile),
      execute (_, api) {
        // generate page HTML
        const chunks = _requireNoCache(path.join(cwd, chunkFile))
        const PageClass = _requireNoCache(cjsModule)[pageClass]
        const html = generatePage(PageClass, { chunks })
        b.writeFileSync(path.join(outputDir, pageFile), html)
        // rerender the page whenever webpack has updated the page bundle
        api.watch(cjsModule)
      }
    })
  })
}

function _requireNoCache (path) {
  delete require.cache[path]
  return require(path)
}
