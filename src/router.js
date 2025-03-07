import { createRouter, createWebHashHistory } from 'vue-router'

export const AppRouteName = {
    home: 'home',
    functionOverview: 'function.overview',
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: AppRouteName.home,
            path: '/',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            name: AppRouteName.functionOverview,
            path: '/functions/:function_id',
            component: () => import('@/views/FunctionView.vue'),
        },
    ],
})

export default router
