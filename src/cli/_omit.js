export default function omit (obj, ...fields) {
  const result = Object.assign({}, obj)
  for (const name of fields) {
    delete result[name]
  }
  return result
}
