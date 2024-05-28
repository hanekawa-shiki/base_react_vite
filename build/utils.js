'use strict';
const path = require('path');
const config = require('../config');

const resolve = dir => {
  return path.join(__dirname, '..', dir);
};

const assetsPath = _path => {
  const assetsSubDirectory =
    process.env.RUN_ENV === 'dev' ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

module.exports = {
  resolve,
  assetsPath,
};
