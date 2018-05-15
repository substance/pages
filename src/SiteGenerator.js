import { platform } from 'substance'
import HTMLTemplate from './HTMLTemplate'
import createSiteContext from './createSiteContext'
import createPageContext from './createPageContext'

export default class SiteGenerator {

  constructor(config = {}) {
    const rootDir = config.rootDir
    if (!rootDir) {
      throw new Error("'rootDir' is mandatory: provide an absolute path to the root of the generated site.")
    }

    const components = config.components || {}
    const globals = config.globals || {}
    const labels = config.labels || {}

    // low-level modules: 'path', 'fs', 'vm'
    // we do that so we could drop in another
    // implementation, e.g. for browser
    // or a different fs
    let modules = Object.assign({}, config.modules)
    ;['path', 'fs', 'vm'].forEach((m) => {
      if (!modules[m]) {
        if (platform.inNodeJS) {
          modules[m] = require(m)
        } else {
          throw new Error(`A polyfill for node module '${m}' is required.`)
        }
      }
    })

    const siteContext = createSiteContext({
      rootDir,
      siteProps: config.site,
      labels,
      modules
    })

    this.config = config
    this.rootDir = rootDir
    this.components = components
    this.globals = globals
    this.labels = labels
    this.modules = modules
    this.siteContext = siteContext
    this.partials = {}
  }

  loadPartial(file, opts = {}) {
    const path = this.modules.path
    const fs = opts.fs || this.modules.fs
    let ext = path.extname(file)
    let name = path.basename(file, ext)
    if (ext !== '.html') {
      throw new Error('Only .html is supported as partial format.')
    }
    let content = fs.readFileSync(file, 'utf8')
    let template = new HTMLTemplate(content, {
      components: this.components,
      templates: this.partials,
      filename: file
    })
    // TODO: at some point we might need the
    // ability to disambiguate, e.g. considering
    // the full file path, and considering
    // the context from where a partial is used
    // For now, we keep it simple
    this.partials[name] = template
  }

  createPage(src, dest, opts = {}) {
    const path = this.modules.path
    const vm = this.modules.vm
    const fs = opts.fs || this.modules.fs
    let ext = path.extname(src)
    let relPath = path.relative(this.rootDir, dest)
    let pageUrl = relPath.replace(/\\/g, '/')
    if (ext !== '.html') {
      throw new Error('Only .html is supported as partial format.')
    }
    let content = fs.readFileSync(src, 'utf8')
    let template = new HTMLTemplate(content, {
      components: this.components,
      templates: this.partials,
      filename: src
    })
    // TODO: decide which globals are built-in
    // and which means
    let globals = Object.assign({}, this.globals)
    let pageContext = createPageContext({
      pageUrl,
      siteContext: this.siteContext
    })
    globals.page = pageContext
    globals.site = this.siteContext
    let { html } = template.expand(vm, {}, pageContext, globals)
    fs.writeFileSync(dest, html)

    return { template, html }
  }

}

