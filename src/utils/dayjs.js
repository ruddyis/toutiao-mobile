// 初始化 dayjs 相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
// 配置使用中文语言包
import 'dayjs/locale/zh-cn'
// 配置使用处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 把处理相对时间的代码包装为全局过滤器
// 如何就可以在任何组件的模版中使用了
// 所谓的过滤器其实就是一个可以在模版中调用的函数而已
// 在组件的模版中使用过滤器：{{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤函数
// 过滤器的返回值会渲染到使用过滤器的模版中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
// 例如日期格式化
// console.log(dayjs().format('YYYY - MM - DD HH:MM:SS'))
// console.log(dayjs('2016-01-01 15:38:38').from(dayjs())) // 6年前
// console.log(dayjs('2016-01-01 15:38:38').fromNow()) // 6年前
// console.log(dayjs('2016-01-15 15:38:38').to(dayjs())) // 6年内
// console.log(dayjs('2016-01-01 15:38:38').toNow()) // 6年内
