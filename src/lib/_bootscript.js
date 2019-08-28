export default function bootscript (props) {
  const pageName = props.pageName
  if (!pageName) throw new Error('props.pageName is mandatory')
  const pageClassName = props.PageClass || `window["${pageName + 'Page'}"].default`
  return `window.addEventListener('load', () => {
    const pageName = '${pageName}'
    const PageClass = ${pageClassName}
    if (!PageClass) throw new Error('Could not find PageClass')
    let propsEl = window.document.getElementById('substance-page-props')
    if (!propsEl) throw new Error('Could not find serialized props')
    const props = JSON.parse(propsEl.textContent)
    let htmlEl = window.document.querySelector('html')
    PageClass.mount(props, htmlEl, { adoptElement: true })
})`
}
