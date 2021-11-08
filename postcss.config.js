//  *PostCSS的配置文件
//  PostCSS是基于Node.js运行的一个处理css的工具
//  所以它的配置文件也是运行在node.js中的

// PostCSS配置文件需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀的，用来兼容不同浏览器
    // VueCLI已经在内部配置了autoprefixer
    autoprefixer: {
      // browser用来配置兼容到的系统（浏览器）环境
      // 这个配置没有问题，但有控制台编译警告，因为VueCLI是通过.browserslistrc文件配置要兼容的环境信息
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 把px转为rem
    'postcss-pxtorem': {
      // 使用lib-flexable的REM基准值，rootValue应该设置为设计稿的十分之一
      // 按照设计稿，750宽的设计稿 ： 750 / 10 = 75
      // 按照设计稿，750宽的设计稿 ： 375 / 10 = 37.5
      // Vant组件库是基于逻辑像素 375 宽写的
      // 移动端页面一般是以 iphone 6/7/8为原型设计的
      // 设计稿是基于物理像素 750 宽设计的，为了和Vant匹配，手动将设计稿设置为Vant宽
      rootValue: 37.5, // 转换的根元素基准值

      // 需要转换的css属性，*是所有属性
      propList: ['*']
    }
  }
}
