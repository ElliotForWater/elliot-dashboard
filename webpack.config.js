const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const buildTarget = process.env.BUILD_TARGET || 'web'
const isProduction = process.env.NODE_ENV === 'production'
const version = require('./package.json').version

const config = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].[chunkhash:12].js',
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[chunkhash:12].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './target/shared' },
        {
          from: `./target/${buildTarget}`,
          globOptions: {
            ignore: ['**/*index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: `./target/${buildTarget}/index.html`,
    }),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'web',
      VERSION: version,
    }),
  ],
  devServer: {
    overlay: true,
  },
  devtool: buildTarget === 'web' ? 'source-map' : false,
  stats: {
    warnings: false,
  },
}

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    })
  )
}

module.exports = config
