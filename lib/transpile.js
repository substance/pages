const antlr4 = require("antlr4")
const parseHTML = require('./html/parseHTML')
const CodeGenerator = require('./CodeGenerator')

module.exports = function transpile(source, ext) {
  if (ext === '.js') {
    return source
  }
  if (ext !== '.html') {
    throw new Error('Only html is supported')
  }

  let ast = parseHTML(source)
  let generator = new CodeGenerator()
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(generator, ast);
  let result = generator.generate()
  return result
}

// JSX based version
// const babel = require('babel-core')
// const template = require('babel-template')

// /*
//   Transforming a JSX file into
//   ```
//   module.exports = function($$, props, context) {
//     let Partial = context.getComponent('Partial')
//     return $$(...)
//   }
// */
// function Plugin(babel) {
//   const MODULE_TEMPLATE = template(`
//     module.exports = function($$, props, context) {
//       COMPONENTS
//       return ELEMENT
//     }
//   `)
//   const GET_COMPONENT_TEMPLATE = template(`
//     const ID = context.getComponent(STR)
//   `)
//   const t = babel.types

//   return {
//     pre() {
//       this.usedComponents = new Set()
//     },
//     visitor: {
//       Program: {
//         exit(path) {
//           // Note: supporting only code consisting of only a single element,
//           // not a general JSX module.
//           // TODO: maybe we could allow more complex things later (?)
//           const body = path.get('body')
//           if (body.length !== 1) {
//             throw new Error('JSX file must consist of only a single JSX element')
//           }
//           let getComponentExprs = []
//           this.usedComponents.forEach((name) => {
//             getComponentExprs.push(GET_COMPONENT_TEMPLATE({
//               ID:  t.identifier(name),
//               STR: t.stringLiteral(name)
//             }))
//           })
//           let element = path.get("body.0")
//           let repl = MODULE_TEMPLATE({
//             COMPONENTS: getComponentExprs,
//             ELEMENT: element.node
//           })
//           element.replaceWith(repl)
//         }
//       },
//       CallExpression(path) {
//         const node = path.node
//         const name = node.callee.name
//         if (name === '$$') {
//           let first = node.arguments[0]
//           if (t.isIdentifier(first)) {
//             this.usedComponents.add(first.name)
//           }
//         }
//       }
//     }
//   }
// }

// module.exports = function(src) {
//   return babel.transform(src, {
//     plugins: [
//       "syntax-jsx",
//       [ "babel-plugin-transform-react-jsx", { pragma: "$$" } ],
//       Plugin
//     ]
//   })
// }
