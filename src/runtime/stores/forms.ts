import { defineStore } from "pinia"
import type { ArkMessage } from "../services/messages.service"
import type { Reactive } from "vue"

type ArkMessages = Reactive<Record<string, ArkMessage[]>>

export const useArkFormStore = defineStore("useArkFormStore", () => {
    const state = reactive<ArkForms>({})

    const names = computed(() => {
        return Object.entries(state).forEach(([formId, form]) => {
            return form?.name
        })
    })

    const messages: ArkMessages = reactive({})

    return { state, messages, names }
})
