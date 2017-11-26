import { test } from 'substance-test'
import { Component, DefaultDOMElement } from 'substance'
import { replaceScriptlets, HTMLTemplate } from 'substance-pages'
import * as stubVm from './stub-vm'

test("replaceScriptlets: content scriptlet", (t) => {
  const html = "<div foo={{props.foo}}>{{props.children}}</div>"
  let { text, scriptlets } = replaceScriptlets(html)
  t.equal(scriptlets.length, 2, "there should be two scriptlets")
  t.equal(text, "<div foo=@0@>@1@</div>", "scriptlets should have been replace correctly")
  t.equal(scriptlets[0], 'props.foo', "first scriptlet should be extracted correctly")
  t.equal(scriptlets[1], 'props.children', "second scriptlet should be extracted correctly")
  t.end()
})

test("HTMLTemplate: deriving actions", (t) => {
  const html = `
    <Foo src={{props.src}}>
      {{props.children}}
    </Foo>
  `
  let template = new HTMLTemplate(html, {
    // ATTENTION: tagNames get lower cased in HTML
    // so we need to register components correctly
    'foo': null
  })
  let actions = template.actions
  t.equal(actions.length, 3, "there should be three actions")
  t.deepEqual(actions.map(a => a.type), ['fragment', 'attribute', 'component'], "the actions should be correctly identified")
  t.equal(actions[0].code, 'props.children', "first action should have correct code")
  t.equal(actions[1].name, 'src', "second action should be bound to 'src' attribute")
  t.equal(actions[1].code, 'props.src', ".. and should have correct code")
  t.equal(actions[2].name, 'foo', "third should have correct component name")
  t.end()
})

test("HTMLTemplate: expanding a template", (t) => {
  const input = `
    <Foo foo="bar">
      <p>Hello World</p>
    </Foo>
  `
  let template = new HTMLTemplate(input, {
    'foo': Foo
  })
  let { html } = template.expand(stubVm, { src: 'foo' })
  let dom = DefaultDOMElement.parseHTML(html)
  let foo = dom.find('.foo')
  let baz = dom.find('.baz')
  let p = dom.find('p')
  t.notNil(foo, 'generated html should have element .foo')
  t.equal(foo.attr('foo'), 'bar', '.. with the provided attribute set correctly')
  t.notNil(baz, '.. and an element .baz')
  t.notNil(p, '.. and a paragraph')
  t.equal(p.text(), 'Hello World', '.... with correct content')
  t.end()
})

test("HTMLTemplate: expanding nested components", (t) => {
  const input = `
    <Foo>
      <Bar>Hello World</Bar>
    </Foo>
  `
  let template = new HTMLTemplate(input, {
    'foo': Foo,
    'bar': Bar
  })
  let { html } = template.expand(stubVm)
  let dom = DefaultDOMElement.parseHTML(html)
  let foo = dom.find('.foo')
  let bar = dom.find('.bar')
  t.notNil(foo, 'generated html should have element .foo')
  t.notNil(bar, '.. and an element .bar')
  t.equal(bar.text(), 'Hello World', '.... with correct content')
  t.end()
})

test("HTMLTemplate: partial", (t) => {
  const foo = `
    <div class={{props.class}}>
      {{props.children}}
    </div>
  `
  const input = `
    <Partial src='foo' class='bar'>
      <p>Hello World</p>
    </Partial>
  `
  let templates = {}
  let components = {}

  templates['foo'] = new HTMLTemplate(foo, components, templates)
  templates['bar'] = new HTMLTemplate(input, components, templates)

  let template = templates['bar']
  let { html } = template.expand(stubVm)
  let dom = DefaultDOMElement.parseHTML(html)
  let bar = dom.find('.bar')
  let p = bar.find('p')
  t.notNil(bar, 'generated html should have element .bar')
  t.equal(p.text(), 'Hello World', '.. with a Hello World paragraph')
  t.end()
})

test("HTMLTemplate: nested partials", (t) => {
  const input = `
    <Partial src='foo'>
      <p>Hello World</p>
    </Partial>
  `
  const FOO = `
    <div class='foo'>
      <Partial src='bar'>
        {{props.children}}
      </Partial>
    </div>
  `
  const BAR = `
    <div class='bar'>
      {{props.children}}
    </div>
  `

  let templates = {}
  let components = {}

  templates['foo'] = new HTMLTemplate(FOO, components, templates)
  templates['bar'] = new HTMLTemplate(BAR, components, templates)
  let template = new HTMLTemplate(input, components, templates)

  let { html } = template.expand(stubVm)
  let dom = DefaultDOMElement.parseHTML(html)
  let foo = dom.find('.foo')
  let bar = foo.find('.bar')
  let p = bar.find('p')
  t.notNil(foo, 'generated html should have element .foo')
  t.notNil(bar, '.. with child element .bar')
  t.equal(p.text(), 'Hello World', '.... containing a Hello World paragraph')
  t.end()
})

class Foo extends Component {
  render($$) {
    return $$('div').addClass('foo')
      .attr('foo', this.props.foo)
      .append(
        $$('div').addClass('baz')
          .append(this.props.children)
      )
  }
}

class Bar extends Component {
  render($$) {
    return $$('div').addClass('bar')
      .append(this.props.children)
  }
}
