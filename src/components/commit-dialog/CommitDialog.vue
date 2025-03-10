<script setup>
import { useProjectsStore } from '@/store/useProjectsStore.js'
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

const visible = defineModel('visible', { type: Boolean })
const selectedProject = ref(null)
const commitMessage = ref('')
const projectsStore = useProjectsStore()
</script>

<template>
    <Dialog
        header="Commit"
        v-model:visible="visible"
        modal
        :draggable="false"
        class="w-[98%] border-none lg:w-2/4 xl:w-1/4"
        content-class="flex flex-col"
        :pt="{ footer: { class: 'bg-gray-100 dark:bg-black py-2 rounded-b-lg' } }"
    >
        <Select
            :options="projectsStore.projects"
            option-label="name"
            option-value="id"
            size="small"
            placeholder="-- Project --"
            show-clear
            v-model="selectedProject"
        />
        <Textarea v-model="commitMessage" rows="3" placeholder="Message" class="mt-2" />
        <template #footer>
            <Button>Commit</Button>
        </template>
    </Dialog>
</template>

<style scoped></style>
