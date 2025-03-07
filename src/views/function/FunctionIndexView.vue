<script setup>
import { AppRouteName } from '@/router/index.js'
import { useFunctionsStore } from '@/store/useFunctionsStore.js'
import { useWorkspaceStore } from '@/store/useWorkspaceStore.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'

const workspace = useWorkspaceStore()
const functionsStore = useFunctionsStore()
const route = useRoute()

const navItems = [
    { title: 'Overview', route: AppRouteName.functionOverview },
    { title: 'Documentation', route: AppRouteName.functionDocumentation },
]

const functionDetails = computed(() => {
    if (!route.params.function_id || !workspace.provider?.id) {
        return null
    }
    return functionsStore.getFunctions(workspace.provider.id).find((item) => item.id === route.params.function_id)
})
</script>

<template>
    <div class="flex h-full w-full flex-col overflow-hidden">
        <div
            class="flex-0 flex w-full items-center justify-between border-b border-gray-200 px-2 font-bold dark:border-gray-500 dark:bg-gray-800"
        >
            <div>{{ functionDetails?.api_name }} | {{ functionDetails?.type }}</div>

            <Tabs :value="route.name">
                <TabList>
                    <router-link v-for="navItem in navItems" :key="navItem.title" :to="{ name: navItem.route }">
                        <Tab :value="navItem.route" class="dark:bg-gray-800 p-1">{{ navItem.title }}</Tab>
                    </router-link>
                </TabList>
            </Tabs>
        </div>
        <div class="flex-coll flex flex-1 overflow-auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped></style>
