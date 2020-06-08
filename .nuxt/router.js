import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6690721e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _64d9d0d6 = () => interopDefault(import('../pages/_slug.vue' /* webpackChunkName: "pages/_slug" */))

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
    component: _6690721e,
    name: "index"
  }, {
    path: "/:slug",
    component: _64d9d0d6,
    name: "slug"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
