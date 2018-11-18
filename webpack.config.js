const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, "src/server.js")]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'server.bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [{
        test: /\.m?js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets:['@babel/preset-env']
          }
        }
      }]
  },
  node: {
    __dirname : false
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
}