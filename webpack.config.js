const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const buildTarget = process.env.BUILD_TARGET || 'web'
const isProduction = process.env.NODE_ENV === 'production'
const isWeb = buildTarget === 'web'
const version = require('./package.json').version

const config = {
  entry: {
    main: ['./src/index.tsx', './src/styles/main.css'],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: isWeb ? '[name].[chunkhash:12].js' : '[name].js',
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isWeb ? '[name].[chunkhash:12].[ext]' : '[name].js',
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
    new MiniCssExtractPlugin({
      filename: isWeb ? '[name].[hash:12].css' : '[name].css',
    }),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'web',
      VERSION: version,
    }),
  ],
  devServer: {
    overlay: true,
  },
  devtool: isWeb ? 'source-map' : false,
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
