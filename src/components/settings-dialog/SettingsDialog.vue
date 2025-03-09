<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import ProjectsSettings from '@/components/settings-dialog/partials/ProjectsSettings.vue'
import ServiceProvidersSettings from '@/components/settings-dialog/partials/ServiceProvidersSettings.vue'

const visible = defineModel('visible', { type: Boolean })

const selectedTab = ref('projects')
</script>

<template>
    <Dialog header="Settings" v-model:visible="visible" modal class="w-[98%] lg:w-3/4" :draggable="false">
        <Tabs v-model:value="selectedTab">
            <TabList class="flex flex-col">
                <Tab value="projects" class="px-2 py-1">Projects</Tab>
                <Tab value="providers" class="px-2 py-1">Providers</Tab>
            </TabList>
            <TabPanels class="p-1">
                <TabPanel value="projects">
                    <ProjectsSettings />
                </TabPanel>
                <TabPanel value="providers">
                    <ServiceProvidersSettings />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Dialog>
</template>

<style scoped></style>
