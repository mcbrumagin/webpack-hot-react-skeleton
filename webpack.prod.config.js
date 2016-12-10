var baseConfig = require('./webpack.config.js')
var webpack = require('webpack')
var path = require('path')

// TODO: move dependencies that aren't necessary for prod to devDependencies

var config = {
  entry: [
    path.join(__dirname, './src/client/entry.jsx')
  ],
  output: {
    path: path.join(__dirname, './prod/client'),
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}

module.exports = config
