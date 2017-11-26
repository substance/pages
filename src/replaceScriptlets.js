const SCRIPTLET = /{{(.*?)}}/g

export default function replaceScriptlets(text) {
  let scriptlets = []
  let pos = 0
  let frags = []
  let m
  while ( (m = SCRIPTLET.exec(text)) ) {
    if (m.index > pos) {
      frags.push(text.substring(pos, m.index))
      frags.push(`@${scriptlets.length}@`)
      scriptlets.push(m[1])
    }
    pos = m.index + m[0].length
  }
  if (pos < text.length) {
    frags.push(text.substring(pos))
  }
  return { text: frags.join(''), scriptlets }
}
