import { test } from 'substance-test'
import { Component, DefaultDOMElement } from 'substance'
import { HTMLTemplate } from 'substance-pages'
import * as stubVm from './stub-vm'

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

test("HTMLTemplate: deriving actions", (t) => {
  const html = `
    <Foo src={{props.src}}>
      {{props.children}}
    </Foo>
  `
  let template = new HTMLTemplate(html, {
    components: {
      // ATTENTION: tagNames get lower cased in HTML
      // so we need to register components correctly
      'foo': null
    }
  })
  let actions = template.actions
  t.equal(actions.length, 3, "there should be three actions")
  t.deepEqual(actions.map(a => a.type), ['fragment', 'attribute', 'component'], "the actions should be correctly identified")
  t.equal(actions[0].script.code, 'props.children', "first action should have correct code")
  t.equal(actions[1].name, 'src', "second action should be bound to 'src' attribute")
  t.equal(actions[1].script.code, 'props.src', ".. and should have correct code")
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
    components: {
      'foo': Foo
    }
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

test("HTMLTemplate: scriptlet in same line", (t) => {
  const input = `
    <div>{{props.title}}</div>
  `
  let template = new HTMLTemplate(input)
  let { html } = template.expand(stubVm, { title: 'foo' })
  let dom = DefaultDOMElement.parseHTML(html)
  let div = dom.find('div')
  t.notNil(div, 'generated html should have a <div> element')
  t.equal(div.text(), 'foo', '.. with correct content')
  t.end()
})

test("HTMLTemplate: expanding nested components", (t) => {
  const input = `
    <Foo>
      <Bar>Hello World</Bar>
    </Foo>
  `
  let template = new HTMLTemplate(input, {
    components: {
      'foo': Foo,
      'bar': Bar
    }
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

  templates['foo'] = new HTMLTemplate(foo, {
    components,
    templates
  })
  templates['bar'] = new HTMLTemplate(input, {
    components,
    templates
  })

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

  templates['foo'] = new HTMLTemplate(FOO, { components, templates })
  templates['bar'] = new HTMLTemplate(BAR, { components, templates })
  let template = new HTMLTemplate(input, { components, templates })

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

test("HTMLTemplate: self-closing partial", (t) => {
  const input = `
    <Partial src='foo' />
    <p>Hello World</p>
  `
  const FOO = `
    <div class='foo'>YAY</div>
  `
  let templates = {}
  let components = {}

  templates['foo'] = new HTMLTemplate(FOO, { components, templates })
  let template = new HTMLTemplate(input, { components, templates })

  let { html } = template.expand(stubVm)
  let dom = DefaultDOMElement.parseHTML(html)
  let foo = dom.find('.foo')
  let p = dom.find('p')
  t.notNil(foo, 'generated html should have element .foo')
  t.equal(p.text(), 'Hello World', '.. and a Hello World paragraph')
  t.end()
})

test("HTMLTemplate: undefined result", (t) => {
  const input = "<div>{{props.foo}}</div>"
  let template = new HTMLTemplate(input)
  let { els } = template.expand(stubVm)
  let div = els[0]
  t.equal(div.text().trim(), '', 'element should be empty')
  t.end()
})

test("HTMLTemplate: passing undefined property into partial", (t) => {
  const input = "<Partial src='foo' title={{props.title}} />"
  const FOO = "<div>{{props.title}}</div>"

  let templates = {}
  templates['foo'] = new HTMLTemplate(FOO, { templates })
  let template = new HTMLTemplate(input, { templates })

  let { els } = template.expand(stubVm)
  let div = els[0]
  t.equal(div.text().trim(), '', 'element should be empty')
  t.end()
})
