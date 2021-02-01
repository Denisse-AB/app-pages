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
  // Comment outputDir for dev.
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/post': {
            target: 'http://localhost:3000'
      }
    }
  }
}