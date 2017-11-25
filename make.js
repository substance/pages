const b = require('substance-bundler')
const fs = require('fs')
const path = require('path')
const exec = require('substance-bundler/extensions/exec')

const { generate } = require('./index')

b.task('clean', () => {
  b.rm('dist')
  b.rm('tmp')
})

b.task('demo', ['clean'], () => {
  generate(b, {
    pages: 'demo/*.html',
    partials: 'demo/partials/*',
    out: 'tmp/demo',
    rootDir: 'demo',
    assets: [
      'demo/demo.css'
    ],
    labels: 'demo/labels/en.json',
    debug: true
  })
})

// ATM you we need to checkout the whole project and build a vendor bundle
b.task('parser', _generateParser)
.describe('Generate HTMLParser')

function _generateParser() {
  if (!fs.existsSync('./.bin/antlr-4.6-complete.jar')) {
    if (!fs.existsSync('./.bin')) fs.mkdirSync('./.bin')
    exec(b, 'curl -o .bin/antlr-4.6-complete.jar http://www.antlr.org/download/antlr-4.6-complete.jar')
  }
  b.custom('Generating parser', {
    src: './lib/html/*.g4',
    dest: './lib/html/HTMLParser.js',
    execute: () => {
      const isWin = /^win/.test(process.platform)
      let cmd = 'java -jar ./.bin/antlr-4.6-complete.jar -Dlanguage=JavaScript -no-visitor -lib lib/html'
      if (isWin) cmd += " -o lib/html"
      exec(b, cmd + ' lib/html/HTMLLexer.g4')
      exec(b, cmd + ' lib/html/HTMLParser.g4')
    }
  })
}
