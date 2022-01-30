module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/app-pages/' : '/',
  devServer: {
    proxy: {
      '/post': {
            target: 'http://localhost:3000'
      }
    }
  }
}