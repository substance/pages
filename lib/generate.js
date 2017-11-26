const path = require('path')
const { isArray } = require('substance')
const SiteGenerator = require('./SiteGenerator')

// TODO: this is essentially a bundler extension
// it should have a nicer signature:
module.exports = function(b, opts = {}) {
  // watch for all inputs
  let src = [
    opts.pages,
    opts.partials,
    opts.labels
  ].filter(Boolean)

  b.custom(`Generating site into ${opts.out}`, {
    src,
    dest: opts.out,
    execute() {
      let generator = new SiteGenerator(opts)
      generator.load()
      generator.generate()
    }
  })
  const cwd = process.cwd()
  const rootDir = opts.rootDir
  const out = opts.out
  let assets = opts.assets
  if (assets) {
    if (!isArray(assets)) assets = [assets]
    let _opts = {}
    if (rootDir) {
      _opts.root = path.join(cwd, rootDir)
    }
    assets.forEach((pattern) => {
      b.copy(pattern, out, _opts)
    })
  }
}
