const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.ts'),
  devServer: {
    port: '8080',
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.tsx?$/, // .ts或者tsx后缀的文件，就是typescript文件
        use: 'ts-loader', // 就是上面安装的ts-loader
        exclude: '/node-modules/', // 排除node-modules目录
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets'
        }
      ]
    })
  ],
};
