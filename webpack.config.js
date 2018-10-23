const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

// webpack.config.js
module.exports = {
  mode: "development",
  entry: "./main.js",
  output: {
    filename: "main.js",
    publicPath: "dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'raw-loader'
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './styles.css', to: 'styles.css', toType: 'file'},
      {from: './index.html', to: 'index.html', toType: 'file'}
    ], {})
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
