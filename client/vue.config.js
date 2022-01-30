const path = require('path')
/*
 * const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 *
 * configureWebpack: {
 *   plugins: [new BundleAnalyzerPlugin()]
 * },
 *
 */

module.exports = {
  // Uncomment outputDir for production.
  publicPath: process.env.NODE_ENV === 'production' ? '/appointments-SPA/' : '/',
  devServer: {
    proxy: {
      '/post': {
            target: 'http://localhost:3000'
      }
    }
  }
}