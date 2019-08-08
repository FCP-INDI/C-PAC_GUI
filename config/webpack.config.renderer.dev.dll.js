import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';

const dist = path.resolve(process.cwd(), 'app', 'dist', 'dll');

export default merge.smart(baseConfig, {
  context: process.cwd(),

  devtool: 'eval',

  target: 'web',

  externals: [
    'argparse',
    'crypto-browserify',
    'devtron',
    'electron-args',
    'electron-debug',
    'electron-simple-publisher',
    'electron-store',
    'express',
    'find-free-port',
    'fs',
    'fsevents',
    'ini',
    'net',
    'source-map-support',
    'tls',
    'yarn',
  ],

  entry: {
    renderer: (
      Object
        .keys(dependencies || {})
        .filter(dependency => dependency !== 'font-awesome')
    )
  },

  output: {
    path: dist,
    library: '[name]',
    filename: '[name].dev.dll.js',
  },

  devtool: 'eval',

  optimization: {
    minimize: false,
  },

  performance: {
    hints: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
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
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: path.resolve(process.cwd(), 'app'),
        output: {
          path: path.resolve(process.cwd(), 'app', 'dist', 'dll'),
        },
      },
    })
  ],
});
