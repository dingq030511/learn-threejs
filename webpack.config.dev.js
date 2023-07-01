const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const { DefinePlugin } = require('webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: '8080',
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new DefinePlugin({
      'process.env.PUBLIC_PATH' : JSON.stringify('/')
    }),
  ]
})
