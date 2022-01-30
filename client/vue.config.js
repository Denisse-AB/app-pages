module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/appointments-SPA/' : '/',
  devServer: {
    proxy: {
      '/post': {
            target: 'http://localhost:3000'
      }
    }
  }
}