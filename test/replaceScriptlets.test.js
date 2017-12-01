import { test } from 'substance-test'
import { replaceScriptlets } from 'substance-pages'

test("replaceScriptlets: content scriptlet", (t) => {
  const html = "<div foo={{props.foo}}>{{props.children}}</div>"
  let { text, scriptlets } = replaceScriptlets(html)
  t.equal(scriptlets.length, 2, "there should be two scriptlets")
  t.equal(text, "<div foo=@0@>@1@</div>", "scriptlets should have been replace correctly")
  t.equal(scriptlets[0].code, 'props.foo', "first scriptlet should be extracted correctly")
  t.equal(scriptlets[1].code, 'props.children', "second scriptlet should be extracted correctly")
  t.end()
})

test("replaceScriptlets: line and columns", (t) => {
  const html = `<div foo={{props.foo}}>
  {{
    props.children
  }}
</div>`
  let { scriptlets } = replaceScriptlets(html)
  t.equal(scriptlets.length, 2, "there should be two scriptlets")
  let range
  range = _range(scriptlets[0])
  t.equal(String(range.start), String([0,11]), "first should have correct start location")
  t.equal(String(range.end), String([0,20]), "first should have correct end location")
  range = _range(scriptlets[1])
  t.equal(String(range.start), String([1,4]), "second should have correct start location")
  t.equal(String(range.end), String([3,2]), "second should have correct end location")
  t.end()
})

function _range(s) {
  return {
    start: [s.startLine, s.startColumn],
    end: [s.endLine, s.endColumn]
  }
}