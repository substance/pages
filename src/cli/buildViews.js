import _createWebpackConfig from './_createWebpackConfig'
import omit from './_omit'

export default function buildSite (b, options = {}) {
  const path = require('path')
  const { glob } = require('substance-bundler/dist/vendor')
  const webpack = require('substance-bundler/extensions/webpack')

  const outputDir = options.outputDir || 'dist'
  const configFile = options.configFile || path.join(process.cwd(), 'views.config.js')
  const publicDir = path.join(outputDir, 'public')

  const viewsConfig = require(configFile)

  // write a view config derived from the user's views.config.js
  b.custom('Write views config', {
    execute () {
      const _config = {}
      Object.keys(viewsConfig).forEach(name => {
        _config[name] = omit(viewsConfig[name], 'entry')
      })
      b.writeFileSync(path.join(outputDir, 'views', 'config.json'), JSON.stringify(_config, 0, 2))
    }
  })

  // create JS bundles for all pages
  webpack(b, _createWebpackConfig(viewsConfig, options))

  // for each page, generate a HTML file and a bootscript
  Object.keys(viewsConfig).forEach(name => {
    const viewConfig = viewsConfig[name]
    name = viewConfig.name || name
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
        const content = JSON.stringify(chunks)
        b.writeFileSync(chunkFile, content)
      }
    })
  })
}
