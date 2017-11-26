import { DefaultDOMElement, Component } from 'substance'

/*
  This is passed as 'context' to renderers, and as usual
  in Components for dependency injection
*/
export default class RenderContext {

  constructor(components, renderers, labels) {
    this.components = components
    this.renderers = renderers
    this.labels = labels
    this._state = {}
  }

  getComponent(name) {
    let comp = this.components[name]
    if (!comp) throw new Error(`Could not find Component '${name}'`)
    return comp
  }

  getRenderer(name) {
    let renderer = this.renderers[name]
    if (!renderer) throw new Error(`Could not find Renderer '${name}'`)
    return renderer
  }

  get labelProvider() {
    return this
  }

  getLabel(name) {
    return this.labels[name] || name
  }

  getCurrentPage() {
    return this._state.currentPage
  }

  render(page) {
    this._state.currentPage = page
    let renderer = this.getRenderer(page)
    let doc = DefaultDOMElement.createDocument('html')
    doc.empty()
    let comp = new Wrapper(null, { renderer }, { context: this })
    comp.mount(doc)
    let el = doc.children[0]
    return ['<!DOCTYPE html>', el.innerHTML].join('\n')
  }
}

// HACK: making sure that we can still access the RenderContext API on deeper levels
// This differs from the original implementation in that way that it
// uses a prototype chain to 'inherit' from the parent context, instead
// of creating a new plain object via merging
Component.prototype._getContext = function() {
  const parent = this.getParent()
  if (parent) {
    let context = Object.create(parent.context)
    if (parent.getChildContext) {
      Object.assign(context, parent.getChildContext())
    }
    return context
  } else {
    return {}
  }
}

// This Wrapper Component is necessary, because RenderingEngine
// is very much tied to re-rendering of Components ATM.
class Wrapper extends Component {
  render($$) {
    return $$('div').append(
      this.props.renderer($$, this.props, this.context)
    )
  }
}
