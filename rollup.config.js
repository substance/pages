const path = require('path')

module.exports = {
  input: './index.es.js',
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
    // commonjs
    {
      file: path.join(__dirname, 'dist', 'pages.cjs.js'),
      format: 'cjs',
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
}
