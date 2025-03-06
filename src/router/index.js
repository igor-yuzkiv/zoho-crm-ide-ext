import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            name: 'function.details',
            path: '/functions/:id',
            component: () => import('@/views/function/FunctionDetailView.vue'),
            children: [
                {
                    name: 'function.details.script',
                    path: 'script',
                    component: () => import('@/views/function/FunctionScriptView.vue'),
                },
            ],
        },
    ],
})

export default router
