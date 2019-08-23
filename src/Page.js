import { Component } from 'substance'

export default class Page extends Component {
  render ($$) {
    return $$('html').append(
      this.renderPageHead($$),
      this.renderPageBody($$)
    )
  }

  renderPageHead ($$) {
    let headEl = $$('head')
    // title
    headEl.append(
      $$('title').text(this.getTitle())
    )
    // metadata
    headEl.append(
      this.renderMetadata($$)
    )
    // style sheets etc.
    headEl.append(
      this.renderExternalResources($$)
    )
    // scripts
    headEl.append(
      this.renderScripts($$)
    )
    // boot script
    headEl.append(
      $$('script').attr('src', this.getBootscript())
    )
    return headEl
  }

  getTitle ($$) {
    return this.props.title
  }

  getBootscript () {
    return this.props.bootscript
  }

  renderMetadata ($$) {
    return [
      $$('meta').attr('charset', 'UTF-8')
    ]
  }

  renderExternalResources ($$) {}

  renderScripts ($$) {}

  renderPageBody ($$) {
    return $$('body')
  }
}
