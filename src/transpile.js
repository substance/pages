import { parseHTML, walk } from './htmlparser'
import CodeGenerator from './CodeGenerator'

export default function transpile(source, ext) {
  if (ext === '.js') {
    return source
  }
  if (ext !== '.html') {
    throw new Error('Only html is supported')
  }
  let ast = parseHTML(source)
  let generator = new CodeGenerator()
  walk(ast, generator)
  let result = generator.generate()
  return result
}