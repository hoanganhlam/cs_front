import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _aa249fbc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _ad91e24c = () => interopDefault(import('../pages/_slug.vue' /* webpackChunkName: "pages/_slug" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _aa249fbc,
    name: "index"
  }, {
    path: "/:slug",
    component: _ad91e24c,
    name: "slug"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
