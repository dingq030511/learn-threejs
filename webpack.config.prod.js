const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const publicPath = '/learn-threejs/'
module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    publicPath
  },
  devServer: {
    port: '8080',
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new DefinePlugin({
      'process.env.PUBLIC_PATH' : JSON.stringify(publicPath)
    }),,
    new CleanWebpackPlugin()
  ]
})
