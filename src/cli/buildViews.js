import _createWebpackConfig from './_createWebpackConfig'
import _getBootscript from './_getBootscript'

export default function buildSite (b, options = {}) {
  const path = require('path')
  const { glob } = require('substance-bundler/dist/vendor')
  const webpack = require('substance-bundler/extensions/webpack')

  const outputDir = options.outputDir || 'dist'
  const viewsDir = options.viewsDir || 'views'
  const publicDir = path.join(outputDir, 'public')
  const cwd = process.cwd()

  // scan page files
  // ATTENTION: this does not work via watcher, because webpack has to be restarted
  // for a different configuration
  const views = {}
  glob.sync(path.join(viewsDir, '[^_]*.jsx')).forEach(f => {
    const name = path.basename(f, '.jsx')
    views[name] = './' + f
  })

  // create JS bundles for all pages
  webpack(b, _createWebpackConfig(views, options))

  // for each page, generate a HTML file and a bootscript
  Object.keys(views).forEach(name => {
    const pageClass = `${name}Page`
    const pageBootscript = `js/${name}.page.boot.js`
    const chunkFileGlobPattern = `js/*${name}*.page.js`
    const chunkFile = path.join(outputDir, 'views', 'chunks', `${name}.chunks.json`)
    b.custom(`Generate ${chunkFile}`, {
      dest: chunkFile,
      execute () {
        const chunks = glob.sync(path.join(publicDir, chunkFileGlobPattern)).map(f => path.relative(publicDir, f))
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
      dest: path.join(publicDir, pageBootscript),
      execute () {
        const chunks = _requireNoCache(path.join(cwd, chunkFile))
        const bootscript = _getBootscript(pageClass, { chunks })
        b.writeFileSync(path.join(publicDir, pageBootscript), bootscript)
      }
    })
    // Note: a prerendered HTML page does not seem to be needed
    // b.custom(`Generate ${pageFile}`, {
    //   src: chunkFile,
    //   dest: path.join(outputDir, pageFile),
    //   execute (_, api) {
    //     // generate page HTML
    //     const chunks = _requireNoCache(path.join(cwd, chunkFile))
    //     const PageClass = _requireNoCache(cjsModule)[pageClass]
    //     const html = generatePage(PageClass, { chunks })
    //     b.writeFileSync(path.join(outputDir, pageFile), html)
    //     // rerender the page whenever webpack has updated the page bundle
    //     api.watch(cjsModule)
    //   }
    // })
  })
}

function _requireNoCache (path) {
  delete require.cache[path]
  return require(path)
}
