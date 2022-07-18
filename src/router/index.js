import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children:
      [
        { path: '/userlist', component: () => import('@/views/Userlist') },
        { path: '/permission', component: () => import('@/views/Permission') },
        { path: '/roles', component: () => import('@/views/Roles') },
        { path: '/goodslist', component: () => import('@/views/Goods/goodsLists.vue') },
        { path: '/goodslist/addgoods', component: () => import('@/views/Goods/addGoods/addGoods.vue') },
        { path: '/goodsclass', component: () => import('@/views/Goods/goodsClass') },
        { path: '/classparameter', component: () => import('@/views/Goods/classParameter.vue') }
      ]
  }
]

const router = new VueRouter({
  routes
})

export default router
