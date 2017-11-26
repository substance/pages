const { HTMLLexer } = require('./HTMLLexer')
const { HTMLParser } = require('./HTMLParser')
const { InputStream, CommonTokenStream } = require('antlr4/index')

module.exports = function parseHTML(str) {
  const lexer = new HTMLLexer(new InputStream(str))
  const parser = new HTMLParser(new CommonTokenStream(lexer))
  parser.buildParseTrees = true
  let ast = parser.htmlDocument()
  return ast
}
