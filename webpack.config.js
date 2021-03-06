const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '/client/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        }
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: 'client/assets/checkmark.png', to: ''},
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'client/assets/index.html',
      title: 'index.html'
    })
  ],
  output: {
    filename: 'priceBundle.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'production'
};