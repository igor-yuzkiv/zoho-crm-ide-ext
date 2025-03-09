import localStorageUtil from '@/utils/local-storage.util.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref([])

    function cacheProjects() {
        localStorageUtil.setItem('projects', projects.value)
    }

    function loadCachedProjects() {
        const cachedProjects = localStorageUtil.getItem('projects')
        if (Array.isArray(cachedProjects)) {
            projects.value = cachedProjects
        }
    }

    function getProjectById(id) {
        return projects.value.find((project) => project.id === id)
    }

    function createProject(data) {
        projects.value.push({ id: Date.now(), ...data })
        cacheProjects()
    }

    function updateProject(data) {
        const { id, ...rest } = data
        projects.value = projects.value.map((project) => {
            if (project.id === id) {
                return { ...project, ...rest }
            }
            return project
        })

        cacheProjects()
    }

    return {
        projects,
        cacheProjects,
        getProjectById,
        createProject,
        updateProject,
        loadCachedProjects,
    }
})
