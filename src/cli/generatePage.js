import { DefaultDOMElement } from 'substance'
import prettyPrintHTML from './prettyPrintHTML'

export default function generatePage (PageClass, props = {}) {
  const doc = DefaultDOMElement.parseHTML('<!DOCTYPE html><html><head></head><body></body></html>')
  const htmlEl = doc.find('html')
  PageClass.mount(props, htmlEl, { adoptElement: true })
  const htmlStr = prettyPrintHTML(doc)
  return htmlStr
}
