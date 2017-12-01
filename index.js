const { SiteGenerator } = require('./dist/substance-pages.cjs.js')

module.exports = {
  generate: require('./lib/generate'),
  generateDiagram: require('./lib/generateDiagram'),
  generateApi: require('./lib/generateApi'),
  SiteGenerator
}