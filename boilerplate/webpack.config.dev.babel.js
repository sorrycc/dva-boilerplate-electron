import webpack from 'webpack';
import cssImport from 'postcss-import';
import cssNested from 'postcss-nested';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const serverIp = '0.0.0.0';
const serverPort = '4010';

export default [
  {
    target: 'web',
    entry: {
      renderer: [
        './src/renderer/index.js',
        `webpack-dev-server/client?http://${serverIp}:${serverPort}`,
        'webpack/hot/only-dev-server',
      ],
    },
    output: {
      filename: '[name].js',
      publicPath: '/',
    },
    devServer: {
      host: serverIp,
      port: serverPort,
      contentBase: './src/renderer',
      historyApiFallback: true,
      stats: {
        chunks: false,
      },
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
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!postcss-loader',
          ),
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader',
          ),
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader?limit=10000',
        },
      ],
    },
    postcss() {
      return [
        cssImport,
        cssNested,
      ];
    },
    plugins: [
      new ExtractTextPlugin('[name].css', {
        disable: false,
        allChunks: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
];

export {
  serverIp,
  serverPort,
};
