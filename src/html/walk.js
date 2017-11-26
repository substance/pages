const antlr4 = require('antlr4/index')

module.exports = function walk(ast, visitor) {
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(visitor, ast);
}