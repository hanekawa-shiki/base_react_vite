'use strict';
const path = require('node:path');
const proxyConfigs = require('./proxyConfigs');
const ASSETSPUBLICPATH = process.env.PUBLIC_PATH || '/';

console.log('process.env.PUBLIC_PATH=', process.env.PUBLIC_PATH);

const proxyConfig = proxyConfigs.get('dev');
module.exports = {
  dev: {
    host: 'localhost',
    port: 9999,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    devtool: 'eval-cheap-module-source-map',
    cssSourceMap: true,
    autoOpenBrowser: false,
    proxyTable: {
      '/api': {
        target: proxyConfig.targetAddr,
        changeOrigin: true,
        secure: false,
        pathRewrite: proxyConfig.pathRewrite,
        headers: {
          Origin: proxyConfig.targetAddr,
        },
        logLevel: 'debug',
      },
    },
  },
  build: {
    assetsSubDirectory: './',
    assetsPublicPath: ASSETSPUBLICPATH, // 部署目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    devtool: false,
    cssSourceMap: false,
    bundleAnalyzerReport: false,
  },
};
