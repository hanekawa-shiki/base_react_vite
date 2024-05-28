'use strict';
const path = require('node:path');
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const config = require('../config');
const { resolve } = require('./utils');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['./src/main.js'],
  output: {
    clean: true,
    filename: '[name].[hash:8].js',
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
              loader: 'babel-loader',
              options: {
                  presets: [
                      '@babel/preset-env',
                      '@babel/preset-react'
                  ],
                  cacheDirectory: true,
                  cacheCompression: false
              }
          }
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
            },
          },
        ],
        include: [resolve('src/icons')],
      },
    ],
  },
  plugins: [new NodePolyfillWebpackPlugin()],
  target: 'browserslist',
};
