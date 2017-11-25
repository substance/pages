const htmlTagNames = new Set(require('html-tag-names'))
const { DefaultDOMElement, map, flattenOften } = require('substance')
const HTMLParserListener = require('./html/HTMLParserListener').HTMLParserListener
const b = require('./esprima-builder')

const SCRIPTLET_RE = /^(?:<%|{{)(.*)(?:%>|}})$/

const MODULE_TEMPLATE = function({ COMPONENTS, CUSTOMBLOCKS, ELEMENT }) {
  return b.program([
    b.expressionStatement(
      b.assignmentExpression(
        b.memberExpression(
          b.identifier('module'),
          'exports'
        ),
        b.functionExpression(null, [
          b.identifier('$$'),
          b.identifier('props'),
          b.identifier('context')
        ],
        [].concat(COMPONENTS).concat(CUSTOMBLOCKS).concat([
          b.returnStatement(ELEMENT)
        ]))
      )
    )
  ])
}

const GET_COMPONENT_TEMPLATE = function(name) {
  return b.variableDeclaration('const', [
    b.variableDeclarator(name,
      b.callExpression(
        b.memberExpression(
          b.identifier('context'),
          'getComponent'
        ),
        [ b.stringLiteral(name) ]
      )
    )
  ])
}

const _CALL = function(OBJ, METHOD, ARGS) {
  return b.callExpression(
    b.memberExpression(
      OBJ,
      METHOD
    ),
    ARGS
  )
}

// ELEMENT.append(CHILDREN)
const APPEND = function({ELEMENT, CHILDREN}) {
  return _CALL(ELEMENT, 'append', CHILDREN)
}
// ELEMENT.attr(ATTRIBUTES)
const SET_ATTRIBUTES = function({ELEMENT, ATTRIBUTES}) {
  return _CALL(ELEMENT, 'attr', [ATTRIBUTES])
}

// ELEMENT.html(HTML)
const SET_INNERHTML = function({ELEMENT, HTML}) {
  return _CALL(ELEMENT, 'html', [HTML])
}

module.exports = class CodeGenerator extends HTMLParserListener {

  constructor() {
    super()

    this.components = new Set()
    this.element = null
    this.customBlocks = []

    this._stack = []
  }

  /* Code generation using babel-template */

  generate() {
    let COMPONENTS = this._generateComponentBlock()
    let CUSTOMBLOCKS = this.customBlocks.map((node) => {
      return b.parseStatement(node.code)
    })
    let ELEMENT = this._generateExpression(this.element)
    let code = b.generate(MODULE_TEMPLATE({
      COMPONENTS,
      CUSTOMBLOCKS,
      ELEMENT
    }))
    return { code }
  }

  _generateComponentBlock() {
    let COMPONENTS = []
    this.components.forEach((name) => {
      COMPONENTS.push(GET_COMPONENT_TEMPLATE(name))
    })
    return COMPONENTS
  }

  _generateExpression(node) {
    switch (node.type) {
      case 'component': {
        // $$(Foo)
        // $$(Foo, {...})
        // $$(Foo).append(children)
        let args = []
        args.push(b.identifier(node.name))
        if (node.props) {
          args.push(this._generateObjectExpression(node.props))
        }
        let expr = b.callExpression(b.identifier('$$'), args)
        if (node.children && node.children.length > 0) {
          let children = flattenOften(node.children, 2)
          expr = APPEND({
            ELEMENT: expr,
            CHILDREN: children.map(c => this._generateExpression(c))
          })
        }
        return expr
      }
      case 'element': {
        // $$('div')
        // $$('div').attr(...)
        // $$('div').append(children)
        let expr = b.callExpression(b.identifier('$$'), [b.stringLiteral(node.tagName)])
        if (node.attributes) {
          expr = SET_ATTRIBUTES({
            ELEMENT: expr,
            ATTRIBUTES: this._generateObjectExpression(node.attributes)
          })
        }
        if (node.children && node.children.length > 0) {
          let children = flattenOften(node.children, 2)
          expr = APPEND({
            ELEMENT: expr,
            CHILDREN: children.map(c => this._generateExpression(c))
          })
        }
        return expr
      }
      case 'script':
      case 'style': {
        // ATM the HTMLParser does not create
        // parse attributes of <script> and <style>
        // so we need to parse it in a different way
        let el = DefaultDOMElement.parseSnippet(node.outerHTML, 'html')
        let expr = b.callExpression(b.identifier('$$'), [b.stringLiteral(node.type)])
        let attributes = el.getAttributes()
        if (attributes.size > 0) {
          expr = SET_ATTRIBUTES({
            ELEMENT: expr,
            ATTRIBUTES: this._generateObjectExpression(attributes)
          })
        }
        expr = SET_INNERHTML({
          ELEMENT: expr,
          HTML: el.innerHTML
        })
        return expr
      }
      case 'string': {
        return b.stringLiteral(node.value)
      }
      case 'scriptlet': {
        let statement = b.parseStatement(node.code)
        return statement.expression
      }
      default:
        throw new Error('Illegal state')
    }
  }

  _generateObjectExpression(obj) {
    let properties = map(obj, (val, name) => {
      return b.property('init', name, this._generateExpression(val))
    })
    return b.objectExpression(properties)
  }

  /* TreeWalker for AST of HTMLParser */

  // enterHtmlDocument(ctx) {
  // }

  exitHtmlDocument() {
    this.element = this._root
  }

  // enterHtmlElements(ctx) {
  // }

  // exitHtmlElements(ctx) {
  // }

  enterHtmlElement() {
    let next = {}
    if (this._current) {
      this._current.children.push(next)
      this._stack.push(this._current)
    }
    this._current = next
  }

  exitHtmlElement() {
    // in case of Components we call
    // attributes 'props'
    let current = this._current
    if (current.type === 'component') {
      current.props = current.attributes
      delete current.attributes
    }
    if (this._stack.length === 0) {
      this._root = current
      delete this._current
    } else {
      this._current = this._stack.pop()
    }
  }

  enterHtmlContent() {
    if (!this._current.children) {
      this._current.children = []
    }
  }

  // exitHtmlContent(ctx) {
  // }

  enterHtmlAttribute() {
    this._insideAttribute = true
  }

  exitHtmlAttribute() {
    if (!this._current.attributes) {
      this._current.attributes = {}
    }
    this._current.attributes[this._attrName] = this._attrValue
    delete this._insideAttribute
    delete this._attrName
    delete this._attrValue
  }

  enterHtmlAttributeName(ctx) {
    this._attrName = ctx.getText()
  }

  // exitHtmlAttributeName(ctx) {
  // }

  // enterHtmlAttributeValue(ctx) {
  // }

  exitHtmlAttributeValue(ctx) {
    // TODO: we did not manager to let
    // the parser detect a scriptlet context
    // because the lexer is producing ATTVALUE_VALUE
    // in this case too
    // Now we are detecting this by looking at the
    // value string
    let str = ctx.getText()
    let m = SCRIPTLET_RE.exec(str)
    if (m) {
      this._attrValue = {
        type: 'scriptlet',
        code: m[1]
      }
    } else {
      // strip the wrapping ""
      let val = str.slice(1,-1)
      this._attrValue = {
        type: 'string',
        value: val
      }
    }
  }

  enterHtmlTagName(ctx) {
    let tagName = ctx.getText()
    if (htmlTagNames.has(tagName)) {
      this._current.type = 'element'
      this._current.tagName = tagName
    } else {
      this._current.type = 'component'
      this._current.name = tagName
      this.components.add(tagName)
    }
  }

  // exitHtmlTagName(ctx) {
  // }

  enterHtmlChardata(ctx) {
    let str = ctx.getText()
    // TODO: do we really want to do this?
    if (/^\r?\n|\r\s*$/.exec(str)) {
      // skip the classical
      // line break
    } else {
      this._current.children.push({
        type: 'string',
        value: str
      })
    }
  }

  // exitHtmlChardata(ctx) {
  // }

  // enterHtmlMisc(ctx) {
  // }

  // exitHtmlMisc(ctx) {
  // }

  // enterHtmlComment(ctx) {
  // }

  // exitHtmlComment(ctx) {
  // }

  enterXhtmlCDATA(ctx) {
    let data = ctx.getText()
    this._current.children.push({
      type: 'cdata',
      data
    })
  }

  // exitXhtmlCDATA(ctx) {
  // }

  // enterDtd(ctx) {
  // }

  // exitDtd(ctx) {
  // }

  // enterXml(ctx) {
  // }

  // exitXml(ctx) {
  // }

  enterScriptlet(ctx) {
    // HACK: how do we know that the scriptlet tag has length 2?
    let code = ctx.getText().slice(2,-2)
    let node = {
      type: 'scriptlet',
      code
    }
    if (!this._current) {
      this.customBlocks.push(node)
    } else if (!this._current.type) {
      this._current.type = 'scriptlet'
      this._current.code = code
    } else {
      throw new Error('Huh?')
    }
  }

  // exitScriptlet(ctx) {
  // }

  // enterScript(ctx) {
  // }

  exitScript(ctx) {
    this._current.children.push({
      type: 'script',
      outerHTML: ctx.getText()
    })
  }

  // enterStyle(ctx) {
  // }

  exitStyle(ctx) {
    this._current.children.push({
      type: 'style',
      outerHTML: ctx.getText()
    })
  }

}