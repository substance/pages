const path = require('path')

export default function createWebpackConfig ({ pageRoot, pageSourceFile, pageBundleFile, pageClassName }) {
  const bundleDir = path.join(pageRoot, path.dirname(pageBundleFile))
  const pageBundleFilename = path.basename(pageBundleFile)
  return {
    entry: pageSourceFile,
    output: {
      path: bundleDir,
      filename: pageBundleFilename,
      library: pageClassName,
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: 'this'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      mainFields: ['module', 'browser', 'main']
    },
    optimization: {
      usedExports: true
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-transform-react-jsx', {
                  pragma: 'this.renderingEngine.createElement', // default pragma is React.createElement
                  pragmaFrag: '', // default is React.Fragment
                  throwIfNamespace: false // defaults to true
                }]
              ]
            }
          }
        }
      ]
    }
  }
}
