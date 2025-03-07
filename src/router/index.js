import { createRouter, createWebHashHistory } from 'vue-router'

export const AppRouteName = {
    home: 'home',
    functionOverview: 'function.details.overview',
    functionDocumentation: 'function.details.documentation',
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
            path: '/functions/:function_id',
            component: () => import('@/views/function/FunctionIndexView.vue'),
            children: [
                {
                    name: AppRouteName.functionOverview,
                    path: '',
                    component: () => import('@/views/function/FunctionScriptView.vue'),
                },
                {
                    name: AppRouteName.functionDocumentation,
                    path: 'documentation',
                    component: () => import('@/views/function/FunctionDocumentationView.vue'),
                },
            ],
        },
    ],
})

export default router
