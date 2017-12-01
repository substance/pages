import resolveRelativeUrl from './resolveRelativeUrl'

export default function({rootDir, siteProps, labels, modules}) {
  if (!rootDir) {
    throw new Error('rootDir is mandatory')
  }
  const path = modules.path
  let siteContext = Object.create({
    getLabel(name) {
      return labels[name] || name
    },
    getRelativeUrl(from, to) {
      if (!from || !to) {
        throw new Error('site.getRelativeUrl(from, to): argument was null.')
      }
      return resolveRelativeUrl(path, rootDir, from, to)
    }
  })
  Object.assign(siteContext, siteProps)
  return siteContext
}
