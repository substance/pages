const DOT = '.'.charCodeAt(0)
const SLASH = '/'.charCodeAt(0)

export default function resolveRelativeUrl(pathModule, rootDir, from, to) {
  if (!rootDir) {
    throw new Error('Internal Error')
  }
  // console.log('resolving url to "%s" from "%s"', to, from)

  // the target resource is given as absolute
  // path, i.e. we will interpret it relative to
  // the rootDir
  let p
  let first = to.charCodeAt(0)
  let last = to.charCodeAt(to.length-1)

  const path = pathModule
  if (first === SLASH) {
    p = path.join(rootDir, to)
  } else if (first === DOT) {
    p = path.join(from, to)
  } else {
    // TODO try to look up a resource by going up the tree
    throw new Error('Smart resource lookup is not implemented yet.')
  }
  if (last === SLASH) {
    p = path.join(p, 'index.html')
  }
  from = path.dirname(from) + '/'
  // console.log('?? ', from, p)
  p = path.relative(from, p).replace(/\\/g, '/')
  // console.log('.. =>', p)
  return p
}