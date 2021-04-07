import fs from 'fs'
import path from 'path'
import merge from 'webpack-merge'
import webpack from 'webpack'
import baseConfig from './webpack.config.base'

const dist = path.resolve(process.cwd(), 'app', 'dist')

const config = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',

  target: 'electron-main',

  entry: [
    path.join(__dirname, '../app/main.electron.js'),
  ],

  output: {
    path: dist,
    pathinfo: false,
    publicPath: '/',
    filename: 'main.js'
  },

  optimization: {
    minimize: false,
    emitOnErrors: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      VERSION: JSON.stringify(process.env.npm_package_version),
    }),
  ],
})

export default config
