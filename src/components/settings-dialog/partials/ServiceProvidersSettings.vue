<script setup>
import { useProjectsStore } from '@/store/useProjectsStore'
import { useServiceProvidersStore } from '@/store/useServiceProvidersStore.js'
import { computed, reactive } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { Icon } from '@iconify/vue'

const providersStore = useServiceProvidersStore()
const projectsStore = useProjectsStore()

const itemsForDisplay = computed(() => {
    return providersStore.providers.map((i) => {
        const { metadata } = i || { metadata: {} }

        return {
            isConnected: i.isConnected,
            id: i.id,
            type: i.serviceName,
            name: i?.title,
            org_id: metadata.org_id,
            host: metadata.host,
            project_id: metadata.project_id,
            project_name: projectsStore.getProjectById(metadata.project_id)?.name || 'N/A',
        }
    })
})

const providerForm = reactive({
    is_visible: false,
    provider_id: null,
    provider_alias: '',
    project_id: null,
})

function onClickEditProvider(item) {
    providerForm.is_visible = true
    providerForm.provider_id = item.id
    providerForm.provider_alias = item.name
    providerForm.project_id = item.project_id
}

function closeProviderForm() {
    providerForm.is_visible = false
    providerForm.provider_id = null
    providerForm.provider_alias = ''
    providerForm.project_id = null
}

function onClickSaveProvider() {
    const providerInstance = providersStore.providers.find((i) => i.id === providerForm.provider_id)
    if (!providerInstance) {
        return
    }

    providerInstance.updateMetadata({
        provider_alias: providerForm.provider_alias,
        project_id: providerForm.project_id,
    })
    providersStore.cacheProviders()
    closeProviderForm()
}
</script>

<template>
    <DataTable
        :value="itemsForDisplay"
        tableStyle="min-width: 20rem"
        :row-class="(data) => (data?.isConnected ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-500')"
    >
        <Column field="isConnected" header="">
            <template #body="{ data }">
                <Icon :icon="data?.isConnected ? 'pajamas:connected' : 'hugeicons:connect'" />
            </template>
        </Column>
        <Column field="name" header="Name">
            <template #body="{ data }">
                <InputText
                    v-if="providerForm.is_visible && providerForm.provider_id === data.id"
                    v-model="providerForm.provider_alias"
                    class="w-full"
                />
                <div v-else>
                    <div class="cursor-pointer hover:underline" @click="onClickEditProvider(data)">{{ data.name }}</div>
                    <div class="text-gray-500">Org ID: {{ data.org_id }}</div>
                </div>
            </template>
        </Column>
        <Column field="project_name" header="Associated Project">
            <template #body="{ data }">
                <Select
                    v-if="providerForm.is_visible && providerForm.provider_id === data.id"
                    option-value="id"
                    option-label="name"
                    v-model="providerForm.project_id"
                    :options="projectsStore.projects"
                    placeholder="-- Select Project --"
                    show-clear
                />
                <div v-else>{{ data.project_name }}</div>
            </template>
        </Column>
        <Column field="host" header="Host"></Column>
        <Column field="id" header="">
            <template #body="{ data }">
                <div
                    v-if="providerForm.is_visible && providerForm.provider_id === data.id"
                    class="flex items-center gap-x-1"
                >
                    <Button size="small" text icon="pi pi-times" severity="secondary" @click="closeProviderForm" />
                    <Button size="small" text icon="pi pi-check" @click="onClickSaveProvider" />
                </div>
                <Button
                    v-if="!providerForm.is_visible"
                    size="small"
                    text
                    icon="pi pi-pencil"
                    @click="onClickEditProvider(data)"
                />
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>
