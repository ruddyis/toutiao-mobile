import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '../store/index'

const Login = resolve => {
  import('../views/Login.vue').then(module => {
    resolve(module)
  })
}
const Container = resolve => {
  import('../views/Container.vue').then(module => {
    resolve(module)
  })
}
const Home = resolve => {
  import('../views/Home.vue').then(module => {
    resolve(module)
  })
}
const Question = resolve => {
  import('../views/Question.vue').then(module => {
    resolve(module)
  })
}
const Video = resolve => {
  import('../views/Video.vue').then(module => {
    resolve(module)
  })
}
const Me = resolve => {
  import('../views/Me.vue').then(module => {
    resolve(module)
  })
}
const UserProfile = resolve => {
  import('../views/Me/UserProfile.vue').then(module => {
    resolve(module)
  })
}
const CollectAndHistory = resolve => {
  import('../views/Me/CollectAndHistory.vue').then(module => {
    resolve(module)
  })
}
const NoMe = resolve => {
  import('../views/Me/NoMe.vue').then(module => {
    resolve(module)
  })
}
const Search = resolve => {
  import('../views/Search.vue').then(module => {
    resolve(module)
  })
}
const Article = resolve => {
  import('../views/Article.vue').then(module => {
    resolve(module)
  })
}
const UserChat = resolve => {
  import('../views/UserChat.vue').then(module => {
    resolve(module)
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false } // 添加额外的自定义数据
  },
  {
    path: '/container',
    component: Container,
    children: [
      { path: '/container', redirect: '/container/me' },
      {
        path: '/container/home',
        component: Home,
        meta: { requiresAuth: false }
      },
      {
        path: '/container/question',
        component: Question,
        meta: { requiresAuth: false }
      },
      {
        path: '/container/video',
        component: Video,
        meta: { requiresAuth: false }
      },
      { path: '/container/me', component: Me, meta: { requiresAuth: false } }
    ]
  },
  { path: '/Search', component: Search },
  {
    path: '/Article/:articleId',
    name: 'Article',
    component: Article,
    // 将动态路由参数映射到组件的props中，无论是访问还是维护性都很方便
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: false }
  },
  {
    path: '/UserChat',
    name: 'UserChat',
    component: UserChat,
    meta: { requiresAuth: true }
  },
  { path: '/collectAndHistory', component: CollectAndHistory },
  { path: '/nome', component: NoMe }
]
const router = new VueRouter({
  routes
})
// 全局前置守卫
// to: 即将要进入的目标 路由对象
// from: 当前导航正要离开的路由
// next: 放行的标记
router.beforeEach((to, from, next) => {
  // 判断页面是否需要登陆才能访问
  if (to.meta.requiresAuth) {
    // 如果已登录，就直接通过
    if (store.state.user) {
      return next()
    }
    // 如果未登录，提示是否登陆
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登陆才能访问，确认登陆吗？'
    })
      .then(() => {
        // on confirm
        // next()
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // on cancel
        // 取消了，中断路由导航
        next(false)
      })
  } else {
    // 不需要登陆状态的页面，直接跳转到该页面
    next()
  }
})
export default router
