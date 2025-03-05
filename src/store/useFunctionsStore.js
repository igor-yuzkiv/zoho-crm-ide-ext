import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFunctionsStore = defineStore('functions', () => {
    const items = ref({})

    function setFunctions(providerId, data) {
        if (!providerId || !data.length) {
            return
        }

        items.value[providerId] = data
    }

    function hasFunctions(providerId) {
        return items.value[providerId]?.length > 0
    }

    function getFunctions(providerId) {
        return items.value[providerId] || []
    }

    return {
        items,
        setFunctions,
        getFunctions,
        hasFunctions,
    }
})
