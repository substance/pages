const b = require('substance-bundler')
const rollup = require('substance-bundler/extensions/rollup')

const DIST = 'dist/'

b.rm(DIST)
rollup(b, require('./rollup.config'))
