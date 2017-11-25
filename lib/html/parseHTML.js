const HTMLLexer = require('./HTMLLexer').HTMLLexer
const HTMLParser = require('./HTMLParser').HTMLParser
const antlr4 = require('antlr4')

module.exports = function parseHTML(str, options={}) {
  const lexer = new HTMLLexer(new antlr4.InputStream(str))
  const parser = new HTMLParser(new antlr4.CommonTokenStream(lexer))
  parser.buildParseTrees = true
  let ast = parser.htmlDocument()
  return ast
}