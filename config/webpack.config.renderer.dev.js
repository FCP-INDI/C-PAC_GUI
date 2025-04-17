import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { execSync } from 'child_process';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import baseConfig from './webpack.config.base';

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}`;

const dist = path.resolve(process.cwd(), 'app', 'dist');
const dll = path.resolve(dist, 'dll');
const manifest = path.resolve(dll, 'renderer.json');

const target = process.env.TARGET == 'browser' ? 'web' : 'electron-renderer';

if (!(fs.existsSync(dll) && fs.existsSync(manifest))) {
  execSync('yarn run build-dll');
}

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

const config = merge(baseConfig, {
  devtool: 'eval-cheap-module-source-map',

  target,

  entry: [
    `webpack-dev-server/client?${publicPath}`,
    path.join(__dirname, '../app/index.js'),
  ],

  output: {
    path: dist,
    pathinfo: false,
    publicPath: '/',
    filename: 'renderer.js'
  },

  optimization: {
    minimize: false,
    emitOnErrors: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ]
  },

  plugins: [
    // new webpack.debug.ProfilingPlugin(),

    new webpack.DllReferencePlugin({
      context: dll,
      manifest: require(manifest),
    }),

    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new HtmlWebpackPlugin({
      template: 'app/app.html',
      cache: true,
      minify: false,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    devMiddleware: {
      publicPath,
    },
    allowedHosts: 'all',
    compress: true,
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
        port: 1212,
      },
      logging: 'info'
    },
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      directory: path.join(__dirname, '..', 'app', 'dist')
    },
    watchFiles: {},
    historyApiFallback: {}
  },
});

export default config;
