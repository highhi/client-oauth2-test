const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  entry: {
    'index.bundle': './src/index.js',
    'auth.bundle': './src/auth.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.mjs', '.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modlues/,
      },
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    port: 9000,
    proxy: {
      '/oauth2/token': {
        target: 'https://www.inoreader.com/oauth2/token',
        changeOrigin: true
      },
      '/api': {
        target: 'https://www.inoreader.com/reader',
        changeOrigin: true
      },
    }
  },

  plugins: [new Dotenv()]
};