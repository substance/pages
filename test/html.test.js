import { test } from 'substance-test'
import { CodeGenerator, parseHTML, walk } from 'substance-pages'

test("HTML: content scriptlet", (t) => {
  const html = `
  <div>
    <% props.children %>
  </div>
  `
  const { element } = _analyze(html)
  t.equal(element.type, 'element', 'root should be element')
  t.equal(element.tagName, 'div', '.. with correct tagName')
  t.equal(element.children.length, 1, '.. with 1 child')
  let child = element.children[0]
  t.equal(child.type, 'scriptlet', '.. which should be a scriptlet')
  t.equal(child.code.trim(), 'props.children', '.. with correct source code')
  t.end()
})

function _analyze(html) {
  let ast = parseHTML(html)
  let generator = new CodeGenerator()
  walk(ast, generator)
  return {
    components: Array.from(generator.components),
    element: generator.element,
    customBlocks: generator.customBlocks
  }
}
