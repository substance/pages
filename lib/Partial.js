const { Component } = require('substance')

module.exports = class Partial extends Component {

  render($$) {
    const src = this.props.src
    let renderer = this.context.getRenderer(src)
    if (!renderer) throw new Error(`Could not find partial '${src}'`)
    return renderer($$, this.props, this.context)
  }

}