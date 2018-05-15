import {
  isArray, forEach, MemoryDOMElement,
  RenderingEngine, VirtualElement
} from 'substance'
import replaceScriptlets from './replaceScriptlets'

const SCRIPTLET = /@([0-9]+)@/g

/*
  Takes HTML with scriptlets and components
  and expands it into pure HTML.
*/
export default class HTMLTemplate {

  constructor(html, opts = {}) {
    this.origHtml = html
    this.components = opts.components || {}
    this.templates = opts.templates || {}
    this.filename = opts.filename || '<template>'

    // first preprocess the HTML string
    // - trim
    // - replacing all scriptlets with a HTML safe string
    // FIXME: it seems that must terminate with a line-break
    // html = html.trim() + "\n"
    let { text, scriptlets }= replaceScriptlets(html)
    html = text
    this.html = html
    this.scriptlets = scriptlets

    // then we parse the preprocessed html and
    // store the els which serve as the template DOM
    // TODO: can we generalize this, i.e. so it could work
    // with BrowserDOMElement too?
    let doc = MemoryDOMElement.parseMarkup(html, 'html', {
      raw: true,
      recognizeSelfClosing: true
    })
    this.els = doc.childNodes
    this.document = doc

    // analyze the template and record actions
    this.actions = []

    // transform the original DOM and record actions
    this._initialize()
  }

  /*
    walk through the DOM
    - insert elements for structural scriptlets
    -> would be good to have something like DOMFragment
    - record a sequence of actions, representing
      transformations to be done on the Template DOM
  */
  _initialize() {
    let actions = []

    // TODO: can we generalize this, i.e. so it could work
    // with BrowserDOMElement too?
    let analyzeElement = (el) => {
      if (el.type === 'tag') {
        const tagName = el.tagName
        if (tagName === 'partial') {
          actions.push({
            type: 'partial',
            src: el.attr('src'),
            level: _getLevel(el),
            el,
            renderedEls: [el]
          })
        } else if (this.components.hasOwnProperty(el.tagName)) {
          actions.push({
            type: 'component',
            name: el.tagName,
            level: _getLevel(el),
            el,
            renderedEl: el
          })
        }
        forEach(el.attributes, (val, name) => {
          let m = SCRIPTLET.exec(val)
          if (m) {
            let scriptletId = m[1]
            let script = this.scriptlets[scriptletId]
            actions.push({
              type: 'attribute',
              level: _getLevel(el),
              el,
              name,
              script
            })
          }
        })
      } else if (el.type === 'text') {
        let doc = el.getOwnerDocument()
        let text = el.text()
        let frags = []
        let pos = 0
        let m
        while ( (m = SCRIPTLET.exec(text)) ) {
          let start = m.index
          let scriptletId = m[1]
          let script = this.scriptlets[scriptletId]
          let placeHolder = doc.createComment(script.code)
          if (start > pos) {
            frags.push(doc.createTextNode(text.substring(pos, start)))
          }
          frags.push(placeHolder)
          actions.push({
            type: 'fragment',
            level: _getLevel(el),
            // we will maintain the elements here
            // which will be replaced by the next expand
            els: [placeHolder],
            script
          })
          pos = start + m[0].length
        }
        if (pos < text.length) {
          frags.push(doc.createTextNode(text.substring(pos)))
        }
        if (frags.length > 0) {
          _replaceWith(el, frags)
        }
      }
    }

    this.els.forEach((el) => {
      _walk(el, analyzeElement)
    })

    // sort actions by
    // 1. level of elements
    // 2. attributes before components
    actions.sort((a, b) => {
      if (a.level > b.level) return -1
      if (a.level < b.level) return 1
      if (a.type === 'attribute') return -1
      if (b.type === 'attribute') return 1
      return 0
    })

    this.actions = actions
  }

  expand(vm, props = {}, context = {}, globals = {}) {
    this.deps = {}
    // TODO: run actions, i.e.update DOM before serialization
    this.actions.forEach((a) => {
      switch (a.type) {
        case 'attribute': {
          this._expandAttribute(vm, props, context, globals, a)
          break
        }
        case 'fragment': {
          this._expandFragment(vm, props, context, globals, a)
          break
        }
        case 'partial': {
          this._expandPartial(vm, props, context, globals, a)
          break
        }
        case 'component': {
          this._expandComponent(vm, props, context, globals, a)
          break
        }
        default:
          throw new Error('Unknown action type.')
      }
    })
    let html = this.els.map(el => el.serialize()).join('')
    let els = this.els.map(el => el.clone(true))
    return { html, els }
  }

  getDependencies() {
    // walk through all deps and collect filenames
    // that influence this template directly or indirectly
    let deps = new Set([this.filename])
    // get all templates this one depends on
    let ts = this.actions.map((a) => {
      return this.templates[a.src]
    }).filter(Boolean)
    // collect dependencies recursively
    ts.forEach((t) => {
      // guard to detect cyclics
      if (t._visiting) throw new Error('Cyclic dependency detected!')
      t._visiting = true
      t.getDependencies().forEach(f => deps.add(f))
      t._visiting = false
    })
    return deps
  }

  _getScriptContext(context, props, globals) {
    const document = this.document
    const $$ = document.createElement.bind(document)
    return Object.assign({}, globals, { context, props, document, $$})
  }

  _expandAttribute(vm, props, context, globals, a) {
    // executing the code in a sandbox
    // and taking the result as string
    let script = a.script
    script = new vm.Script(script.code, {
      filename: this.filename,
      lineOffset: script.startLine,
      columnOffset: script.startColumn,
    })
    let scriptContext = this._getScriptContext(context, props, globals)
    let result = script.runInNewContext(scriptContext)
    let val = result ? String(result) : ''
    a.el.attr(a.name, val)
  }

  _expandFragment(vm, props, context, globals, a) {
    // executing the code in a sandbox
    // and replacing the old elements in the DOM
    // with the result of the executed code
    let script = a.script
    script = new vm.Script(script.code, {
      filename: this.filename,
      lineOffset: script.startLine,
      columnOffset: script.startColumn,
    })
    let scriptContext = this._getScriptContext(context, props, globals)
    let result = script.runInNewContext(scriptContext)
    let els = []
    if (result) {
      if (!isArray(result)) {
        result = [result]
      }
      els = result.map((el) => {
        if (!el) return el
        if (!el._isDOMElement) {
          return this.document.createTextNode(String(el))
        }
        return el
      }).filter(Boolean)
    }
    // if there is nothing coming back from the script
    // insert a comment element
    if (els.length === 0) {
      els.push(this.document.createComment(a.script.code))
    }
    _replaceWith(a.els, els)
    a.els = els
  }

  _expandComponent(vm, props, context, globals, a) {
    const name = a.name
    // get the component class and render it
    // insert the resulting element into the DOM
    // TODO: if the el had a component attached already,
    // we could just rerender that component
    let ComponentClass = this.components[name]
    if (ComponentClass) {
      let compEl = this.document.createElement('div')
      // Now it is getting difficult:
      // ATM we can't just pass in DOMElements as children
      // as Component.render() uses Virtual elements
      // we need to take the children from the template DOM
      // and turn them into VirtualElements, and then just
      let compProps = {}
      a.el.getAttributes().forEach((val, key) => {
        compProps[key] = val
      })
      compProps.children = a.el.getChildNodes().map(_mapToVirtualElement)
      let comp = new ComponentClass(null, compProps, {
        context,
        el: compEl,
        renderingEngine: Component.createRenderingEngine({
          elementFactory: this.document
        })
      })
      comp._render()
      _replaceWith(a.renderedEl, compEl)
      a.renderedEl = compEl
    } else {
      console.error('Component not found: ', name)
    }
  }

  _expandPartial(vm, props, context, globals, a) {
    let src = a.src
    let template = this.templates[src]
    if (template) {
      let partialProps = {}
      a.el.getAttributes().forEach((val, key) => {
        partialProps[key] = val
      })
      partialProps.children = a.el.getChildNodes().map(el => el.clone(true))
      let { els } = template.expand(vm, partialProps, context, globals)
      _replaceWith(a.renderedEls, els)
      a.renderedEls = els
    } else {
      console.error('Template not found: ', src)
    }
  }
}

function _getLevel(el) {
  if (!el) return 0
  if (!el.hasOwnProperty('_level')) {
    el._level = _getLevel(el.parentNode) + 1
  }
  return el._level
}

function _walk(el, cb) {
  let stack = [el]
  while(stack.length > 0) {
    let next = stack.pop()
    cb(next)
    if (next.childNodes) {
      for (var i = next.childNodes.length - 1; i >= 0; i--) {
        let c = next.childNodes[i]
        stack.push(c)
      }
    }
  }
}

function _replaceWith(oldEls, els) {
  if (!isArray(oldEls)) {
    oldEls = [oldEls]
  }
  if (!isArray(els)) {
    els = [els]
  }
  let first = oldEls[0]
  let parent = first.parentNode
  els.forEach(el => parent.insertBefore(el, first))
  oldEls.forEach(oldEl => parent.removeChild(oldEl))
}

function _mapToVirtualElement(el) {
  // TODO: can we generalize this, i.e. so it could work
  // with BrowserDOMElement too?
  if (el.type === 'tag') {
    let vel = VirtualElement.createElement(el.tagName)
    vel.attr(el.getAttributes())
    vel.html(el.innerHTML)
    return vel
  }
  if (el.type === 'text') {
    return el.text()
  }
}