import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = <RouteRecordRaw[]>[{
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue')
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default  router