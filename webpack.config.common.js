const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].[fullhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader','vue-style-loader','css-loader']
      },
      {
        test: /\.tsx?$/, // .ts或者tsx后缀的文件，就是typescript文件
        loader: 'ts-loader', // 就是上面安装的ts-loader
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: '/node-modules/', // 排除node-modules目录
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
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
    }),
    new VueLoaderPlugin()
  ],
};
