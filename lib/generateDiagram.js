module.exports = function generateDiagram(f, opts = {}) {
  const outDir = opts.outDir || '.'
  let ext = path.extname(f)
  let name = path.basename(f, ext)
  switch(ext) {
    case '.flowchart': {
      const flowchart = require('diagrams/src/flowchart/flowchart')
      return new Promise((resolve, reject) => {
        flowchart(f, path.join(outDir, name+'.svg'), (err) => {
          if(err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
    case '.sequence': {
      const sequence = require('diagrams/src/sequence/sequence')
      return new Promise((resolve, reject) => {
        sequence(f, path.join(outDir, name+'.svg'), (err) => {
          if(err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
    default:
      //
  }
}
