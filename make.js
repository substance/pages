const b = require('substance-bundler')
const fs = require('fs')
const path = require('path')
const exec = require('substance-bundler/extensions/exec')

b.task('clean', () => {
  b.rm('dist')
  b.rm('tmp')
})

b.task('lib:cjs', () => {
  b.js('./src/index.js', {
    targets: [{
      dest: 'dist/substance-pages.cjs.js',
      format: 'cjs'
    }],
    external: [
      'substance'
    ],
    commonjs: true,
    json: true
  })
})

b.task('lib:browser', () => {
  b.js('./src/index.js', {
    targets: [{
      dest: 'dist/substance-pages.js',
      format: 'umd',
      moduleName: 'substancePages',
      globals: {
        'substance': 'window.substance',
      }
    }],
    external: ['substance'],
    json: true
  })
})

b.task('lib', ['lib:cjs', 'lib:browser'])

b.task('tests', ['lib:browser'], () => {
  b.copy('node_modules/substance-test/dist', 'dist/test/substance-test')
  b.copy('node_modules/substance/dist', 'dist/test/substance')
  b.copy('test/index.html', 'dist/test/')
  b.js('test/**/*.test.js', {
    dest: 'dist/test/tests.js',
    format: 'umd', moduleName: 'tests',
    external: {
      'substance': 'window.substance',
      'substance-pages': 'window.substancePages',
      'substance-test': 'window.substanceTest'
    },
  })
})

b.task('demo', ['clean', 'lib:cjs'], () => {
  // const generate = require('./lib/generate')
  // generate(b, {
  //   pages: 'demo/*.html',
  //   partials: 'demo/partials/*',
  //   out: 'dist/demo',
  //   rootDir: 'demo',
  //   assets: [
  //     'demo/demo.css'
  //   ],
  //   labels: 'demo/labels/en.json',
  //   debug: true
  // })
})

b.task('default', ['clean', 'lib', 'demo', 'tests'])

b.setServerPort(4010)
b.serve({ static: true, route: '/', folder: './dist/' })
