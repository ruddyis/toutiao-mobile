import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

// 加载组件库
import Vant from 'vant'
// 加载组件库样式
import 'vant/lib/index.css'
// 自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
// 加载全局样式
import './assets/css/base.less'

import './utils/dayjs'

// 全局注册Vant中的组件
Vue.use(Vant)
Vue.use(Toast)
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.svg')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
