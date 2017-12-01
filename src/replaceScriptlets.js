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
          scriptlets.push({
            code: text.substring(pos, idx),
            start: pos,
            end: idx
          })
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
  // add line and column information for mapping errors
  _addLineAndColumns(text, scriptlets)

  return { text: frags.join(''), scriptlets }
}

function _addLineAndColumns(text, scriptlets) {
  let newLines = /\r?\n|\r/g
  let m
  // Note: adding this will produce 1-based line numbers
  let lineBreaks = [0]
  while( (m = newLines.exec(text)) ) {
    lineBreaks.push(m.index+m[0].length)
  }
  // EOF
  lineBreaks.push(Number.MAX_VALUE)
  // NOTE: we are exploiting the fact that
  // scriptlets are disjoint and sorted
  let currentLine = 0
  function _seek(pos) {
    while (pos >= lineBreaks[currentLine]) {
      currentLine++
    }
  }
  // ATTENTION lines and columns shall be zero based
  scriptlets.forEach((s) => {
    let line
    // start location
    _seek(s.start)
    line = currentLine-1
    s.startLine = line
    s.startColumn = s.start-lineBreaks[line]
    // end location
    _seek(s.end)
    line = currentLine-1
    s.endLine = line
    s.endColumn = s.end-lineBreaks[line]
  })
}
