const path = require('path')

/**
 * Creates a webpack configuration
 * @param {object} pages
 */
export default function _createWebpackConfig (pages, options = {}) {
  const mode = options.mode || 'production'
  const outputDir = options.outputDir || 'dist'
  const cwd = process.cwd()

  const jsxSupport = {
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
  const devConfig = {
    entry: pages,
    output: {
      path: path.join(cwd, outputDir, 'js'),
      filename: '[name].page.js',
      library: '[name]Page',
      libraryTarget: 'window'
    },
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx'],
      mainFields: ['esnext', 'module', 'browser', 'main']
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'initial',
        minSize: 0,
        maxSize: 0,
        minChunks: 1,
        maxInitialRequests: 5,
        automaticNameDelimiter: '~',
        name: true
      }
    },
    module: jsxSupport
  }

  let browserConfig = devConfig

  if (mode === 'production') {
    // production settings are derived from dev settings
    const output = Object.assign({}, devConfig.output, {
      filename: '[name].[contenthash].page.js'
    })
    const TerserPlugin = require('terser-webpack-plugin')
    const optimization = Object.assign({}, devConfig.optimization, {
      usedExports: true,
      minimize: true,
      // Note: using more aggressive mangling for better obfuscation
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 6,
            mangle: {
              properties: true
            },
            compress: {
              drop_console: true
            },
            // nameCache: null,
            toplevel: true
          }
        })
      ]
    })
    const prodConfig = Object.assign({}, devConfig, {
      output,
      mode: 'production',
      devtool: false,
      resolve: {
        extensions: ['.js', '.jsx'],
        mainFields: ['esnext', 'module', 'browser', 'main']
      },
      optimization
    })
    browserConfig = prodConfig
  }

  // this is used internally only by the site generator
  const nodeConfig = {
    entry: pages,
    output: {
      path: path.join(cwd, 'tmp'),
      filename: '[name].page.cjs.js',
      library: '[name]Page',
      libraryTarget: 'commonjs',
      libraryExport: 'default'
    },
    mode: 'development',
    module: jsxSupport,
    externals: ['substance', 'substance-pages']
  }

  return [browserConfig, nodeConfig]
}
