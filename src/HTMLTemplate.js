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

  constructor(html, components = {}, templates = {}) {
    this.origHtml = html
    this.components = components
    this.templates = templates

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
    let els = MemoryDOMElement.parseMarkup(html, 'html', { snippet: true })
    if (!isArray(els)) {
      els = [els]
    }
    this.els = els
    this.document = els[0].getOwnerDocument()

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
            actions.push({
              type: 'attribute',
              level: _getLevel(el),
              el,
              name,
              code: this.scriptlets[scriptletId]
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
          if (m.index > pos) {
            let scriptletId = m[1]
            let code = this.scriptlets[scriptletId]
            let placeHolder = doc.createComment(code)
            frags.push(doc.createTextNode(text.substring(pos, m.index)))
            frags.push(placeHolder)
            actions.push({
              type: 'fragment',
              level: _getLevel(el),
              // we will maintain the elements here
              // which will be replaced by the next expand
              els: [placeHolder],
              code
            })
          }
          pos = m.index + m[0].length
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
    let html = this.els.map(el => el.serialize()).join('\n')
    let els = this.els.map(el => el.clone(true))
    return { html, els }
  }

  _expandAttribute(vm, props, context, globals, a) {
    // executing the code in a sandbox
    // and taking the result as string
    let script = new vm.Script(a.code)
    let scriptContext = Object.assign({}, globals, { context, props })
    let result = script.runInNewContext(scriptContext)
    a.el.attr(a.name, String(result))
  }

  _expandFragment(vm, props, context, globals, a) {
    // executing the code in a sandbox
    // and replacing the old elements in the DOM
    // with the result of the executed code
    let script = new vm.Script(a.code)
    let scriptContext = Object.assign({}, globals, { context, props })
    let result = script.runInNewContext(scriptContext)
    if (!isArray(result)) {
      result = [result]
    }
    let els = result.map((el) => {
      if (!el) return el
      if (!el._isDOMElement) {
        return this.document.createTextNode(String(el))
      }
      return el
    }).filter(Boolean)
    // if there is nothing coming back from the script
    // insert a comment element
    if (els.length === 0) {
      els.push(this.document.createComment(a.code))
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
      // TODO: now it is getting difficult
      // ATM we can't just pass in DOMElements as children
      // as Component.render() uses Virtual elements
      // we need to take the children from the template DOM
      // and turn them into VirtualElements, and then just
      let compProps = {}
      a.el.attributes.forEach((val, key) => {
        compProps[key] = val
      })
      compProps.children = a.el.childNodes.map(_mapToVirtualElement)
      let comp = new ComponentClass(null, compProps, {
        context,
        el: compEl,
        renderingEngine: new RenderingEngine({
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
      a.el.attributes.forEach((val, key) => {
        partialProps[key] = val
      })
      partialProps.children = a.el.childNodes.map(el => el.clone(true))
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
  if (!el.hasOwnProperty('level')) {
    el.level = _getLevel(el.parentNode) + 1
  }
  return el.level
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