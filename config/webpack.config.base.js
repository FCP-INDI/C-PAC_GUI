import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../app/package.json';

const target = process.env.TARGET === 'browser' ? 'browser' : 'electron';

export default {
  // experiments: { futureDefaults: true, },

  externals: Object.keys(externals || {}),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              babelrcRoots: [
                '..',
                './app'
              ],
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.(yml|yaml)$/,
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
    fallback: {
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      events: false,
      http: false,
      https: false,
      os: false,
      path: false,
      punycode: false,
      process: false,
      querystring: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false,
    },
    modules: [
      path.join(__dirname, '..', 'c-pac'),
      path.join(__dirname, '..', 'app'),
      'node_modules',
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      TARGET: target,
      VERSION: JSON.stringify(process.env.npm_package_version),
    }),

    new webpack.NormalModuleReplacementPlugin(/.*\.platform$/, ((resource) => {
      resource.request = resource.request.replace(/platform$/, target);
    })),

    new webpack.ProvidePlugin({
      global: require.resolve('global')
    }),
  ],
};
