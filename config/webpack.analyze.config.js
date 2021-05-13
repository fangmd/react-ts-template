/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')

const webpackProdConfig = {
  mode: 'production',
  entry: {
    app: ['@babel/polyfill', path.join(__dirname, '../src', 'index.tsx')],
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: 'advanced',
        },
      }),
    ], // [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'), //匹配文件名
      threshold: 10240, //对10K以上的数据进行压缩
      minRatio: 0.8,
      deleteOriginalAssets: false, //是否删除源文件,删除的话不会有js文件，都是gz文件
    }),
    new BundleAnalyzerPlugin(),
  ],
}

const baseConfig = webpackConfigBase('production')

const resultConfig = merge(baseConfig, webpackProdConfig)

console.log(resultConfig)

module.exports = resultConfig
