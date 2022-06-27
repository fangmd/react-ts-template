/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const copyWebpackPlugin = require('copy-webpack-plugin')

function getGitVersionInfo() {
  if (process.env.NODE_ENV === 'production') {
    try {
      let fs = require('fs')
      let gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/master
      let ref = gitHEAD.split(': ')[1] // refs/heads/master
      let branchName = gitHEAD.split('/')[2] // master
      let gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：db3b1d0e91f41026ebf50fc20a17df8a5317dd57
      let gitCommitVersion = '"' + branchName + ': ' + gitVersion + '"' // 例如dev环境: "master: db3b1d0e91f41026ebf50fc20a17df8a5317dd57"
      return gitCommitVersion
    } catch (error) {
      console.log(error)
      return ''
    }
  } else {
    return ''
  }
}

//用于标记项目发布时间
process.env.APP_BUILD_TIME = new Date().toString() + getGitVersionInfo()
const APP_BUILD_TIME = process.env.APP_BUILD_TIME

module.exports = function () {
  // const isEnvDevelopment = process.env.NODE_ENV === 'development'
  const isEnvProduction = process.env.NODE_ENV === 'production'

  process.env.APP_BUILD_TIME = '12121'

  return {
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        process: 'process/browser',
        '@': path.join(__dirname, '../src'),
      },
    },
    output:{
      assetModuleFilename: 'static/media/[hash][ext][query]'
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 20 * 1024 // 20kb
                }
              },
            },
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader?cacheDirectory=true',
              },
            },
            {
              test: /\.css$/,
              include: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'postcss-loader',
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                  options: isEnvProduction
                    ? {
                        publicPath: '../../',
                      }
                    : {},
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      mode: 'local',
                      auto: true,
                      // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                      localIdentName: '[local]___[hash:base64:5]',
                    },
                    // modules: true,
                    // localIdentName: '[local]___[hash:base64:5]',
                    // modules: true,
                    // sourceMap: true,
                    // modules: true,
                    // localIdentName: "[local]___[hash:base64:5]",
                  },
                },
                {
                  loader: 'postcss-loader',
                },
                {
                  loader: 'less-loader',
                },
              ],
            },
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
    plugins:  [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../public', 'index.html'),
        favicon: 'public/favicon.ico',
        APP_BUILD_TIME: APP_BUILD_TIME
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../public'),
            to: './',
            filter: async (resourcePath) => {
              console.log(resourcePath)
              const isIndexHtml = resourcePath.endsWith('/public/index.html')
              if (isIndexHtml) {
                return false
              }
              return true
            },
          },
        ],
      }),
    ],
  }
}
