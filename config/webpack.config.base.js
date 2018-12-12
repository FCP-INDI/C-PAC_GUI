import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-transform-flow-strip-types",
              "@babel/plugin-proposal-function-bind",
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-logical-assignment-operators",
              ["@babel/plugin-proposal-optional-chaining", { loose: false }],
              ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
              "@babel/plugin-proposal-do-expressions",

              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",

              "transform-es2015-modules-commonjs",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              ["@babel/plugin-proposal-class-properties", { loose: false }],
              "@babel/plugin-proposal-json-strings",

              'react-hot-loader/babel',
            ]
          }
        }
      },
      {
        test: /\.ya?ml$/,
        use: 'raw-loader'
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    library: 'CPAC',
    libraryTarget: 'assign'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, '..', 'c-pac'),
      path.join(__dirname, '..', 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
