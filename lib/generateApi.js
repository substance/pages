const path = require('path')

module.exports = function generateApi(sources, opts = {}) {
  const typedoc = opts.typedoc || require('typedoc')
  const out = opts.out || './tmp/api'
  const externalPattern = opts.externalPattern || "**/(node_modules|vendor|tmp)/**"
  const theme = opts.theme || path.join(__dirname, '..', '.typedoc-theme')
  const readme = opts.readme || 'none'
  let app = new typedoc.Application({
    allowJs: true,
    mode: 'file',
    excludeExternals: true,
    excludeNotExported: true,
    externalPattern: externalPattern,
    includeDeclarations: true,
    ignoreCompilerErrors: true,
    listInvalidSymbolLinks: true,
    theme: theme,
    readme: readme
  })
  sources = app.expandInputFiles(sources)
  let project = app.convert(sources)
  if (project) {
    _hideUndocumented(project)
    app.generateDocs(project, out)
  } else {
    throw new Error('Error running Typedoc: could not convert sources.')
  }
}

function _hideUndocumented(project) {
  if (project.groups) {
    project.groups.forEach((group) => {
      group.children.forEach((c) => {
        if (c && !c.hasComment()) {
          // 1 = Private
          c.setFlag(1, true)
        }
      })
    })
  }
}
