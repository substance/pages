import { Component } from 'substance'

export default class Page extends Component {
  render ($$) {
    return $$('html').append(
      this.renderPageHead($$),
      this.renderPageBody($$)
    )
  }

  renderPageHead ($$) {
    const headEl = $$('head')
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
    if (this.props.bootscriptUrl) {
      headEl.append(
        $$('script').attr('src', this.props.bootscriptUrl)
      )
    } else if (this.props.bootscript) {
      headEl.append(
        $$('script').text(this.props.bootscript)
      )
    }
    return headEl
  }

  getTitle ($$) {
    return this.props.title
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
