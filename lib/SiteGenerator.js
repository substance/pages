const fs = require('fs')
const path = require('path')
const glob = require('glob')
const minimatch = require('minimatch')
const vm = require('vm')
const { isArray, isFunction, forEach } = require('substance')
const { writeFileSync } = require('./fileUtils')
const { transpile, Partial, RenderContext } = require('../build/substance-pages.cjs.js')

module.exports = class SiteGenerator {

  constructor(opts = {}) {
    this.opts = opts
    this.out = opts.out
    if (!opts.out) throw new Error("'out' is mandatory")
  }

  load() {
    const opts = this.opts
    const files = _glob([opts.pages, opts.partials])
    const isPage = _createMatcher(opts.pages)
    const isPartial = _createMatcher(opts.partials)
    const cwd = process.cwd()
    const rootDir = path.join(cwd, opts.rootDir) || cwd

    let pages = []
    let vfs = {}
    files.forEach((relPath) => {
      let absPath = path.join(cwd, relPath)
      let ext = path.extname(relPath)
      // Note: the id is relative to the configured rootDir and without extension
      let id = path.relative(rootDir, absPath).slice(0, -ext.length)
      id = id.replace(/\\/g, '/')
      let content = fs.readFileSync(absPath, 'utf8')
      let type = 'other'
      if (isPage(relPath)) {
        type = isPartial(relPath) ? 'partial' : 'page'
      } else if (isPartial(relPath)) {
        type = 'partial'
      }
      vfs[id] = { id, type, content, ext, absPath, relPath }
      if (type === 'page') {
        pages.push(id)
      }
    })
    this.files = vfs
    this.pages = pages
  }

  generate() {
    const opts = this.opts
    const labels = opts.labels ? _readLabels(opts.labels) : {}
    const out = opts.out

    let renderers = {}
    forEach(this.files, ({ id, type, relPath, ext, content }) => {
      if (type === 'partial' || type === 'page') {
        let virtualScriptName = relPath+'.js'
        let { code } = transpile(content, ext)
        // Store the output for debugging
        if (this.opts.debug) {
          writeFileSync(path.join('tmp', virtualScriptName), code)
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
      }
    })
    // Then evaluate the generated files and register the renderers
    // TODO: collect custom components
    let components = { Partial }
    let renderContext = new RenderContext(components, renderers, labels)
    // Now create HTML and write it to disk
    this.pages.forEach((page) => {
      let html = renderContext.render(page)
      writeFileSync(path.join(out, page+'.html'), html)
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

function _glob(patterns) {
  let files = new Set()
  patterns.forEach((pattern) => {
    glob.sync(pattern).forEach(files.add, files)
  })
  return files
}

function _readLabels(labelsFile) {
  let str = fs.readFileSync(labelsFile, 'utf8')
  return JSON.parse(str)
}
