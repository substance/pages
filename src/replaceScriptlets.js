const SCRIPTLET_OPEN = '{{'
const SCRIPTLET_CLOSE = '}}'

export default function replaceScriptlets(text) {
  let scriptlets = []
  const L = text.length
  let pos = 0
  let frags = []
  let state = 0
  while (pos < L) {
    switch (state) {
      case 0: {
        let idx = text.indexOf(SCRIPTLET_OPEN, pos)
        if (idx < 0) {
          frags.push(text.substring(pos))
          pos = L
        } else {
          if (idx > 0) {
            frags.push(text.substring(pos, idx))
          }
          pos = idx + SCRIPTLET_OPEN.length
          state = 1
        }
        break
      }
      case 1: {
        let idx = text.indexOf(SCRIPTLET_CLOSE, pos)
        if (idx < 0) {
          frags.push(text.substring(pos))
          pos = L
        } else {
          frags.push(`@${scriptlets.length}@`)
          scriptlets.push(text.substring(pos, idx))
          pos = idx + SCRIPTLET_CLOSE.length
          state = 0
        }
        break
      }
      default:
        //
    }
  }
  if (state === 1) {
    let tail = text.substring(pos)
    console.error('Found unclosed scriplet.', tail)
    frags.push(tail)
  }
  return { text: frags.join(''), scriptlets }
}
