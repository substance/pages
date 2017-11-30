const path = require('path')

module.exports = function generateDiagram(f, opts = {}) {
  const outDir = opts.outDir || '.'
  const diagramsDir = opts.diagrams || require.resolve('diagrams')
  const diagramsSrcDir = path.dirname(diagramsDir)
  let ext = path.extname(f)
  let name = path.basename(f, ext)
  switch(ext) {
    case '.flowchart': {
      const flowchart = require(diagramsSrcDir+'/flowchart/flowchart')
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
      const sequence = require(diagramsSrcDir+'/sequence/sequence')
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
