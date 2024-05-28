const proxyConfigs = new Map([
  [
    'dev',
    {
      targetAddr: 'http://localhost:50000',
      pathRewrite: {
        '^api': '',
      },
    },
  ],
]);

module.exports = proxyConfigs;
