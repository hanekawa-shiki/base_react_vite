'use strict';
const path = require('node:path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');
const { resolve } = require('./utils');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    hot: true,
    open: true,
    host: config.dev.host,
    port: config.dev.port || 8080,
    client: {
      logging: 'info',
      overlay: config.dev.errorOverlay
        ? {
            warnings: false,
            errors: true,
          }
        : false,
    },
    // static: {},
    compress: true,
    historyApiFallback: true,
    open: config.dev.autoOpenBrowser,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        // exclude: [resolve('src/static')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: config.dev.cssSourceMap, importLoaders: 1, esModule: false },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: config.dev.cssSourceMap },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: config.dev.cssSourceMap, importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: config.dev.cssSourceMap },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: config.dev.cssSourceMap },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      title: 'reactconfig',
      scriptLoading: 'defer',
    }),
    new ReactRefreshWebpackPlugin()
  ],
});
