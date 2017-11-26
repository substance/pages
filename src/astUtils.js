import esprima from 'esprima'
import escodegen from 'escodegen'

export function identifier(name) {
  return {
    "type": "Identifier",
    "name": name
  }
}

export function stringLiteral(str) {
  return {
    "type": "Literal",
    "value": str,
    "raw": `"'${str}'"`
  }
}

export function program(statements) {
  return {
    "type": "Program",
    "body": statements,
    "sourceType": "script"
  }
}

export function expressionStatement(expr) {
  return {
    "type": "ExpressionStatement",
    "expression": expr
  }
}

export function callExpression(callee, args) {
  return {
    "type": "CallExpression",
    "callee": callee,
    "arguments": args
  }
}

export function memberExpression(object, propName) {
  return {
    "type": "MemberExpression",
    "computed": false,
    "object": object,
    "property": identifier(propName)
  }
}

export function objectExpression(properties) {
  return {
    "type": "ObjectExpression",
    "properties": properties
  }
}

export function property(kind, key, value) {
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

export function assignmentExpression(left, right) {
  return {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": left,
    "right": right
  }
}

export function returnStatement(ret) {
  return {
    "type": "ReturnStatement",
    "argument": ret
  }
}

export function functionExpression(id, params, body) {
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

export function variableDeclaration(kind, decls) {
  return {
    "type": "VariableDeclaration",
    "declarations": decls,
    "kind": kind
  }
}

export function variableDeclarator(id, init) {
  return {
    "type": "VariableDeclarator",
    "id": identifier(id),
    "init": init
  }
}

export function parseStatement(code) {
  let ast = esprima.parse(code)
  return ast.body[0]
}

export function generate(ast) {
  return escodegen.generate(ast)
}
