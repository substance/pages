const b = require('substance-bundler')
const fs = require('fs')
const path = require('path')
const exec = require('substance-bundler/extensions/exec')

b.task('clean', () => {
  b.rm('build')
  b.rm('tmp')
})

// ATM you we need to checkout the whole project and build a vendor bundle
b.task('parser', () => {
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
})
.describe('Generate HTMLParser')

b.task('lib:cjs', () => {
  b.js('./src/index.js', {
    targets: [{
      dest: 'build/substance-pages.cjs.js',
      format: 'cjs'
    }],
    external: [
      'substance', 'esprima', 'escodegen',
      'antlr4/index', 'html-tag-names'
    ],
    commonjs: true,
    json: true
  })
})

/*
  TODO: we should use this as a case-study for
  substance-bundler.
  The challenge is that antlr4, esprima, and escodegen
  are libraries which are commonjs and easier to bundle
  with browserify.
*/
b.task('lib:browser', () => {
  b.browserify('./node_modules/escodegen/escodegen.js', {
    dest: 'tmp/escodegen.js',
    exports: ['default'],
    sourceMaps: false
  })
  b.browserify('./node_modules/esprima/dist/esprima.js', {
    dest: 'tmp/esprima.js',
    exports: ['default'],
    sourceMaps: false
  })
  b.browserify('./src/html/index.js', {
    dest: 'tmp/htmlparser.js',
    exports: [ 'parseHTML', 'walk', 'HTMLParserListener']
  })
  b.js('./src/index.js', {
    targets: [{
      dest: 'build/substance-pages.js',
      format: 'umd',
      moduleName: 'substancePages',
      globals: {
        'substance': 'window.substance',
      }
    }],
    // browserified vendor bundles:
    alias: {
      './src/html/index.js': './tmp/htmlparser.js',
      'escodegen': './tmp/escodegen.js',
      'esprima': './tmp/esprima.js'
    },
    external: ['substance'],
    json: true
  })
})

b.task('tests', ['lib'], () => {
  b.js('test/**/*.test.js', {
    dest: 'build/tests.js',
    format: 'umd', moduleName: 'tests',
    external: {
      'substance': 'window.substance',
      'substance-pages': 'window.substancePages',
      'substance-test': 'window.substanceTest'
    },
  })
})

b.task('demo', ['clean', 'lib:cjs'], () => {
  const generate = require('./lib/generate')
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
