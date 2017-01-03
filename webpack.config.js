let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      drop_console: false,
      drop_debugger: true
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
];

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: [
    './src/index.js',
  ],
  output: {
    publicPath: '',
    path: path.join(__dirname, 'out'),
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|public\/)/, loader: "babel-loader" },
      { test: /\.json$/, loader: 'json' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [].concat(
    (process.env.NODE_ENV === 'production') ? productionPlugins : [], [
    new CopyWebpackPlugin([
      { from: './assets/package.json', to: 'package.json' },
    ], {}),
  ]),
};
