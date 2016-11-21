import path from 'path';
import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';

const outputPath = path.join(__dirname, 'app', 'dist');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

export default [
  {
    name: 'renderer',
    devtool: isProd ? '' : 'cheap-eval-source-map',
    entry: './src/renderer/index.js',
    output: {
      path: outputPath,
      filename: 'renderer.js',
    },
    externals(context, request, callback) {
      let isExternal = false;
      const load = [
        'electron',
      ];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              'react',
            ],
            plugins: [
              'transform-es2015-modules-commonjs',
              'transform-async-to-generator',
            ],
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader',
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: 'style-loader!css-loader!postcss-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { // eslint-disable-line quote-props
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),
      new LiveReloadPlugin(),
    ],
    target: 'web',
  },
  {
    name: 'main',
    entry: './src/main/index.js',
    target: 'electron',
    output: {
      path: outputPath,
      filename: 'main.js',
    },
    node: {
      __dirname: true,
    },
    externals(context, request, callback) {
      callback(null, request.charAt(0) === '.' ? false : `require("${request}")`);
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            plugins: [
              'transform-es2015-modules-commonjs',
              'transform-async-to-generator',
            ],
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        $dirname: '__dirname',
      }),
    ],
  },
];
