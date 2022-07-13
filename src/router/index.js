import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    redirect: '/home/permission',
    component: () => import('@/views/Home'),
    children:
      [
        { path: 'userlist', component: () => import('@/views/Userlist') },
        { path: 'permission', component: () => import('@/views/Permission') }
      ]
  }
]

const router = new VueRouter({
  routes
})

export default router
