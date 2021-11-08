/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import store from '../store/index'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router/index'
// const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/'
// }) // 接口维护中
// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net', // 请求的基础路径
  // baseURL: 'http://toutiao.itheima.net', // 请求的基础路径
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data
      // console.log(data)

      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回,返回结果是对象Object
        return JSONbig.parse(data)
      } catch (err) {
        // console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }

      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }
  ]
})

const refreshTokenReq = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})
// 请求拦截器
request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    // 发送之前做些什么
    // console.log(config)
    // 从store的state中将user解构出来
    const { user } = store.state
    // 如果用户登陆,统一为接口设置token信息
    if (user) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 例如：统一的设置 token

    // 当这里 return config 之后请求才会真正的发出去
    // 处理完毕一定要将config返回，否则无法发布请求
    return config
  },
  function (error) {
    // 发送错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 响应成功
    return response
  },
  async function (error) {
    // 响应失败
    // 任何超过2xx的状态码都会触发这里
    // console.dir(error)
    const status = error.response.status
    if (status === 400) {
      // 客户端请求参数错误
      Toast.fail('客户端请求参数错误')
    } else if (status === 401) {
      // token失效
      // 如果没有 user 或者 user.token，直接登陆
      const { user } = store.state
      if (!user || !user.token) {
        // 直接跳转到登陆页
        redirectLogin()
      }
      // 使用refresh_token ，请求获取新的 token
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 拿到新的 token 之后把它放到容器中
        // console.log(data)
        user.token = data.data.token
        store.commit('SET_USER', user)
        // 把失败的请求重新发送出去
        // err.config 是本次请求的相关配置信息对象
        // 这里使用request发请求，它会走直接的拦截器
        // 它的请求拦截器中通过 store 容器访问token
        return request(error.config)
      } catch (err) {
        // 刷新token失败，直接跳到登陆页
        redirectLogin()
        // console.log(err)
      }
    } else if (status === 403) {
      // 没有权限操作
      Toast.fail('没有权限操作')
    } else if (status >= 500) {
      // 服务端异常
      Toast.fail('服务端异常，请稍后重试')
    }

    return Promise.reject(error)
  }
)

// 跳转登陆页的方法
function redirectLogin () {
  router.replace({
    // name: 'login',
    path: '/login',
    // 传递查询参数，查询参数会以 ？ 作为分割符放到url后面
    query: {
      // 数据名称是随便取的
      // router.currentRoute 和我们在组件中获得的 this.$route 是同一个东西
      // router.currentRoute.fullPath 当前路由路径
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
