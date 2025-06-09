import { defineStore } from "pinia"

export const useModalStore = defineStore("modalStore", () => {
    const modals = ref<Record<string, any>>({})

    return { modals }
})
