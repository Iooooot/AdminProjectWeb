import { constantRoutes } from '@/router/routers'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'

const permission = {
  state: {
    routers: constantRoutes,
    addRouters: [],
    // 因为侧边栏路径问题，所以需要与routers分开
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRoutes.concat(routers)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRoutes.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    }
  }
}

export const filterAsyncRouter = (routers, lastRouter = false, type = false) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (type && router.children) {
      router.children = filterChildren(router.children)
    }
    if (router.component) {
      if (router.component === 'Layout') {
        // Layout组件特殊处理
        router.component = Layout
      } else if (router.component === 'ParentView') {
        router.component = ParentView
      } else {
        if (typeof router.component === 'string') {
          const component = router.component
          router.component = (resolve) => require([`@/views/${component}`], resolve)
        }
      }
    }
    if (router.children != null && router.children && router.children.length) {
      // 有子节点递归生成子节点
      router.children = filterAsyncRouter(router.children, router, type)
    } else {
      // 没有子节点删除children、redirect
      delete router['children']
      delete router['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      // 如果有父节点，需要拼接父亲路径
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => {
  console.log(view)
}

export default permission
