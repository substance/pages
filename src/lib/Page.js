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
      this.renderTitle($$)
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
    if (this.props.chunks) {
      headEl.append(
        this.props.chunks.map(chunk => {
          return $$('script').attr('src', chunk)
        })
      )
    }
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

  renderTitle ($$) {
    return $$('title').text(this.props.title)
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
