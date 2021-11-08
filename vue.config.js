module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/, // 遇到html代码
          exclude: /node_modules/,
          use: {
            loader: 'html-loader', // 使用html-loader处理
            options: {
              minimize: true // 处理之后需要压缩
            }
          }
        }
      ]
    }
  },
  devServer: {
    port: 8080,
    disableHostCheck: false,
    host: 'localhost',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://toutiao-app.itheima.net',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
