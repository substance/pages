import { Component } from 'substance'
import bootscript from './_bootscript'

export default class Page extends Component {
  render ($$) {
    return $$('html').append(
      this.renderPageHead($$),
      this.renderPageBody($$)
    )
  }

  renderPageHead ($$) {
    const config = this.props.config || {}
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
    if (!config.static) {
      // store the props
      headEl.append(
        $$('script').attr({
          id: 'substance-page-props',
          type: 'application/json'
        }).text(JSON.stringify(this.props))
      )
      if (this.props.chunks) {
        headEl.append(
          this.props.chunks.map(chunk => {
            return $$('script').attr('src', chunk)
          })
        )
      }
      // boot script
      headEl.append(
        $$('script').text(bootscript(this.props))
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
