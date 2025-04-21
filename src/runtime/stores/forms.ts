import { defineStore } from "pinia"

export const useArkFormStore = defineStore("useArkFormStore", () => {
    const state = reactive<ArkForms>({})

    return { state }
})
