'use strict';
const path = require('node:path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');
const config = require('../config');

const EnvConfig = require('../config/' + process.env.RUN_ENV.trim() + '.env');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    clean: true,
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
              },
              plugins: [
                'react-refresh/babel',
                '@babel/plugin-transform-runtime'
              ]
          }
        ],
      },
      // css
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: config.build.cssSourceMap, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: config.build.cssSourceMap },
          },
        ],
      },
      // less
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: { sourceMap: config.build.cssSourceMap, importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: config.build.cssSourceMap },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: config.build.cssSourceMap },
          },
        ],
      },
      // images
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        // exclude: [],
        generator: {
          filename: utils.assetsPath('img/[name].[hash:8][ext]'),
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 1000,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        // exclude: [],
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:8][ext]'),
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 1000,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': EnvConfig,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      title: 'hello world',
      inject: true,
      minify: true,
      chunksSortMode: 'auto',
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      ignoreOrder: true,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '',
    //       to: ''
    //     }
    //   ]
    // }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|ttf|woff)(\?.*)?$/i,
      threshold: 1024 * 10,
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'venders',
          chunks: 'all',
        },
      },
    },
    minimizer: [`...`, new CssMinizerPlugin()],
  },
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer-report').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
