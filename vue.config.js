module.exports = {
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.dat$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();

    config.module
      .rule('gzip')
      .test(/\.gz$/)
      .enforce('pre')
      .use('gzip-loader')
      .loader('gzip-loader')
      .end()
  }
}
