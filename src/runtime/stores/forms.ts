import { defineStore } from "pinia"
import type { ArkMessage } from "../services/messages.service"
import type { Reactive } from "vue"

type ArkMessages = Reactive<Record<string, ArkMessage[]>>

export const useArkFormStore = defineStore("useArkFormStore", () => {
    const state = reactive<ArkForms>({})

    const messages: ArkMessages = reactive({})

    return { state, messages }
})
