const path = require('path')

module.exports = [
  // lib
  {
    input: './src/lib/index.js',
    output: [
      // browser
      // TODO: this should be minified
      {
        file: path.join(__dirname, 'dist', 'pages.js'),
        format: 'umd',
        name: 'substancePages',
        globals: {
          substance: 'substance'
        },
        sourcemap: true
      },
      // module
      {
        file: path.join(__dirname, 'dist', 'pages.es.js'),
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['substance']
  },
  // lib + cli (commonjs only)
  {
    input: './index.es.js',
    output: {
      file: path.join(__dirname, 'dist', 'pages.cjs.js'),
      format: 'cjs',
      sourcemap: true
    },
    external: ['substance']
  }
]
