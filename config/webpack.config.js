const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000"
)

module.exports = function (webpackEnv) {
  const isEnvDevelopment = process.env.NODE_ENV === "development"
  const isEnvProduction = process.env.NODE_ENV === "production"

  return {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? false : "cheap-module-source-map",
    entry: {
      app: isEnvProduction
        ? ["@babel/polyfill", path.join(__dirname, "../src", "index.tsx")]
        : [path.join(__dirname, "../src", "index.tsx")],
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        process: "process/browser",
        "@": path.join(__dirname, "../src"),
      },
    },
    // optimization: {
    //   minimize: isEnvProduction,
    //   minimizer: [],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    // splitChunks: {
    //   chunks: "all",
    //   name: false,
    // },
    // // Keep the runtime chunk separated to enable long term caching
    // // https://twitter.com/wSokra/status/969679223278505985
    // // https://github.com/facebook/create-react-app/issues/5358
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime-${entrypoint.name}`,
    // },
    // },
    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            {
              test: [/\.avif$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: imageInlineSizeLimit,
                mimetype: "image/avif",
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: imageInlineSizeLimit,
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader?cacheDirectory=true",
              },
            },
            {
              test: /\.css$/,
              include: /\.module\.css$/,
              use: [
                {
                  loader: "style-loader",
                },
                {
                  loader: "css-loader",
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
                  loader: "style-loader",
                },
                {
                  loader: "css-loader",
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: "style-loader",
                },
                {
                  loader: "css-loader",
                  options: {
                    // sourceMap: true,
                    modules: true,
                    // localIdentName: "[local]___[hash:base64:5]",
                  },
                },
                {
                  loader: "less-loader",
                },
              ],
            },
            {
              loader: require.resolve("file-loader"),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    output: {
      // filename: "bundle.js", //"[name].js"
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/bundle.js",
      path: path.resolve(__dirname, "../build"),
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public", "index.html"),
      }),
      // isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
      isEnvProduction && new CleanWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      contentBase: path.join(__dirname, "../build"),
      compress: true,
      port: 4000,
      hot: true,
    },
  }
}
