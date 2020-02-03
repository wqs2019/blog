import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('../views/Center.vue')
  },
  {
    path: '/grow',
    name: 'grow',
    component: () => import('../views/Grow.vue')
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('../views/Study.vue'),
    children: [
      { path: '/study/basis', name: 'basis', component: () => import('../views/study/Basis.vue') },
      { path: '/study/frame', name: 'frame', component: () => import('../views/study/Frame.vue') },
      { path: '/study/algorithm', name: 'algorithm', component: () => import('../views/study/Algorithm.vue') },
      { path: '/study/network', name: 'network', component: () => import('../views/study/Network.vue') },
    ]
  },
  {
    path: '/entertain',
    name: 'entertain',
    component: () => import('../views/Entertain.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/Message.vue')
  },

  {
    path: '/:category/:artileId',
    name: 'category',
    component: () => import('../views/ArticleDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
