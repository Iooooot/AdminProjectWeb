import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Plugin from 'v-fit-columns'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/routers'

import '@/icons' // icon
import '@/router'
import { mockXHR } from '../mock' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
// 表格列宽自适应
Vue.use(Plugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
