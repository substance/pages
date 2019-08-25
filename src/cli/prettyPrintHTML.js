import { DefaultDOMElement, isString } from 'substance'

// Note: this essentially a copy of substance.prettyPrintXML with slight adaptions
// TODO: generalize the core implementation to support HTML, too
export default function prettyPrintHTML (html) {
  let dom
  if (isString(html)) {
    dom = DefaultDOMElement.parseHTML(html)
  } else {
    dom = html
  }
  const result = []
  const childNodes = dom.getChildNodes()
  childNodes.forEach(el => {
    _prettyPrint(result, el, 0)
  })
  return result.join('\n')
}

const singleTag = {
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
}

function _prettyPrint (result, el, level) {
  const indent = new Array(level * 2).fill(' ').join('')
  if (el.isElementNode()) {
    const isMixed = _isMixed(el)
    if (isMixed) {
      result.push(indent + el.outerHTML)
    } else {
      const children = el.children
      const tagName = el.tagName
      const tagStr = [`<${tagName}`]
      el.getAttributes().forEach((val, name) => {
        tagStr.push(`${name}="${val}"`)
      })

      if (children.length === 0) {
        if (singleTag[el.tagName]) {
          result.push(indent + tagStr.join(' ') + ' />')
        } else {
          result.push(indent + tagStr.join(' ') + `></${tagName}>`)
        }
      } else {
        result.push(indent + tagStr.join(' ') + '>')
        el.children.forEach((child) => {
          _prettyPrint(result, child, level + 1)
        })
        result.push(indent + `</${tagName}>`)
      }
    }
  } else if (level === 0 && el.isTextNode()) {
    // skip text outside of the root element
  } else {
    result.push(indent + el.outerHTML)
  }
}

function _isMixed (el) {
  const childNodes = el.childNodes
  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i]
    if (child.isTextNode() && !_isTextNodeEmpty(child)) {
      return true
    }
  }
}

function _isTextNodeEmpty (el) {
  return Boolean(/^\s*$/.exec(el.textContent))
}
