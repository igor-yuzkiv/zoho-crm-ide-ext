import { createRouter, createWebHashHistory } from 'vue-router'
import AppRoutes from '@/app/router/AppRoutes'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [AppRoutes.home],
})

export default router
