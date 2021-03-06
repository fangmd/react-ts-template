/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge');

const webpackConfigBase = require('./webpack.base.config')

const webpackConfigDev = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [path.join(__dirname, '../src', 'index.tsx')],
  },
  output: {
    filename: 'static/js/bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../build'),
      staticOptions: {},
      serveIndex: true,
      watch: true,
    },
    compress: true,
    port: 4000,
    hot: true,
    historyApiFallback: true, // router history 模式下需要
    proxy: {
      '/user': 'http://api.fangmingdong.com/',
    },
  },
}

const baseConfig = webpackConfigBase()

module.exports = merge(baseConfig, webpackConfigDev)
