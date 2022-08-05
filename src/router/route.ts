import * as VueRouter from 'vue-router'
import { Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/listA'
  },
  {
    path: '/listA',
    component: () => import('@/pages/ListA/listA.vue')
  },
  {
    path: '/listB',
    component: () => import('@/pages/ListB/listB.vue')
  },
  {
    path: '/formPage',
    component: () => import('@/pages/FormPage/formPage.vue')
  }
]

const router: Router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

export default router;