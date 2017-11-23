const fs = require('fs')
const path = require('path')
const vm = require('vm')
const minimatch = require('minimatch')
const { isArray, isFunction } = require('substance')

const transpileJsx = require('./transpileJsx')
const Partial = require('./Partial')
const RenderContext = require('./RenderContext')

// TODO: this is essentially a bundler extension
// it should have a nicer signature:
module.exports = function(b, opts = {}) {
  let src = []
  let pagesGlob = opts.pages
  if (!pagesGlob) throw new Error("'pages' is mandatory")
  src = [].concat(pagesGlob)
  // put the partials also to the src files
  // but create a matcher so that we know whether a file should be treated
  // as page or as partial
  let partialsGlob = opts.partials
  if (partialsGlob) {
    src = src.concat(partialsGlob)
  }
  let componentsGlob = opts.components
  if (componentsGlob) {
    src = src.concat(componentsGlob)
  }
  // matchers to be able to sort files later
  // TODO: maybe we have another idea. ATM we merge all
  // src files for file watching
  const isPage = _createMatcher(pagesGlob)
  const isPartial = _createMatcher(partialsGlob)
  const isComponent = _createMatcher(componentsGlob)

  // the folder where the site will be built into
  let out = opts.out
  if (!out) throw new Error("'out' is mandatory")

  let cwd = process.cwd()
  // Note: the rootDir is important as a base dir for
  // resource lookup.
  let rootDir = opts.rootDir || cwd

  // Read a labels file
  let labels = opts.labels ? _readLabels(opts.labels) : {}

  b.custom(`Generating site into ${out}`, {
    src,
    // TODO: we need a way to define the written files dynamically
    dest: out,
    execute(files) {
      // TODO: how do we get
      let renderers = {}
      let pages = []
      // Transpile everything into js files
      files.forEach((absPath) => {
        let relPath = path.relative(cwd, absPath)
        let ext = path.extname(relPath)
        // Note: the id is relative to the configured rootDir and without extension
        let id = path.relative(rootDir, absPath).slice(0, -ext.length)
        // detect category
        // Note: ATM partials are also JSX, but flagged as being
        // partials, via a provided glob pattern
        // Only JSX files that aren't partials are considered as pages
        // i.e. an HTML file is created
        if (isPage(relPath) && !isPartial(relPath) && !isComponent(relPath)) {
          pages.push(id)
        }
        // Transpile JSX
        let source = fs.readFileSync(absPath, 'utf8')
        let { code } = transpileJsx(source)
        let virtualScriptName = relPath+'.js'
        // Store the output for debugging
        if (opts.debug) {
          b.writeSync(path.join('tmp', virtualScriptName), code)
        }
        // Evaluate the generated code (yields a render function)
        // Note: the generated code is in commonjs
        let data = { module: { exports: {} } }
        let context = vm.createContext(data)
        let script = new vm.Script(code, { filename: virtualScriptName, displayErrors: true })
        script.runInContext(context)
        // retrieve the exported render function
        let renderer = data.module.exports
        if (!isFunction(renderer)) throw new Error('Transpiled renderer is invalid: ' + relPath)
        renderers[id] = renderer
      })
      // Then evaluate the generated files and register the renderers
      // TODO: collect custom components
      let components = { Partial }
      let renderContext = new RenderContext(components, renderers, labels)
      // Now create HTML and write it to disk
      pages.forEach((page) => {
        let html = renderContext.render(page)
        b.writeSync(path.join(out, page+'.html'), html)
      })
    }
  })
  // Copy assets
  let assets = opts.assets
  if (assets) {
    if (!isArray(assets)) assets = [assets]
    let opts = {}
    if (rootDir !== cwd) {
      opts.root = path.relative(cwd, rootDir)
    }
    assets.forEach((pattern) => {
      b.copy(pattern, out, opts)
    })
  }
}

function _createMatcher(pattern) {
  if (!pattern) return function() { return false }
  if (isArray(pattern)) {
    return function(f) {
      for (let i = 0; i < pattern.length; i++) {
        if (minimatch(f, pattern[i])) {
          return true
        }
      }
      return false
    }
  } else {
    return function(f) {
      return minimatch(f, pattern)
    }
  }
}

function _readLabels(labelsFile) {
  let str = fs.readFileSync(labelsFile, 'utf8')
  return JSON.parse(str)
}
