export default function requireUncached (f) {
  const absPath = require.resolve(f)
  delete require.cache[absPath]
  return require(absPath)
}
