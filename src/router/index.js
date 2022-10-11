import router from './routers'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取个人信息以及权限
      if (store.getters.roles.length !== 0) {
        // 已获取权限
        next()
      } else {
        // 获取用户信息包括权限
        store.dispatch('user/getInfo').then(() => {
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(async(error) => {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          document.title = getPageTitle(null)
          next(`/login`)
          NProgress.done()
        })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      document.title = getPageTitle(null)
      next(`/login`)
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  // 单独获取权限
  buildMenus().then(res => {
    // 获取所有动态权限
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    // 对权限进行分开处理
    const sidebarRoutes = filterAsyncRouter(sdata)
    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
    // 最后给路由添加404
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
    // 存vuex中
    store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
      router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
    store.dispatch('SetSidebarRouters', sidebarRoutes)
  })
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
