const esprima = require('esprima')
const escodegen = require('escodegen')
const b = require('./lib/esprima-builder')
const recast = require('recast')

// let code = `
// $$(Partial, {
//   src: 'partials/nav',
//   current: 'a'
// }).append(
//   $$('h1')
//     .attr({ 'class': 'nav' })
//     .append('Hello World')
// )`
// let code = `
// module.exports = function($$, props, context) {
//   COMPONENTS
//   CUSTOMBLOCKS
//   return ELEMENT
// }`
let code = `
module.exports = function($$, props, context) {
  const Partial = context.getComponent('Partial')
  return ELEMENT
}`
let ast = esprima.parse(code)
console.log(JSON.stringify(ast, 0, 2))

/*

let ast = b.program([
  b.expressionStatement(
    b.callExpression(
      b.memberExpression(
        b.callExpression(
          b.identifier('$$'),
          [
            b.identifier('Partial'),
            b.objectExpression([
              b.property(
                "init",
                'src',
                b.stringLiteral('partials/nav')
              ),
              b.property(
                "init",
                'current',
                b.stringLiteral('a')
              )
            ])
          ]
        ),
        'append'
      ),
      [
        b.callExpression(
          b.memberExpression(
            b.callExpression(
              b.memberExpression(
                b.callExpression(
                  b.identifier('$$'),
                  [
                    b.stringLiteral('h1')
                  ]
                ),
                'attr'
              ),
              [
                b.objectExpression([
                  b.property(
                   "init",
                    'class',
                    b.stringLiteral('nav')
                  ),
                ])
              ]
            ),
            'append'
          ),
          [
            b.stringLiteral('Hello World!')
          ]
        )
      ]
    )
  )
])

// console.log(JSON.stringify(ast, 0, 2))
let code = escodegen.generate(ast)
// let code = recast.prettyPrint(ast, { tabWidth: 2 }).code;
console.log(code)

/* AST for

$$(Partial, {
  src: 'partials/nav',
  current: 'a'
}).append(
  $$('h1')
    .attr({ 'class': 'nav' })
    .append('Hello World')
)

{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "$$"
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "Partial"
              },
              {
                "type": "ObjectExpression",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "src"
                    },
                    "computed": false,
                    "value": {
                      "type": "Literal",
                      "value": "partials/nav",
                      "raw": "'partials/nav'"
                    },
                    "kind": "init",
                    "method": false,
                    "shorthand": false
                  },
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "current"
                    },
                    "computed": false,
                    "value": {
                      "type": "Literal",
                      "value": "a",
                      "raw": "'a'"
                    },
                    "kind": "init",
                    "method": false,
                    "shorthand": false
                  }
                ]
              }
            ]
          },
          "property": {
            "type": "Identifier",
            "name": "append"
          }
        },
        "arguments": [
          {
            "type": "CallExpression",
            "callee": {
              "type": "MemberExpression",
              "computed": false,
              "object": {
                "type": "CallExpression",
                "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                    "type": "CallExpression",
                    "callee": {
                      "type": "Identifier",
                      "name": "$$"
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "value": "h1",
                        "raw": "'h1'"
                      }
                    ]
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "attr"
                  }
                },
                "arguments": [
                  {
                    "type": "ObjectExpression",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "Literal",
                          "value": "class",
                          "raw": "'class'"
                        },
                        "computed": false,
                        "value": {
                          "type": "Literal",
                          "value": "nav",
                          "raw": "'nav'"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                      }
                    ]
                  }
                ]
              },
              "property": {
                "type": "Identifier",
                "name": "append"
              }
            },
            "arguments": [
              {
                "type": "Literal",
                "value": "Hello World",
                "raw": "'Hello World'"
              }
            ]
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}
*/