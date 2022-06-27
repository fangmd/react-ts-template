/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const { merge } = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')

const cdnDomain = 'https://h5-cdn.mountainseas.cn/'

function getEchartZrenderPkgName(module) {
  const path = module.identifier();
  const nameMatchRes = path.match(/[\\/]node_modules[\\/](echarts|zrender)([\\/]|$)/) || [];
  return nameMatchRes[1];
}

const webpackProdConfig = {
  mode: 'production',
  entry: {
    app: [path.join(__dirname, '../src', 'index.tsx')],
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        parallel: true,
        // 以下配置还有问题，不要开启，使用后 build 下，base.css 没有被打包
        // minimizerOptions: {
        //   preset: 'advanced',
        // },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        defaultVendors: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: true,
          test: /node_modules\/(.*)\.js/,
        },
        // 把所有 css 打包到一个文件
        // styles: {
        //   name: 'styles',
        //   test: /\.(less|css)$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
        // vendorReact: {
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/](react-dom|react)([\\/]|$)/,
        //   name: 'vendorReact',
        //   priority: 31,
        // },
        // vendorEcharts: {
        //   chunks: 'async',
        //   test: /[\\/]node_modules[\\/](echarts|zrender)([\\/]|$)/,
        //   name: 'vendorEcharts',
        //   name(module, chunks, cacheGroupKey) {
        //     const name = getEchartZrenderPkgName(module);
        //     return `vendor-${name}`;
        //   },
        //   priority: 31,
        // },
        // 抽离 antd-vue
          // vendorAntd: {
          //   chunks: 'async',
          //   test: /[\\/]node_modules[\\/](ant-design-vue)([\\/]|$)/,
          //   name: 'vendorAntd',
          //   priority: 31,
          //   name(module, chunks, cacheGroupKey) {
          //     return `vendor-antd`
          //   },
          // },
      },
    },
  },
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../build'),
    // publicPath: cdnDomain,
    publicPath: '/',
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
  ],
}

const baseConfig = webpackConfigBase()

const resultConfig = merge(baseConfig, webpackProdConfig)

// console.log(resultConfig)

module.exports = resultConfig
