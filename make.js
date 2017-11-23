const b = require('substance-bundler')
const fs = require('fs')
const path = require('path')

const { generate } = require('./index')

b.task('clean', () => {
  b.rm('dist')
  b.rm('tmp')
})

b.task('demo', ['clean'], () => {
  generate(b, {
    pages: 'demo/*.jsx',
    partials: 'demo/partials/*.jsx',
    out: 'tmp/demo',
    rootDir: path.join(__dirname, 'demo'),
    assets: [
      'demo/*.css'
    ],
    labels: 'demo/labels/en.json'
  })
})
