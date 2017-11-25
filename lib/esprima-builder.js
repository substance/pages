const esprima = require('esprima')
const escodegen = require('escodegen')

function identifier(name) {
  return {
    "type": "Identifier",
    "name": name
  }
}

function stringLiteral(str) {
  return {
    "type": "Literal",
    "value": str,
    "raw": `"'${str}'"`
  }
}

function program(statements) {
  return {
    "type": "Program",
    "body": statements,
    "sourceType": "script"
  }
}

function expressionStatement(expr) {
  return {
    "type": "ExpressionStatement",
    "expression": expr
  }
}

function callExpression(callee, args) {
  return {
    "type": "CallExpression",
    "callee": callee,
    "arguments": args
  }
}

function memberExpression(object, propName) {
  return {
    "type": "MemberExpression",
    "computed": false,
    "object": object,
    "property": identifier(propName)
  }
}

function objectExpression(properties) {
  return {
    "type": "ObjectExpression",
    "properties": properties
  }
}

function property(kind, key, value) {
  return {
    "type": "Property",
    "key": stringLiteral(key),
    "value": value,
    "computed": false,
    "kind": kind,
    "method": false,
    "shorthand": false
  }
}

function assignmentExpression(left, right) {
  return {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": left,
    "right": right
  }
}

function returnStatement(ret) {
  return {
    "type": "ReturnStatement",
    "argument": ret
  }
}

function functionExpression(id, params, body) {
  return {
    "type": "FunctionExpression",
    "id": null,
    "params": params,
    "body": {
      "type": "BlockStatement",
      "body": body
    },
    "generator": false,
    "expression": false,
    "async": false
  }
}

function variableDeclaration(kind, decls) {
  return {
    "type": "VariableDeclaration",
    "declarations": decls,
    "kind": kind
  }
}

function variableDeclarator(id, init) {
  return {
    "type": "VariableDeclarator",
    "id": identifier(id),
    "init": init
  }
}

function parseStatement(code) {
  let ast = esprima.parse(code)
  return ast.body[0]
}

function generate(ast) {
  return escodegen.generate(ast)
}

module.exports = {
  identifier,
  stringLiteral,
  program,
  objectExpression,
  memberExpression,
  callExpression,
  expressionStatement,
  property,
  assignmentExpression,
  functionExpression,
  returnStatement,
  variableDeclaration,
  variableDeclarator,
  parseStatement,
  generate
}

/*
`
$$(Partial, {
  src: 'partials/nav',
  current: 'a'
}).append(
  $$('h1')
    .attr({ 'class': 'nav' })
    .append('Hello World')
)`
*/
