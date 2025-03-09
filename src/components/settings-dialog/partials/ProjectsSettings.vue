<script setup>
import { useProjectsStore } from '@/store/useProjectsStore'
import { reactive } from 'vue'
import { useToast } from 'primevue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'

const toast = useToast()
const projectsStore = useProjectsStore()
const projectForm = reactive({ is_visible: false, id: null, name: '' })

function onClickOpenProjectForm(project) {
    projectForm.is_visible = true
    projectForm.id = project?.id || null
    projectForm.name = project?.name || ''
}

function closeProjectForm() {
    projectForm.is_visible = false
    projectForm.id = null
    projectForm.name = ''
}

function onSubmitProjectForm() {
    if (!projectForm.name) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Project name is required' })
        return
    }

    projectForm.id
        ? projectsStore.updateProject({ id: projectForm.id, name: projectForm.name })
        : projectsStore.createProject({ name: projectForm.name })

    closeProjectForm()
}
</script>

<template>
    <DataTable :value="projectsStore.projects" tableStyle="min-width: 20rem">
        <template #header>
            <div v-if="projectForm.is_visible" class="flex w-full items-center gap-x-1">
                <InputText v-model="projectForm.name" class="w-full" placeholder="Project Name" />
                <Button size="small" text icon="pi pi-times" severity="secondary" @click="closeProjectForm" />
                <Button size="small" text icon="pi pi-check" @click="onSubmitProjectForm" />
            </div>
            <div v-else class="flex w-full items-center justify-end">
                <Button size="small" text icon="pi pi-plus" @click="onClickOpenProjectForm()" />
            </div>
        </template>
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="id" header="">
            <template #body="{ data }">
                <Button size="small" text icon="pi pi-pencil" @click="onClickOpenProjectForm(data)" />
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>
