export default function _getBootscript (pageClass, props) {
  return `window.addEventListener('load', () => {
  const { default: PageClass } = ${pageClass}
  if (!PageClass) throw new Error('Could not load page bundle "${pageClass}"')
  let props = ${JSON.stringify(props)}
  PageClass.mount(props, window.document.querySelector('html'), { adoptElement: true })
})
`
}
