import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const isAuthenticated = true
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    alias: '/'
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/AccountView.vue')
  },
  {
    path: '/tournament/:tournId?',
    name: 'tournament',
    component: () => import('../views/TournamentView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!isAuthenticated && (to.name !== 'register')) {
    next({ name: 'register' })
  } else {
    next()
  }
})

export default router
