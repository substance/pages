const b = require('substance-bundler')
const fs = require('fs')
const path = require('path')

const transpile = require('./lib/transpile')

b.task('clean', () => {
  b.rm('dist')
  b.rm('tmp')
})

b.task('demo', ['clean'], () => {
  transpile(b, {
    pages: 'demo/*.jsx',
    partials: 'demo/partials/*.jsx',
    out: 'dist/demo',
    rootDir: path.join(__dirname, 'demo'),
    assets: [
      'demo/*.css'
    ],
    labels: 'demo/labels/en.json'
  })
})
