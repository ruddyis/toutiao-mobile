import axios from 'axios'
import store from '../store/index'

// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/' // 接口维护中
axios.defaults.baseURL = 'http://toutiao-app.itheima.net' // 备用接口
// axios.defaults.baseURL = 'http://toutiao.itheima.net' // 备用接口
axios.defaults.timeout = 3000

axios.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .get(path, { params: data })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios
        .all(list)
        .then(
          axios.spread(function (...result) {
            resolve(result)
          })
        )
        .catch(function (error) {
          reject(error)
        })
    })
  },
  patch: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios
        .patch(path, data)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
