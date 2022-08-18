const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const buildTarget = process.env.BUILD_TARGET || 'web'
const isProduction = process.env.NODE_ENV === 'production'
const isWeb = buildTarget === 'web'
const version = require('./package.json').version

const entry = {
  main: ['./src/index.tsx', './src/main.css'],
}

const config = {
  entry: entry,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: isWeb ? '[name].[chunkhash:12].js' : '[name].js',
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(css)$/,
        use: isProduction ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',

            options: {
              limit: 10000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // it will automatically pick up key values from .env file
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
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
      filename: isWeb ? '[name].[contenthash].css' : '[name].css',
    }),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'web',
      VERSION: version,
    }),
  ],
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
