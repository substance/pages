const fs = require('fs')
const path = require('path')
const glob = require('glob')
const minimatch = require('minimatch')
const vm = require('vm')
const { isArray, forEach } = require('substance')
const debug = require('debug')('pages:site-generator')
const { writeFileSync } = require('./fileUtils')

module.exports = class SiteGenerator {

  constructor(opts = {}) {
    this.opts = opts
    this.out = opts.out
    if (!opts.out) throw new Error("'out' is mandatory")
  }

  load() {
    const opts = this.opts
    const patterns = [].concat(opts.pages).concat(opts.partials).filter(Boolean)
    const files = _glob(patterns)
    const isPage = _createMatcher(opts.pages)
    const isPartial = _createMatcher(opts.partials)
    const cwd = process.cwd()
    const rootDir = opts.rootDir ? path.join(cwd, opts.rootDir) : cwd

    let pages = []
    let vfs = {}
    files.forEach((relPath) => {
      debug('loading %s', relPath)
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
    const { HTMLTemplate } = require('../dist/substance-pages.cjs.js')
    const opts = this.opts
    const labels = opts.labels ? _readLabels(opts.labels) : {}
    const out = opts.out

    // Then evaluate the generated files and register the renderers
    // TODO: collect custom components
    let components = {}
    let templates = {}
    // TODO: what do we want to pass into the templates?
    let globals = Object.assign({}, this.opts.globals)
    let context = {
      getCurrentPage() {
        return globals.currentPage
      },
      getLabel(name) {
        return labels[name] || name
      }
    }
    forEach(this.files, ({ id, type, relPath, content }) => {
      if (type === 'partial' || type === 'page') {
        debug('compiling template %s', id)
        templates[id] = new HTMLTemplate(content, components, templates)
      }
    })
    // Now create HTML and write it to disk
    this.pages.forEach((page) => {
      debug('rendering page %s', page)
      let template = templates[page]
      if (template) {
        globals.currentPage = page
        let { html } = template.expand(vm, {}, context, globals)
        writeFileSync(path.join(out, page+'.html'), html)
      } else {
        console.error('No template found for page %s', page)
      }
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
